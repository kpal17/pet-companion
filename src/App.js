import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Main from "./pages/Main/Main.tsx";
import Logowanie from "./pages/Logowanie/Logowanie.tsx";
import RegisterPage from "./pages/Rejestracja/RegisterPage.tsx";
import HomePage from "./pages/Strona_glowna/HomePage.tsx";
import AddPetPage from "./pages/Pupile/AddPetPage.tsx";
import PetsListPage from "./pages/Pupile/PetsListPage.tsx";
import PetProfilePage from "./pages/Pupile/PetProfilePage.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/logowanie" replace />} />
        <Route path="/main" element={<Main />} />
        <Route path="/logowanie" element={<Logowanie />} />
        <Route path="/rejestracja" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/pupile" element={<PetsListPage />} />
        <Route path="/pupile/dodaj" element={<AddPetPage />} />
        <Route path="/pupile/:id" element={<PetProfilePage />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
