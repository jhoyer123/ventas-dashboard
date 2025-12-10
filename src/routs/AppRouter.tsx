import { BrowserRouter, Routes, Route } from "react-router-dom";
//import de las paginas
import Login from "../pages/auth/Login";
import LayoutDashboard from "../layouts/LayoutDashboard";
import Home from "../pages/Home/Home";
import PrivateRoute from "./PrivateRoute";
//importar el contexto del user
import { AuthProvider } from "../context/AuthContext";
//importar el contexto de sucursal
import { BranchProvider } from "../context/BranchContext";
//import del sonner el toast
import { Toaster } from "@/components/ui/sonner";
//improt pages
import Dashboard from "@/pages/dashboard/Dashboard";
import PersonalPage from "../pages/employee/EmployeePage";
import Branch from "@/pages/branch/Branch";
import FormEmployee from "@/components/Personal/FormEmployee";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        //rutas publicas
        <Route path="/" element={<Login />} />
        //rutas privadas
        {/* RUTAS DEL DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <AuthProvider>
              <BranchProvider>
                <PrivateRoute>
                  <LayoutDashboard />
                </PrivateRoute>
              </BranchProvider>
            </AuthProvider>
          }
        >
          <Route index element={<Dashboard />} />
          {/* rutas de empleados */}
          <Route
            path="home"
            element={<FormEmployee funParent={() => console.log("prube")} />}
          />
          <Route path="personal" element={<PersonalPage />} />
          <Route path="sucursales" element={<Branch />} />
        </Route>
      </Routes>
      <Toaster theme="dark" />
    </BrowserRouter>
  );
};

export default AppRouter;
