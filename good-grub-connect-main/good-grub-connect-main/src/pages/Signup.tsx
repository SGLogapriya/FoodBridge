import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Mail, Lock, User } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const Signup = () => {
  const [role, setRole] = useState<"donor" | "ngo">("donor");
  const navigate = useNavigate();

  const handleSignup = async (e: any) => {
    e.preventDefault();

    const form = e.target;

    const formData = {
      name: form.name.value,
      email: form.email.value,
      password: form.password.value,
      role,
    };

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      console.log("SIGNUP:", result);

      if (!res.ok) {
        alert(result.msg);
        return;
      }

      navigate(result.user.role === "donor" ? "/donor" : "/ngo");

    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-2xl font-bold text-primary">
            <Heart className="h-7 w-7 fill-primary" /> FoodBridge
          </Link>
          <p className="mt-2 text-muted-foreground">Create your account</p>
        </div>

        <div className="rounded-xl bg-card border p-8 shadow">
          <form className="space-y-5" onSubmit={handleSignup}>

            <div>
              <Label>Name</Label>
              <Input name="name" placeholder="Enter name" required />
            </div>

            <div>
              <Label>Email</Label>
              <Input name="email" type="email" placeholder="Enter email" required />
            </div>

            <div>
              <Label>Password</Label>
              <Input name="password" type="password" placeholder="Enter password" required />
            </div>

            <div className="flex gap-2">
              <button type="button" onClick={() => setRole("donor")}
                className={`flex-1 border p-2 rounded ${role === "donor" ? "bg-primary text-white" : ""}`}>
                Donor
              </button>

              <button type="button" onClick={() => setRole("ngo")}
                className={`flex-1 border p-2 rounded ${role === "ngo" ? "bg-primary text-white" : ""}`}>
                NGO
              </button>
            </div>

            <Button className="w-full" type="submit">
              Create Account
            </Button>

          </form>

          <p className="mt-4 text-center text-sm">
            Already have account?{" "}
            <Link to="/login" className="text-primary">Login</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;