import { Navigate } from "react-router-dom";
import { useCheckAuth } from "../hooks/auth/useCheckAuth";
import { type JSX } from "react";

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const { data: user, isLoading } = useCheckAuth(); // aquí data es el usuario

  if (isLoading) return <p>Cargando sesión...</p>;

  if (!user) return <Navigate to="/" replace />; // si no hay usuario logueado

  return children;
}

/* 
{
  id: string,
  email: string,
  phone: string | null,
  created_at: string,
  confirmed_at: string | null,
  last_sign_in_at: string | null,
  role: string | null, // si agregaste metadata personalizada
  // ...otros campos que tengas en auth.user_metadata
}
*/
