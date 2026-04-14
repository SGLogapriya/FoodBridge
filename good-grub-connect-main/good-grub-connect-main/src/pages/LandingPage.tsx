import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Utensils, Building2 } from "lucide-react";
import { motion } from "framer-motion";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">

      {/* HERO SECTION */}
      <div className="flex flex-col items-center justify-center text-center px-6 py-20">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-4xl font-bold text-primary mb-4"
        >
          <Heart className="h-8 w-8 fill-primary" />
          FoodBridge
        </motion.div>

        <h1 className="text-3xl md:text-5xl font-bold max-w-3xl">
          Connecting Surplus Food to Those in Need
        </h1>

        <p className="text-muted-foreground mt-4 max-w-2xl">
          Reduce food waste, support communities, and help NGOs collect and distribute surplus food efficiently using our smart platform.
        </p>

        {/* ROLE SELECTION CARDS */}
        <div className="grid md:grid-cols-2 gap-6 mt-10 w-full max-w-3xl">

          {/* DONOR */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-card border rounded-xl p-6 shadow"
          >
            <Utensils className="h-10 w-10 text-primary mx-auto" />
            <h2 className="text-xl font-semibold mt-3">I am a Donor</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Share surplus food and help reduce waste
            </p>

            <Link to="/login" onClick={() => localStorage.setItem("redirectAfterLogin", "/donor")}>
              <Button className="mt-4 w-full">Continue as Donor</Button>
            </Link>
          </motion.div>

          {/* NGO */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-card border rounded-xl p-6 shadow"
          >
            <Building2 className="h-10 w-10 text-primary mx-auto" />
            <h2 className="text-xl font-semibold mt-3">I am an NGO</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Collect and distribute food to people in need
            </p>

            <Link to="/login" onClick={() => localStorage.setItem("redirectAfterLogin", "/ngo")}>
              <Button variant="secondary" className="mt-4 w-full">
                Continue as NGO
              </Button>
            </Link>
          </motion.div>

        </div>

        {/* SIGNUP */}
        <div className="mt-8 text-sm text-muted-foreground">
          New user?{" "}
          <Link to="/signup" className="text-primary font-medium">
            Create account
          </Link>
        </div>

      </div>
    </div>
  );
};

export default LandingPage;