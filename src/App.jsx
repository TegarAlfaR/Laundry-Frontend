import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RequireAuthRole from "./components/RequireAuthRole";

import AuthPage from "./components/AuthPage";
import HomePage from "./pages/HomePage";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./components/NotFound";
import LoginPage from "./components/LoginPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route element={<RequireAuthRole requiredRole="admin" />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
