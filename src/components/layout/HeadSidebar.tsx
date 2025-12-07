import { useSidebar } from "@/components/ui/sidebar";
import clsx from "clsx";
import { Link } from "react-router-dom";

export default function SidebarBanner() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Link
      to="/dashboard"
      className={clsx(
        "flex items-center transition-all duration-300 gap-5 justify-center cursor-pointer py-2 bg-gray-400"
      )}
    >
      {/* LOGO */}
      <img
        src="https://i.pinimg.com/1200x/6c/f7/c1/6cf7c1597a7a67ae81b078c3a09dc3e8.jpg"
        className={clsx(
          "transition-all duration-300",
          isCollapsed ? "size-8" : "w-10 h-10"
        )}
        alt="logo"
      />

      {/* TEXTO */}
      {!isCollapsed && (
        <div className="leading-tight">
          <p className="font-bold text-xl">Mi Empresa</p>
        </div>
      )}
    </Link>
  );
}
