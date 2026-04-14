import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/StatusBadge";
import { useEffect, useState } from "react";
import { Plus, Utensils, Clock, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import API_BASE_URL from "@/config/api";

const DonorDashboard = () => {
  const [donations, setDonations] = useState<any[]>([]);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/donations`);
        const data = await res.json();
        setDonations(data);
      } catch (err) {
        console.error("Error fetching donations:", err);
      }
    };

    fetchDonations();
  }, []);

  // SAFE LOCATION FORMAT FUNCTION
  const getLocationText = (location: any) => {
    if (!location) return "No location";

    if (typeof location === "string") {
      return location.split(",")[0];
    }

    if (Array.isArray(location)) {
      return location[0];
    }

    if (typeof location === "object") {
      return location.city || location.address || "Unknown";
    }

    return "Unknown";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Donor Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your food donations
            </p>
          </div>

          <Link to="/add-donation">
            <Button variant="hero" size="lg">
              <Plus className="h-5 w-5 mr-1" /> Add Donation
            </Button>
          </Link>
        </div>

        {/* Donations Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {donations.map((d: any, i) => (
            <motion.div
              key={d._id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                to={`/donation/${d._id}`}
                className="block rounded-xl bg-card border border-border shadow-card hover:shadow-card-hover transition-shadow duration-300 p-6 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Utensils className="h-4 w-4 text-primary" />
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {d.foodName}
                    </h3>
                  </div>

                  <StatusBadge status={d.status} />
                </div>

                <p className="text-sm text-muted-foreground mb-4">
                  Quantity: {d.quantity}
                </p>

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {d.expiryTime}
                  </span>

                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {getLocationText(d.location)}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;