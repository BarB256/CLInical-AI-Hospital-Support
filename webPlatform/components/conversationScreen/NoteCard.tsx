import { motion } from "motion/react";
import { FileText } from "lucide-react";

interface NoteCardProps {
  id: string;
  content: string;
  timestamp: Date;
  isNew?: boolean;
}

export default function NoteCard({ content, timestamp, isNew }: NoteCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="relative p-4 bg-white border-l-4 border-[#4DB8AC] rounded-lg shadow-sm hover:shadow-md transition-shadow"
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
        <div className="mt-1 p-2 bg-[#4DB8AC]/10 rounded-lg">
          <FileText className="w-4 h-4 text-[#4DB8AC]" />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-foreground leading-relaxed">{content}</p>

          <div className="mt-3 flex items-center gap-3 text-sm text-muted-foreground">
            <span className="text-border">•</span>
            <time>{formatTime(timestamp)}</time>
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