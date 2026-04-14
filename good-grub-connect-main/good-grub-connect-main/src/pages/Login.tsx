import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Mail, Lock } from "lucide-react";
import { motion } from "framer-motion";
import API_BASE_URL from "@/config/api";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (e: any) => {
    e.preventDefault();

    const form = e.target;

    const redirectPath = localStorage.getItem("redirectAfterLogin");

    let expectedRole: "donor" | "ngo" | null = null;

    if (redirectPath === "/donor") expectedRole = "donor";
    if (redirectPath === "/ngo") expectedRole = "ngo";

    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email.value,
          password: form.password.value,
          role: expectedRole,
        }),
      });

      const result = await res.json();

      console.log("LOGIN RESPONSE:", result);

      if (!res.ok) {
        alert(result.msg || "Login failed");
        return;
      }

      if (!result.user || !result.user.role) {
        alert("Invalid server response");
        return;
      }

      const user = result.user;

      localStorage.setItem("user", JSON.stringify(user));

      if (redirectPath) {
        navigate(redirectPath);
        localStorage.removeItem("redirectAfterLogin");
      } else {
        navigate(user.role === "donor" ? "/donor" : "/ngo");
      }

    } catch (error) {
      console.error("LOGIN ERROR:", error);
      alert("Server error. Check backend.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-6">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 text-2xl font-bold text-primary"
          >
            <Heart className="h-6 w-6 fill-primary" />
            FoodBridge
          </Link>
          <p className="text-muted-foreground mt-2">
            Login to continue
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 shadow">
          <form onSubmit={handleLogin} className="space-y-5">

            <div>
              <Label>Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <Label>Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  name="password"
                  type="password"
                  placeholder="Enter password"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full">
              Login
            </Button>

          </form>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-primary font-medium">
              Signup
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;