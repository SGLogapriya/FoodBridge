export interface Donation {
  id: string;
  foodName: string;
  quantity: string;
  location: string;
  expiry: string;
  description?: string;
  status: "available" | "accepted" | "completed";
  priority: "urgent" | "medium" | "safe";
  donor: string;
  createdAt: string;
}

export const mockDonations: Donation[] = [
  { id: "1", foodName: "Vegetable Biryani", quantity: "25 servings", location: "Koramangala, Bangalore", expiry: "2 hours", description: "Freshly made, packed in containers", status: "available", priority: "urgent", donor: "Spice Kitchen", createdAt: "10 min ago" },
  { id: "2", foodName: "Bread & Pastries", quantity: "40 pieces", location: "Indiranagar, Bangalore", expiry: "6 hours", description: "Day-old bakery items, still fresh", status: "available", priority: "medium", donor: "Baker's Delight", createdAt: "25 min ago" },
  { id: "3", foodName: "Rice & Dal", quantity: "50 servings", location: "HSR Layout, Bangalore", expiry: "3 hours", description: "Home-cooked meals from wedding event", status: "accepted", priority: "urgent", donor: "Sharma Family", createdAt: "1 hour ago" },
  { id: "4", foodName: "Fruit Salad", quantity: "15 bowls", location: "MG Road, Bangalore", expiry: "12 hours", description: "Fresh seasonal fruits", status: "completed", priority: "safe", donor: "Green Cafe", createdAt: "3 hours ago" },
  { id: "5", foodName: "Sandwiches", quantity: "30 packs", location: "Whitefield, Bangalore", expiry: "4 hours", description: "Leftover from corporate event", status: "available", priority: "medium", donor: "TechCorp Cafeteria", createdAt: "45 min ago" },
  { id: "6", foodName: "Chapati & Sabzi", quantity: "60 servings", location: "Jayanagar, Bangalore", expiry: "1.5 hours", description: "Freshly prepared, needs quick pickup", status: "available", priority: "urgent", donor: "Annapurna Restaurant", createdAt: "5 min ago" },
];
