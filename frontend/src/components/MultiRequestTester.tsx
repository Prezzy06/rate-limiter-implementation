import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, Loader2 } from 'lucide-react';
import { RateLimitMethod } from '@/api/rateLimiterAPI';

interface MultiRequestTesterProps {
  onTest: (method: RateLimitMethod, count: number) => Promise<void>;
  isLoading: boolean;
}

const MultiRequestTester = ({ onTest, isLoading }: MultiRequestTesterProps) => {
  const [count, setCount] = useState<number>(10);
  const [selectedMethod, setSelectedMethod] = useState<RateLimitMethod>('token');

  const handleTest = async () => {
    await onTest(selectedMethod, count);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Bulk Request Tester</CardTitle>
          <CardDescription>
            Send multiple requests to test rate limiting behavior
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="method">Algorithm</Label>
                <Select
                  value={selectedMethod}
                  onValueChange={(value) => setSelectedMethod(value as RateLimitMethod)}
                >
                  <SelectTrigger id="method">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="token">Token Bucket</SelectItem>
                    <SelectItem value="leaky">Leaky Bucket</SelectItem>
                    <SelectItem value="fixed">Fixed Window</SelectItem>
                    <SelectItem value="sliding">Sliding Window</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="count">Number of Requests</Label>
                <Input
                  id="count"
                  type="number"
                  min="1"
                  max="100"
                  value={count}
                  onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                  disabled={isLoading}
                />
              </div>
            </div>
            <Button
              onClick={handleTest}
              disabled={isLoading}
              className="w-full"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Testing...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Send {count} Request{count !== 1 ? 's' : ''}
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MultiRequestTester;
