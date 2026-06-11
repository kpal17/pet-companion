import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase.ts";

type User = {
  uid: string;
  name: string;
  email: string;
};

export type Pet = {
  id: string;
  name: string;
  species: string;
  breed: string;
  birthDate: string;
  weight: string;
  photo?: string;
};

export type Entry = {
  id: string;
  petId: string;
  category: string;
  description: string;
  date: string;
  recordType: "vaccination" | "visit" | "medication" | "measurement" | "other";
  doctor?: string;
  visitTime?: string;
  clinicName?: string;
  clinicAddress?: string;
  clinicPhone?: string;
  diagnosis?: string;
  recommendations?: string;
  medicationName?: string;
  dosage?: string;
  nextDate?: string;
};

export type Reminder = {
  id: string;
  petId: string;
  title: string;
  category: "visit" | "medication" | "care" | "vaccination" | "other";
  date: string;
  time: string;
  notes: string;
  recurrence: "none" | "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
  notifyDaysBefore: number;
  source: "owner" | "health-record";
};

export type PetShare = {
  id: string;
  petId: string;
  email: string;
  role: "vet" | "caregiver";
};

export type VetUser = {
  id: string;
  name: string;
  licenseNumber: string;
  specialization: string;
  clinicName: string;
  clinicAddress: string;
  phone: string;
  email: string;
  password: string;
};

export type VetAccessCode = {
  id: string;
  petId: string;
  code: string;
  expiresAt: string;
  usageLimit: number;
  usageCount: number;
  revoked: boolean;
};

export type VetGrant = {
  id: string;
  petId: string;
  vetId: string;
  codeId: string;
  grantedAt: string;
  revoked: boolean;
};

export type VetActivity = {
  id: string;
  vetId: string;
  petId: string;
  type: "access_granted" | "record_opened" | "entry_added";
  createdAt: string;
  description: string;
};

