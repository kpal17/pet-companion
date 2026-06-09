import React, { createContext, useContext, useState } from "react";

type User = {
  name: string;
  email: string;
  password: string;
};

export type Pet = {
  id: string;
  name: string;
  species: string;
  breed: string;
  birthDate: string;
  weight: string;
};

export type Entry = {
  id: string;
  petId: string;
  category: string;
  description: string;
  date: string;
  recordType: "vaccination" | "visit" | "medication" | "measurement" | "other";
  doctor?: string;
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

type AuthContextType = {
  currentUser: User | null;
  register: (name: string, email: string, password: string) => void;
  login: (email: string, password: string) => boolean;
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
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [pets, setPets] = useState<Pet[]>([]);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [petShares, setPetShares] = useState<PetShare[]>([]);

  const register = (name: string, email: string, password: string) => {
    const user = { name, email, password };
    setUsers((prev) => [...prev, user]);
    setCurrentUser(user);
  };

  const login = (email: string, password: string): boolean => {
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const logout = () => setCurrentUser(null);

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
