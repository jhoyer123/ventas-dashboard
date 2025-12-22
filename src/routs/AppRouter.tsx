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
import Pos from "@/pages/Pos/Pos";
import Sale from "@/pages/sale/Sale";

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
          <Route path="branches" element={<Branch />} />
          <Route path="categories" element={<Category />} />
          <Route path="products" element={<Product />} />
          {/* ruta de creación del producto */}
          <Route path="createp" element={<CreateProduct />} />
          {/* ruta de edición del producto */}
          <Route path="editp/:id" element={<CreateProduct />} />
          {/* modo vista */}
          <Route path="viewp/:id" element={<CreateProduct mode={"view"} />} />
          {/* Pagina de ventas */}
          <Route path="pos" element={<Pos />} />
          {/* pagina de info de las ventas realizadas */}
          <Route path="sales" element={<Sale />} />
        </Route>
      </Routes>
      <Toaster theme="dark" />
    </BrowserRouter>
  );
};

export default AppRouter;
