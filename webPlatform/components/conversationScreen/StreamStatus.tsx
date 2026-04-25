import { motion } from "motion/react";
import { Activity } from "lucide-react";
import type { StreamStatusProps } from "@/types";

export default function StreamStatus({ isConnected, lastUpdate }: StreamStatusProps) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-white border border-border rounded-lg shadow-sm">
      <motion.div
        animate={{
          scale: isConnected ? [1, 1.2, 1] : 1,
        }}
        transition={{
          duration: 2,
          repeat: isConnected ? Infinity : 0,
        }}
        className={`w-2 h-2 rounded-full ${
          isConnected ? "bg-[#4DB8AC]" : "bg-muted"
        }`}
      />

      <Activity className="w-4 h-4 text-muted-foreground" />

      <span className="text-sm text-muted-foreground">
        {isConnected ? "Live" : "Disconnected"}
      </span>

      {lastUpdate && (
        <>
          <span className="text-border">•</span>
          <span className="text-xs text-muted-foreground">
            Updated {formatTime(lastUpdate)}
          </span>
        </>
      )}
    </div>
  );
}

function formatTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);

  if (seconds < 10) return "now";
  if (seconds < 60) return `${seconds}s ago`;

  const minutes = Math.floor(seconds / 60);
  return `${minutes}m ago`;
}
