import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/StatusBadge";
import {
  ArrowLeft,
  Utensils,
  MapPin,
  User,
  FileText,
  CheckCircle2
} from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import API_BASE_URL from "@/config/api";

const steps = ["Available", "Accepted", "Completed"] as const;

const DonationDetails = () => {
  const { id } = useParams();
  const [donation, setDonation] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState("");

  // FETCH DONATION (FIXED FOR AZURE)
  useEffect(() => {
    const fetchDonation = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/donations`);
        const data = await res.json();

        const found = data.find((d: any) => d._id === id);
        setDonation(found || null);
      } catch (error) {
        console.error("Error fetching donation:", error);
      }
    };

    fetchDonation();
  }, [id]);

  // TIMER
  useEffect(() => {
    if (!donation?.expiryTime) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const expiry = new Date(donation.expiryTime).getTime();
      const diff = expiry - now;

      if (diff <= 0) {
        if (Math.abs(diff) <= 60 * 60 * 1000) {
          setTimeLeft("⚠️ Expired (within 1 hr)");
        } else {
          setTimeLeft("❌ Expired");
        }
        return;
      }

      const totalSeconds = Math.floor(diff / 1000);
      const hrs = Math.floor(totalSeconds / 3600);
      const mins = Math.floor((totalSeconds % 3600) / 60);
      const secs = totalSeconds % 60;

      setTimeLeft(`${hrs}h ${mins}m ${secs}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [donation]);

  if (!donation) {
    return (
      <div className="p-10 text-center text-muted-foreground">
        Loading...
      </div>
    );
  }

  const currentStep = steps.indexOf(
    donation.status?.charAt(0).toUpperCase() + donation.status?.slice(1)
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container max-w-3xl py-8 space-y-6">

        {/* BACK */}
        <Link
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          to="/ngo"
        >
          <ArrowLeft /> Back
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >

          {/* HEADER */}
          <div className="bg-card p-6 rounded-xl border shadow flex justify-between">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Utensils className="text-primary" />
                {donation.foodName}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                by {donation.donorName || "Unknown"}
              </p>
            </div>

            <div className="flex gap-2">
              <StatusBadge status={donation.status} />
              <span
                className={`px-3 py-1 text-xs rounded-full font-medium
                ${
                  donation.priority === "high"
                    ? "bg-red-100 text-red-600"
                    : donation.priority === "medium"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {donation.priority}
              </span>
            </div>
          </div>

          {/* TIMER */}
          <div className="bg-card p-6 rounded-xl border shadow text-center">
            <p className="text-sm text-muted-foreground mb-2">
              Expiry Timer
            </p>

            <p
              className={`text-3xl font-bold
              ${
                timeLeft.includes("Expired")
                  ? "text-red-500"
                  : timeLeft.includes("0h")
                  ? "text-yellow-500"
                  : "text-green-600"
              }`}
            >
              {timeLeft}
            </p>
          </div>

          {/* DETAILS */}
          <div className="grid sm:grid-cols-2 gap-4">

            <div className="bg-secondary/40 p-4 rounded-lg border flex gap-3">
              <MapPin className="text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Location</p>
                <p className="font-medium">
                  {donation.address?.district || "No location"}
                </p>
              </div>
            </div>

            <div className="bg-secondary/40 p-4 rounded-lg border flex gap-3">
              <User className="text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Quantity</p>
                <p className="font-medium">{donation.quantity}</p>
              </div>
            </div>

            <div className="bg-secondary/40 p-4 rounded-lg border flex gap-3 col-span-2">
              <FileText className="text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">
                  Description
                </p>
                <p className="font-medium">
                  {donation.description || "No description"}
                </p>
              </div>
            </div>

          </div>

          {/* TIMELINE */}
          <div className="bg-card p-6 rounded-xl border shadow">
            <h3 className="font-semibold mb-4">Status Timeline</h3>

            <div className="flex items-center">
              {steps.map((step, i) => (
                <div key={step} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center
                      ${
                        i <= currentStep
                          ? "bg-primary text-white"
                          : "bg-muted"
                      }`}
                    >
                      {i <= currentStep ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : (
                        i + 1
                      )}
                    </div>
                    <span className="text-xs mt-2">{step}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="h-1 flex-1 bg-muted mx-2" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* BUTTON */}
          {donation.status === "available" && (
            <Button className="w-full">Accept Donation</Button>
          )}

        </motion.div>
      </div>
    </div>
  );
};

export default DonationDetails;