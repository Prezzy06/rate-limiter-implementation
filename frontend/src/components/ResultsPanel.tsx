import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';
import { ApiResponse } from '@/api/rateLimiterAPI';

interface ResultsPanelProps {
  results: ApiResponse[];
}

const ResultsPanel = ({ results }: ResultsPanelProps) => {
  if (results.length === 0) {
    return (
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Results</CardTitle>
          <CardDescription>Test results will appear here</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <Clock className="w-12 h-12 mb-3 opacity-30" />
            <p className="text-sm">No requests sent yet</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle>Results</CardTitle>
        <CardDescription>Latest {results.length} request(s)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          <AnimatePresence mode="popLayout">
            {results.map((result, index) => (
              <motion.div
                key={`${result.timestamp}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className={`p-4 rounded-lg border ${
                  result.allowed
                    ? 'bg-success/5 border-success/20'
                    : 'bg-destructive/5 border-destructive/20'
                }`}
              >
                <div className="flex items-start gap-3">
                  {result.allowed ? (
                    <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p
                      className={`font-medium ${
                        result.allowed ? 'text-success' : 'text-destructive'
                      }`}
                    >
                      {result.message}
                    </p>
                    {result.timestamp && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(result.timestamp).toLocaleTimeString()}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsPanel;
