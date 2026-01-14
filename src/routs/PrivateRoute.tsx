import { Navigate } from "react-router-dom";
import { useCheckAuth } from "../hooks/auth/useCheckAuth";
import { type JSX } from "react";
import { SkeletonCard } from "@/components/common/SkeletonCard";

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const { data: user, isLoading } = useCheckAuth(); // aquí data es el usuario

  if (isLoading)
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <SkeletonCard />
      </div>
    );

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
  role: string | null, 
  // ...otros campos que tengas en auth.user_metadata
}
*/
