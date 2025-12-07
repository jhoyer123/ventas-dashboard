import { BrowserRouter, Routes, Route } from "react-router-dom";
//import de las paginas
import Login from "../pages/auth/Login";
import LayoutDashboard from "../layouts/LayoutDashboard";
import Home from "../pages/Home/Home";
import PrivateRoute from "./PrivateRoute";
//importar el contexto del user
import { AuthProvider } from "../context/AuthContext";
import Dashboard from "@/pages/dashboard/Dashboard";
import UsersPage from "../tabla/UserPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          //rutas publicas
          <Route path="/" element={<Login />} />
          //rutas privadas
          {/* RUTAS DEL DASHBOARD */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <LayoutDashboard />
              </PrivateRoute>
            }
          >
            <Route index element={<Dashboard />} />
            {/* rutas de empleados */}
            <Route path="users" element={<Home />} />
            <Route path="personal" element={<UsersPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRouter;
