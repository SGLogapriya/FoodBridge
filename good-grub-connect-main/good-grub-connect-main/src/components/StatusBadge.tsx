import { cn } from "@/lib/utils";

type StatusType = "available" | "accepted" | "completed" | "urgent" | "medium" | "safe";

const statusStyles: Record<StatusType, string> = {
  available: "bg-primary/10 text-primary",
  accepted: "bg-warning/10 text-warning",
  completed: "bg-muted text-muted-foreground",
  urgent: "bg-urgent/10 text-urgent",
  medium: "bg-medium/10 text-medium",
  safe: "bg-safe/10 text-safe",
};

const StatusBadge = ({ status }: { status: StatusType }) => (
  <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize", statusStyles[status])}>
    {status}
  </span>
);

export default StatusBadge;
