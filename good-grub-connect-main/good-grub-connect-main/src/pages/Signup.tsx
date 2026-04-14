import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Mail, Lock, User } from "lucide-react";
import { motion } from "framer-motion";
import API_BASE_URL from "@/config/api";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "donor",
  });

  const handleSignup = async (e: any) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.msg || "Signup failed");
        return;
      }

      alert("Signup successful 🎉");
      navigate("/login");

    } catch (error) {
      console.error("Signup Error:", error);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* HEADER */}
        <div className="text-center mb-6">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 text-2xl font-bold text-primary"
          >
            <Heart className="h-6 w-6 fill-primary" />
            FoodBridge
          </Link>
          <p className="text-muted-foreground mt-2">
            Create your account
          </p>
        </div>

        {/* FORM */}
        <div className="bg-card border border-border rounded-xl p-6 shadow">
          <form onSubmit={handleSignup} className="space-y-5">

            <div>
              <Label>Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Enter name"
                  className="pl-10"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div>
              <Label>Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Enter email"
                  className="pl-10"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div>
              <Label>Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="Enter password"
                  className="pl-10"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div>
              <Label>Role</Label>
              <select
                className="w-full border rounded-md p-2 bg-background"
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
              >
                <option value="donor">Donor</option>
                <option value="ngo">NGO</option>
              </select>
            </div>

            <Button type="submit" className="w-full">
              Signup
            </Button>

          </form>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-medium">
              Login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;