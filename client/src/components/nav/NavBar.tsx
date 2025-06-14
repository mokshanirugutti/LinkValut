import { useNavigate } from "react-router";
import useAuthStore from "@/zustand/useAuthStore";
import UserActions from "../UserActions";
import { SparklesIcon } from "lucide-react"
import { Button } from "@/components/ui/button"


const Navbar = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  return (
    <nav className="w-full px-6 py-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 pagePadding">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <button
          onClick={() => navigate("/")}
          className="text-xl font-bold text-gray-900 dark:text-white hover:underline"
        >
          LinkVault
        </button>

        <div className="flex items-center gap-4 ">
          {user ? (
            <div className="mx-10">
              <UserActions />
            </div>
          ) : (
            <Button variant="outline" onClick={() => navigate("/login")} className="flex items-center gap-2 hover:bg-black hover:text-white transition-all duration-300">
              <SparklesIcon className="-me-1 opacity-60" size={16} aria-hidden="true" />
              <span>Login</span>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;