type AuthContextType = {
  currentUser: User | null;
  register: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  pets: Pet[];
  addPet: (pet: Omit<Pet, "id">) => void;
  entries: Entry[];
  addEntry: (entry: Omit<Entry, "id">) => void;
  reminders: Reminder[];
  addReminder: (reminder: Omit<Reminder, "id">) => void;
  removeReminder: (id: string) => void;
  petShares: PetShare[];
  addPetShare: (share: Omit<PetShare, "id">) => void;
  removePetShare: (id: string) => void;
  currentVet: VetUser | null;
  vetUsers: VetUser[];
  registerVet: (vet: Omit<VetUser, "id">) => void;
  updateVetProfile: (profile: Omit<VetUser, "id" | "password">) => void;
  loginVet: (email: string, password: string) => boolean;
  logoutVet: () => void;
  vetAccessCodes: VetAccessCode[];
  generateVetAccessCode: (petId: string, usageLimit: number) => VetAccessCode;
  revokeVetAccessCode: (id: string) => void;
  vetGrants: VetGrant[];
  redeemVetAccessCode: (code: string) => { ok: boolean; message: string; petId?: string };
  revokeVetGrant: (id: string) => void;
  canVetAccessPet: (petId: string) => boolean;
  vetActivities: VetActivity[];
  logVetActivity: (
    petId: string,
    type: VetActivity["type"],
    description: string,
  ) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [pets, setPets] = useState<Pet[]>([]);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [petShares, setPetShares] = useState<PetShare[]>([]);
  const [vetUsers, setVetUsers] = useState<VetUser[]>([]);
  const [currentVet, setCurrentVet] = useState<VetUser | null>(null);
  const [vetAccessCodes, setVetAccessCodes] = useState<VetAccessCode[]>([]);
  const [vetGrants, setVetGrants] = useState<VetGrant[]>([]);
  const [vetActivities, setVetActivities] = useState<VetActivity[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setCurrentUser({
          uid: firebaseUser.uid,
          name: firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "Użytkownik",
          email: firebaseUser.email || "",
        });
      } else {
        setCurrentUser(null);
      }
    });
    return unsubscribe;
  }, []);

  const register = async (name: string, email: string, password: string) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName: name });
    setCurrentUser({ uid: cred.user.uid, name, email });
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (err: any) {
      console.error("Firebase login error:", err.code, err.message);
      return false;
    }
  };

  const logout = () => { signOut(auth); setCurrentUser(null); };

  const addPet = (petData: Omit<Pet, "id">) => {
    setPets((prev) => [...prev, { ...petData, id: String(Date.now()) }]);
  };

  const addEntry = (entryData: Omit<Entry, "id">) => {
    const id = String(Date.now());
    setEntries((prev) => [...prev, { ...entryData, id }]);

    if (entryData.nextDate) {
      setReminders((prev) => [
        ...prev,
        {
          id: `${id}-reminder`,
          petId: entryData.petId,
          title: `Kontynuacja: ${entryData.category}`,
          category: entryData.recordType === "vaccination" ? "vaccination" : "visit",
          date: entryData.nextDate || "",
          time: "09:00",
          notes: entryData.recommendations || entryData.description,
          recurrence: "none",
          notifyDaysBefore: 7,
          source: "health-record",
        },
      ]);
    }
  };

  const addReminder = (reminderData: Omit<Reminder, "id">) => {
    setReminders((prev) => [...prev, { ...reminderData, id: String(Date.now()) }]);
  };

  const removeReminder = (id: string) => {
    setReminders((prev) => prev.filter((reminder) => reminder.id !== id));
  };

  const addPetShare = (shareData: Omit<PetShare, "id">) => {
    setPetShares((prev) => [...prev, { ...shareData, id: String(Date.now()) }]);
  };

  const removePetShare = (id: string) => {
    setPetShares((prev) => prev.filter((share) => share.id !== id));
  };

  const registerVet = (vetData: Omit<VetUser, "id">) => {
    const vet = { ...vetData, id: String(Date.now()) };
    setVetUsers((prev) => [...prev, vet]);
    setCurrentVet(vet);
  };

  const updateVetProfile = (profile: Omit<VetUser, "id" | "password">) => {
    if (!currentVet) return;
    const updatedVet = { ...currentVet, ...profile };
    setVetUsers((prev) =>
      prev.map((vet) => vet.id === currentVet.id ? updatedVet : vet),
    );
    setCurrentVet(updatedVet);
  };

  const loginVet = (email: string, password: string): boolean => {
    const vet = vetUsers.find((item) => item.email === email && item.password === password);
    if (!vet) return false;
    setCurrentVet(vet);
    return true;
  };

  const logoutVet = () => setCurrentVet(null);

  const generateVetAccessCode = (petId: string, usageLimit: number): VetAccessCode => {
    const code = Array.from({ length: 6 }, () => "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"[
      Math.floor(Math.random() * 32)
    ]).join("");
    const accessCode: VetAccessCode = {
      id: `${Date.now()}-${code}`,
      petId,
      code,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      usageLimit,
      usageCount: 0,
      revoked: false,
    };
    setVetAccessCodes((prev) => [
      ...prev.map((item) => item.petId === petId ? { ...item, revoked: true } : item),
      accessCode,
    ]);
    return accessCode;
  };

  const revokeVetAccessCode = (id: string) => {
    setVetAccessCodes((prev) =>
      prev.map((code) => code.id === id ? { ...code, revoked: true } : code),
    );
  };

  const redeemVetAccessCode = (rawCode: string) => {
    if (!currentVet) return { ok: false, message: "Najpierw zaloguj się jako weterynarz." };
    const normalizedCode = rawCode.trim().toUpperCase();
    const accessCode = vetAccessCodes.find((item) => item.code === normalizedCode);
    if (!accessCode) return { ok: false, message: "Nieprawidłowy kod dostępu." };
    if (accessCode.revoked) return { ok: false, message: "Kod został cofnięty przez właściciela." };
    if (new Date(accessCode.expiresAt).getTime() <= Date.now()) {
      return { ok: false, message: "Kod dostępu wygasł." };
    }
    if (accessCode.usageCount >= accessCode.usageLimit) {
      return { ok: false, message: "Limit użyć tego kodu został wyczerpany." };
    }

    const existingGrant = vetGrants.find(
      (grant) => grant.petId === accessCode.petId && grant.vetId === currentVet.id && !grant.revoked,
    );
    if (!existingGrant) {
      setVetGrants((prev) => [
        ...prev,
        {
          id: `${Date.now()}-grant`,
          petId: accessCode.petId,
          vetId: currentVet.id,
          codeId: accessCode.id,
          grantedAt: new Date().toISOString(),
          revoked: false,
        },
      ]);
      setVetActivities((prev) => [
        ...prev,
        {
          id: `${Date.now()}-access`,
          vetId: currentVet.id,
          petId: accessCode.petId,
          type: "access_granted",
          createdAt: new Date().toISOString(),
          description: "Uzyskano dostęp przy użyciu kodu właściciela.",
        },
      ]);
    }
    setVetAccessCodes((prev) =>
      prev.map((item) =>
        item.id === accessCode.id ? { ...item, usageCount: item.usageCount + 1 } : item,
      ),
    );
    return { ok: true, message: "Kartoteka została dodana do pacjentów.", petId: accessCode.petId };
  };

  const revokeVetGrant = (id: string) => {
    setVetGrants((prev) =>
      prev.map((grant) => grant.id === id ? { ...grant, revoked: true } : grant),
    );
  };

  const canVetAccessPet = (petId: string) =>
    Boolean(
      currentVet &&
      vetGrants.some(
        (grant) => grant.petId === petId && grant.vetId === currentVet.id && !grant.revoked,
      ),
    );

  const logVetActivity = useCallback((
    petId: string,
    type: VetActivity["type"],
    description: string,
  ) => {
    if (!currentVet) return;
    setVetActivities((prev) => {
      const latest = prev[prev.length - 1];
      if (
        latest &&
        latest.vetId === currentVet.id &&
        latest.petId === petId &&
        latest.type === type &&
        Date.now() - new Date(latest.createdAt).getTime() < 2000
      ) {
        return prev;
      }
      return [
        ...prev,
        {
          id: `${Date.now()}-${type}`,
          vetId: currentVet.id,
          petId,
          type,
          createdAt: new Date().toISOString(),
          description,
        },
      ];
    });
  }, [currentVet]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        register,
        login,
        logout,
        pets,
        addPet,
        entries,
        addEntry,
        reminders,
        addReminder,
        removeReminder,
        petShares,
        addPetShare,
        removePetShare,
        currentVet,
        vetUsers,
        registerVet,
        updateVetProfile,
        loginVet,
        logoutVet,
        vetAccessCodes,
        generateVetAccessCode,
        revokeVetAccessCode,
        vetGrants,
        redeemVetAccessCode,
        revokeVetGrant,
        canVetAccessPet,
        vetActivities,
        logVetActivity,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
