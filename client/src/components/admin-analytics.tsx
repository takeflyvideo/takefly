import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface AnalyticsSummary {
  todayVisits: number;
  totalVisits: number;
  formSubmissions: number;
}

export default function AdminAnalytics() {
  const [isVisible, setIsVisible] = useState(false);
  const [keySequence, setKeySequence] = useState<string[]>([]);

  const { data: analytics } = useQuery<AnalyticsSummary>({
    queryKey: ["/api/analytics/summary"],
    enabled: isVisible,
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        setKeySequence(prev => [...prev, 'admin'].slice(-3));
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (keySequence.length >= 3) {
      setIsVisible(true);
      setKeySequence([]);
    }
  }, [keySequence]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed top-4 right-4 glass-effect p-4 rounded-lg z-50 min-w-64"
        data-testid="admin-analytics"
      >
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-sm font-semibold text-foreground">Analytics Dashboard</h4>
          <button
            onClick={() => setIsVisible(false)}
            className="text-muted-foreground hover:text-foreground transition-colors"
            data-testid="close-analytics"
          >
            <X size={16} />
          </button>
        </div>
        
        <div className="text-xs text-muted-foreground space-y-2">
          <div className="flex justify-between">
            <span>Visitas hoje:</span>
            <span className="font-semibold text-foreground" data-testid="analytics-today-visits">
              {analytics?.todayVisits ?? '-'}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Total visitas:</span>
            <span className="font-semibold text-foreground" data-testid="analytics-total-visits">
              {analytics?.totalVisits ?? '-'}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Formulários enviados:</span>
            <span className="font-semibold text-foreground" data-testid="analytics-form-submissions">
              {analytics?.formSubmissions ?? '-'}
            </span>
          </div>
        </div>
        
        <div className="mt-4 pt-2 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Pressione Ctrl+Shift+A novamente para ocultar
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
