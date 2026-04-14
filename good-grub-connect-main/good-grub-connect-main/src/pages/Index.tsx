import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { Heart, Clock, BarChart3, MapPin, ArrowRight, Users, Utensils, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import heroIllustration from "@/assets/hero-illustration.png";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const features = [
  { icon: Clock, title: "Real-Time Matching", desc: "Instantly connect surplus food with nearby NGOs before it expires." },
  { icon: BarChart3, title: "Priority System", desc: "Urgency-based ranking ensures the most perishable food gets distributed first." },
  { icon: MapPin, title: "Location Tracking", desc: "See nearby donations and optimize pickup routes effortlessly." },
];

const stats = [
  { value: "12,400+", label: "Meals Saved", icon: Utensils },
  { value: "340+", label: "Active Donors", icon: Heart },
  { value: "85", label: "NGO Partners", icon: Users },
  { value: "98%", label: "Pickup Rate", icon: TrendingUp },
];

const Index = () => {
  const navigate = useNavigate();

  // 🔥 FINAL FIX FUNCTION
  const handleNavigation = (path: string) => {
    const user = localStorage.getItem("user");

    if (!user) {
      // 🔥 STORE INTENT (VERY IMPORTANT)
      localStorage.setItem("redirectAfterLogin", path);

      navigate("/login");
    } else {
      navigate(path);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

        <div className="container relative py-24 md:py-36 flex flex-col items-center text-center gap-6">
          <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Heart className="h-4 w-4 fill-primary" /> Reducing food waste together
          </motion.div>

          <motion.h1 initial="hidden" animate="visible" custom={1} variants={fadeUp}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground max-w-3xl">
            Connecting Surplus Food to Those in Need
          </motion.h1>

          <motion.p initial="hidden" animate="visible" custom={2} variants={fadeUp}
            className="text-lg text-muted-foreground max-w-xl">
            FoodBridge connects restaurants, households, and event organizers with NGOs — turning surplus into sustenance.
          </motion.p>

          {/* 🔥 FIXED BUTTONS */}
          <motion.div initial="hidden" animate="visible" custom={3} variants={fadeUp}
            className="flex flex-wrap gap-4 justify-center">

            <Button
              onClick={() => handleNavigation("/donor")}
              variant="hero"
              size="lg"
              className="text-base px-8"
            >
              Donate Food <ArrowRight className="h-4 w-4 ml-1" />
            </Button>

            <Button
              onClick={() => handleNavigation("/ngo")}
              variant="hero-outline"
              size="lg"
              className="text-base px-8"
            >
              Find Donations
            </Button>

          </motion.div>

          <motion.img initial="hidden" animate="visible" custom={4} variants={fadeUp}
            src={heroIllustration}
            alt="People sharing food"
            width={600}
            height={461}
            className="mt-8 max-w-md md:max-w-lg w-full"
          />
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-card">
        <div className="container py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial="hidden" whileInView="visible"
              viewport={{ once: true }} custom={i} variants={fadeUp}
              className="flex flex-col items-center gap-2 text-center">
              <s.icon className="h-6 w-6 text-primary" />
              <span className="text-2xl md:text-3xl font-bold text-foreground">{s.value}</span>
              <span className="text-sm text-muted-foreground">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container py-20 md:py-28">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">How FoodBridge Works</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div key={f.title} initial="hidden" whileInView="visible"
              viewport={{ once: true }} custom={i} variants={fadeUp}
              className="rounded-xl bg-card border p-8">
              <f.icon className="h-6 w-6 text-primary" />
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;