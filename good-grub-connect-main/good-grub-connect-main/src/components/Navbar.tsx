import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isLanding = location.pathname === "/";

  // ✅ FIXED NAVIGATION FUNCTION
  const handleNavigation = (path: string) => {
    const user = localStorage.getItem("user");

    console.log("NAV CLICK", path, "USER:", user); // 🔥 DEBUG

    if (!user) {
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-card">
      <div className="container flex h-16 items-center justify-between">

        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary">
          <Heart className="h-6 w-6 fill-primary" />
          FoodBridge
        </Link>

        {/* DESKTOP */}
        <div className="hidden md:flex items-center gap-6">

          {isLanding ? (
            <>
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>

              <Link to="/signup">
                <Button>Signup</Button>
              </Link>
            </>
          ) : (
            <>
              {/* ✅ IMPORTANT: type="button" */}
              <button type="button" onClick={() => handleNavigation("/donor")}>
                Donor Dashboard
              </button>

              <button type="button" onClick={() => handleNavigation("/ngo")}>
                NGO Dashboard
              </button>

              <button type="button" onClick={() => handleNavigation("/analytics")}>
                Analytics
              </button>

              <Button onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}

        </div>

        {/* MOBILE */}
        <button onClick={() => setOpen(!open)} className="md:hidden">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden p-4 flex flex-col gap-3">

          {isLanding ? (
            <>
              <Link to="/login">
                <Button className="w-full">Login</Button>
              </Link>

              <Link to="/signup">
                <Button className="w-full">Signup</Button>
              </Link>
            </>
          ) : (
            <>
              {/* ✅ FIXED */}
              <button type="button" onClick={() => handleNavigation("/donor")}>
                Donor Dashboard
              </button>

              <button type="button" onClick={() => handleNavigation("/ngo")}>
                NGO Dashboard
              </button>

              <button type="button" onClick={() => handleNavigation("/analytics")}>
                Analytics
              </button>

              <Button onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}

        </div>
      )}
    </nav>
  );
};

export default Navbar;