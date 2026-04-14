import Navbar from "@/components/Navbar";
import { Utensils, CheckCircle2, Clock, TrendingUp, Users, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const statsCards = [
  { label: "Total Donations", value: "248", icon: Utensils, color: "text-primary" },
  { label: "Completed Pickups", value: "192", icon: CheckCircle2, color: "text-safe" },
  { label: "Pending Requests", value: "32", icon: Clock, color: "text-warning" },
  { label: "Active Donors", value: "86", icon: Users, color: "text-accent" },
  { label: "NGO Partners", value: "24", icon: Heart, color: "text-primary" },
  { label: "Meals Saved", value: "5,840", icon: TrendingUp, color: "text-safe" },
];

const barData = [
  { month: "Jan", donations: 18 }, { month: "Feb", donations: 24 }, { month: "Mar", donations: 32 },
  { month: "Apr", donations: 28 }, { month: "May", donations: 45 }, { month: "Jun", donations: 52 },
  { month: "Jul", donations: 49 },
];

const pieData = [
  { name: "Completed", value: 192. },
  { name: "Accepted", value: 24 },
  { name: "Available", value: 32 },
];
const pieColors = ["hsl(153,44%,30%)", "hsl(30,90%,56%)", "hsl(40,60%,80%)"];

const Analytics = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="container py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Analytics</h1>
      <p className="text-muted-foreground mb-8">Overview of platform activity</p>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
        {statsCards.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
            className="rounded-xl bg-card border border-border shadow-card p-5 text-center">
            <s.icon className={`h-6 w-6 mx-auto mb-2 ${s.color}`} />
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="rounded-xl bg-card border border-border shadow-card p-6">
          <h3 className="font-semibold text-foreground mb-4">Monthly Donations</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(40,15%,89%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(150,10%,45%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(150,10%,45%)" />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(40,15%,89%)" }} />
              <Bar dataKey="donations" fill="hsl(153,44%,30%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="rounded-xl bg-card border border-border shadow-card p-6">
          <h3 className="font-semibold text-foreground mb-4">Donation Status</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" paddingAngle={3}>
                {pieData.map((_, i) => <Cell key={i} fill={pieColors[i]} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(40,15%,89%)" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-2">
            {pieData.map((d, i) => (
              <div key={d.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: pieColors[i] }} />
                {d.name}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </div>
);

export default Analytics;
