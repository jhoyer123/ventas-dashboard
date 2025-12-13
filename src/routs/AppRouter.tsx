import { BrowserRouter, Routes, Route } from "react-router-dom";
//import de las paginas
import Login from "../pages/auth/Login";
import LayoutDashboard from "../layouts/LayoutDashboard";
import PrivateRoute from "./PrivateRoute";
//importar el contexto del user
import { AuthProvider } from "../context/AuthContext";
//importar el contexto de sucursal
import { BranchProvider } from "../context/BranchContext";
//import del sonner el toast
import { Toaster } from "@/components/ui/sonner";
//improt pages
import Dashboard from "@/pages/dashboard/Dashboard";
import Personal from "../pages/employee/Employee";
import Branch from "@/pages/branch/Branch";
import CreateProduct from "@/pages/product/CreateProduct";
import Category from "@/pages/categories/Category";
import Product from "@/pages/product/Product";

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
          <Route path="personal" element={<Personal />} />
          <Route path="sucursales" element={<Branch />} />
          <Route path="categories" element={<Category />} />
          <Route path="product" element={<Product />} />
          <Route path="createp" element={<CreateProduct />} />
        </Route>
      </Routes>
      <Toaster theme="dark" />
    </BrowserRouter>
  );
};

export default AppRouter;
