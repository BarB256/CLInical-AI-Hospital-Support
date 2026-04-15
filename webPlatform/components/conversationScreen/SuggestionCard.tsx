import { motion } from "motion/react";
import { Lightbulb, ArrowRight } from "lucide-react";

interface SuggestionCardProps {
  id: string;
  title: string;
  description: string;
  timestamp: Date;
  isNew?: boolean;
}

export default function SuggestionCard({
  title,
  description,
  timestamp,
  isNew
}: SuggestionCardProps) {


  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="relative p-4 bg-white rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow group"
    >
      {isNew && (
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 0.6, repeat: 3 }}
          className="absolute -top-1 -right-1 w-3 h-3 bg-[#4DB8AC] rounded-full"
        />
      )}

      <div className="flex items-start gap-3">
        <div className="mt-1 p-2 bg-[#FFF4E6] rounded-lg">
          <Lightbulb className="w-4 h-4 text-[#FFB84D]" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-medium text-foreground">{title}</h3>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            {description}
          </p>

          <div className="mt-3 flex items-center gap-3 text-sm text-muted-foreground">
            <span className="text-border">•</span>
            <time className="text-xs text-muted-foreground">
              {formatTime(timestamp)}
            </time>

            <button className="flex items-center gap-1 text-sm text-[#4DB8AC] opacity-0 group-hover:opacity-100 transition-opacity">
              <span>Review</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function formatTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  return date.toLocaleDateString();
}
