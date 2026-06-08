import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Main from "./pages/Main/Main.tsx";
import Logowanie from "./pages/Logowanie/Logowanie.tsx";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/Strona_glowna/HomePage.tsx";
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
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
