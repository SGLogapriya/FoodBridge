import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Utensils, Clock, MapPin, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const NgoDashboard = () => {
  const [donations, setDonations] = useState([]);

  // fetch donations from backend
  const fetchDonations = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/donations");
      const data = await res.json();
      setDonations(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  // ✅ THIS IS THE FUNCTION YOU ASKED ABOUT
  const acceptDonation = async (id: string) => {
    try {
      await fetch(`http://localhost:5000/api/donations/${id}/accept`, {
        method: "PUT",
      });

      // refresh donations after accepting
      fetchDonations();
    } catch (error) {
      console.error(error);
    }
  };

  // filter only available donations
  const available = donations.filter((d: any) => d.status === "available");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Available Donations
          </h1>
          <p className="text-muted-foreground mt-1">
            Browse and accept donations near you
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {available.map((d: any, i) => (
            <motion.div
              key={d._id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-xl bg-card border border-border shadow-card hover:shadow-card-hover transition-shadow duration-300 p-6 flex flex-col"
            >
              <div className="flex items-start justify-between mb-1">
                <div className="flex items-center gap-2">
                  <Utensils className="h-4 w-4 text-primary" />
                  <h3 className="font-semibold text-foreground">
                    {d.foodName}
                  </h3>
                </div>

                <StatusBadge status={d.status} />
              </div>

              <p className="text-xs text-muted-foreground mb-3">
                by Donor
              </p>

              <p className="text-sm text-muted-foreground mb-4">
                {d.quantity}
              </p>

              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-5">
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {d.expiryTime}
                </span>

                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {d.location?.split(",")[0]}
                </span>
              </div>

              <div className="mt-auto flex gap-2">
                <Link to={`/donation/${d._id}`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">
                    Details <ArrowRight className="h-3.5 w-3.5 ml-1" />
                  </Button>
                </Link>

                <Button
                  variant="accent"
                  size="sm"
                  className="flex-1"
                  onClick={() => acceptDonation(d._id)}
                >
                  Accept
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NgoDashboard;