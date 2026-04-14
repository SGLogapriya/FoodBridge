import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";

// MAP
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// FIX MARKER ICON
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// FORMAT TIMER
const formatTime = (seconds: number) => {
  const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
};

const AddDonation = () => {
  const { toast } = useToast();

  const [donorType, setDonorType] = useState<"individual" | "organization">("individual");
  const [quantity, setQuantity] = useState(1);

  const [expiryInput, setExpiryInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);

  const [coords, setCoords] = useState<any>({ lat: null, lng: null });

  const [formData, setFormData] = useState({
    donorName: "",
    phone: "",
    email: "",

    orgName: "",
    orgPhone: "",
    orgEmail: "",
    repName: "",
    repPhone: "",
    repEmail: "",

    foodName: "",
    address1: "",
    address2: "",
    pincode: "",
    district: "",
    state: "",
    description: "",
  });

  // TIMER COUNTDOWN
  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  // CONVERT HH:MM:SS → seconds
  const handleExpiryChange = (value: string) => {
    setExpiryInput(value);

    const parts = value.split(":").map(Number);

    if (parts.length === 3) {
      const seconds = parts[0] * 3600 + parts[1] * 60 + parts[2];
      setTimeLeft(seconds);
    }
  };

  const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handlePincode = async (pincode: string) => {
    setFormData({ ...formData, pincode });

    if (pincode.length === 6) {
      const res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await res.json();

      if (data[0].Status === "Success") {
        const po = data[0].PostOffice[0];

        setFormData(prev => ({
          ...prev,
          pincode,
          district: po.District,
          state: po.State
        }));
      } else {
        alert("Invalid Pincode");
      }
    }
  };

  const LocationPicker = () => {
    useMapEvents({
      click(e) {
        setCoords({
          lat: e.latlng.lat,
          lng: e.latlng.lng
        });
      }
    });
    return null;
  };

  // 🔥 FINAL SUBMIT FIX
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (donorType === "individual" && !isValidEmail(formData.email)) {
      alert("Enter valid email");
      return;
    }

    if (donorType === "organization" && !isValidEmail(formData.orgEmail)) {
      alert("Enter valid organization email");
      return;
    }

    if (!coords.lat) {
      alert("Select location on map");
      return;
    }

    // 🔥 MAIN FIX
    const expiryDate = new Date(Date.now() + timeLeft * 1000);

    const data = {
      donorType,

      ...(donorType === "individual"
        ? {
            donorName: formData.donorName,
            phone: formData.phone,
            email: formData.email
          }
        : {
            organization: {
              name: formData.orgName,
              phone: formData.orgPhone,
              email: formData.orgEmail,
              representative: {
                name: formData.repName,
                phone: formData.repPhone,
                email: formData.repEmail
              }
            }
          }),

      foodName: formData.foodName,
      quantity,

      expiryTime: expiryDate.toISOString(),

      address: {
        line1: formData.address1,
        line2: formData.address2,
        district: formData.district,
        state: formData.state,
        country: "India",
        pincode: formData.pincode
      },

      location: coords,
      description: formData.description
    };

    await fetch("http://localhost:5000/api/donations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    toast({
      title: "Donation Added!",
      description: "Success 🎉"
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container max-w-2xl py-8">
        <Link to="/donor" className="flex items-center gap-2 mb-6">
          <ArrowLeft /> Back
        </Link>

        <motion.div className="bg-card p-8 rounded-xl border shadow">
          <h1 className="text-2xl font-bold mb-6">Add Donation</h1>

          <div className="flex gap-3 mb-4">
            <Button onClick={() => setDonorType("individual")}>Individual</Button>
            <Button onClick={() => setDonorType("organization")}>Organization</Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* INDIVIDUAL */}
            {donorType === "individual" ? (
              <>
                <Input placeholder="Full Name"
                  onChange={(e) => setFormData({ ...formData, donorName: e.target.value })} />
                <Input placeholder="Phone"
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                <Input placeholder="Email"
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              </>
            ) : (
              <>
                <div className="space-y-6">

  {/* 🏢 ORGANIZATION SECTION */}
  <div className="bg-secondary/40 p-4 rounded-lg border">
    <h2 className="font-semibold mb-3 text-foreground">🏢 Organization Details</h2>

    <div className="space-y-3">
      <Input placeholder="Organization Name"
        className="focus:ring-2 focus:ring-primary"
        onChange={(e) => setFormData({ ...formData, orgName: e.target.value })} />

      <Input placeholder="Organization Phone"
        className="focus:ring-2 focus:ring-primary"
        onChange={(e) => setFormData({ ...formData, orgPhone: e.target.value })} />

      <Input placeholder="Organization Email"
        className="focus:ring-2 focus:ring-primary"
        onChange={(e) => setFormData({ ...formData, orgEmail: e.target.value })} />
    </div>
  </div>

  {/* 👤 REPRESENTATIVE SECTION */}
  <div className="bg-secondary/40 p-4 rounded-lg border">
    <h2 className="font-semibold mb-3 text-foreground">👤 Representative Details</h2>

    <div className="space-y-3">
      <Input placeholder="Representative Name"
        className="focus:ring-2 focus:ring-primary"
        onChange={(e) => setFormData({ ...formData, repName: e.target.value })} />

      <Input placeholder="Representative Phone"
        className="focus:ring-2 focus:ring-primary"
        onChange={(e) => setFormData({ ...formData, repPhone: e.target.value })} />

      <Input placeholder="Representative Email"
        className="focus:ring-2 focus:ring-primary"
        onChange={(e) => setFormData({ ...formData, repEmail: e.target.value })} />
    </div>
  </div>

</div>
              </>
            )}

            <Input placeholder="Food Name"
              onChange={(e) => setFormData({ ...formData, foodName: e.target.value })} />

            <div className="flex gap-3 items-center">
              <Button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</Button>
              {quantity}
              <Button type="button" onClick={() => setQuantity(quantity + 1)}>+</Button>
            </div>

            <Input
              placeholder="Expiry Time (HH:MM:SS)"
              value={expiryInput}
              onChange={(e) => handleExpiryChange(e.target.value)}
            />

            <p>Time Left: {formatTime(timeLeft)}</p>

            <Input placeholder="Address Line 1"
              onChange={(e) => setFormData({ ...formData, address1: e.target.value })} />

            <Input placeholder="Address Line 2"
              onChange={(e) => setFormData({ ...formData, address2: e.target.value })} />

            <Input placeholder="Pincode"
              onChange={(e) => handlePincode(e.target.value)} />

            <Input value={formData.district} readOnly />
            <Input value={formData.state} readOnly />

            <MapContainer center={[13.0827, 80.2707]} zoom={10} style={{ height: 300 }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <LocationPicker />
              {coords.lat && <Marker position={[coords.lat, coords.lng]} />}
            </MapContainer>

            <Textarea placeholder="Description"
              onChange={(e) => setFormData({ ...formData, description: e.target.value })} />

            <Button type="submit" className="w-full">
              Submit Donation
            </Button>

          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AddDonation;