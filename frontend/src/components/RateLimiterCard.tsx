import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface RateLimiterCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  method: string;
  onTest: (method: string) => void;
  isLoading: boolean;
  stats: {
    allowed: number;
    blocked: number;
  };
}

const RateLimiterCard = ({
  title,
  description,
  icon: Icon,
  method,
  onTest,
  isLoading,
  stats,
}: RateLimiterCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="h-full border-border bg-card hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="bg-primary/10 p-3 rounded-lg">
              <Icon className="w-6 h-6 text-primary" />
            </div>
            <div className="flex gap-2 text-xs">
              <div className="bg-success/10 text-success-foreground px-2 py-1 rounded-md font-medium">
                ✓ {stats.allowed}
              </div>
              <div className="bg-destructive/10 text-destructive-foreground px-2 py-1 rounded-md font-medium">
                ✗ {stats.blocked}
              </div>
            </div>
          </div>
          <CardTitle className="mt-4">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={() => onTest(method)}
            disabled={isLoading}
            className="w-full"
            variant="default"
          >
            {isLoading ? 'Testing...' : 'Test Algorithm'}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RateLimiterCard;
