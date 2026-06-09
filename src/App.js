import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Main from "./pages/Main/Main.tsx";
import Logowanie from "./pages/Logowanie/Logowanie.tsx";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/Strona_glowna/HomePage.tsx";
import AddPetPage from "./pages/Pupile/AddPetPage.tsx";
import PetsListPage from "./pages/Pupile/PetsListPage.tsx";
import PetProfilePage from "./pages/Pupile/PetProfilePage.tsx";
import AddEntryPage from "./pages/Wpisy/AddEntryPage.tsx";
import AppLayout from "./components/AppLayout.tsx";
import PlannerPage from "./pages/PlannerPage.tsx";
import OwnerVetPage from "./pages/OwnerVetPage.tsx";
import {
  VetDashboardPage,
  VetLoginPage,
  VetPatientPage,
  VetRegisterPage,
} from "./pages/Vet/VetPortal.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/logowanie" replace />} />
        <Route path="/main" element={<Main />} />
        <Route path="/logowanie" element={<Logowanie />} />
        <Route path="/rejestracja" element={<LoginPage />} />
        <Route path="/vet/logowanie" element={<VetLoginPage />} />
        <Route path="/vet/rejestracja" element={<VetRegisterPage />} />
        <Route path="/vet/dashboard" element={<VetDashboardPage />} />
        <Route path="/vet/pacjent/:id" element={<VetPatientPage />} />
        <Route element={<AppLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/pupile" element={<PetsListPage />} />
          <Route path="/pupile/dodaj" element={<AddPetPage />} />
          <Route path="/pupile/:id" element={<PetProfilePage />} />
          <Route path="/wpisy/nowy" element={<AddEntryPage />} />
          <Route path="/planer" element={<PlannerPage />} />
          <Route path="/weterynarz" element={<OwnerVetPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
