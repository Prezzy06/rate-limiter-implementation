import { useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, Droplets, Grid3x3, SlidersHorizontal } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import RateLimiterCard from '@/components/RateLimiterCard';
import ResultsPanel from '@/components/ResultsPanel';
import MultiRequestTester from '@/components/MultiRequestTester';
import RequestChart from '@/components/RequestChart';
import { rateLimiterAPI, RateLimitMethod, ApiResponse } from '@/api/rateLimiterAPI';

const Dashboard = () => {
  const [results, setResults] = useState<ApiResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState({
    token: { allowed: 0, blocked: 0 },
    leaky: { allowed: 0, blocked: 0 },
    fixed: { allowed: 0, blocked: 0 },
    sliding: { allowed: 0, blocked: 0 },
  });

  const algorithms = [
    {
      title: 'Token Bucket',
      description: 'Allows bursts of traffic while maintaining average rate (capacity = 10, refill = 1/sec)',
      icon: Layers,
      method: 'token' as RateLimitMethod,
    },
    {
      title: 'Leaky Bucket',
      description: 'Smooths out traffic spikes with constant output rate (capacity = 10, leak = 1/sec)',
      icon: Droplets,
      method: 'leaky' as RateLimitMethod,
    },
    {
      title: 'Fixed Window',
      description: 'Resets request counter at fixed time intervals (10 requests per 10 seconds)',
      icon: Grid3x3,
      method: 'fixed' as RateLimitMethod,
    },
    {
      title: 'Sliding Window',
      description: 'Dynamic window that slides with time for accuracy (10 requests per 10 seconds)',
      icon: SlidersHorizontal,
      method: 'sliding' as RateLimitMethod,
    },
  ];

  const handleTest = async (method: RateLimitMethod) => {
    setIsLoading(true);
    try {
      const response = await rateLimiterAPI.checkRateLimit(method);
      setResults((prev) => [response, ...prev].slice(0, 20));
      
      setStats((prev) => ({
        ...prev,
        [method]: {
          allowed: response.allowed ? prev[method].allowed + 1 : prev[method].allowed,
          blocked: !response.allowed ? prev[method].blocked + 1 : prev[method].blocked,
        },
      }));

      if (response.allowed) {
        toast({
          title: '✅ Request Allowed',
          description: response.message,
        });
      } else {
        toast({
          title: '❌ Request Blocked',
          description: response.message,
          variant: 'destructive',
        });
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Backend is offline or unreachable',
        variant: 'destructive',
      });
      setResults((prev) => [
        {
          message: 'Error: Backend offline',
          allowed: false,
          timestamp: new Date().toISOString(),
        },
        ...prev,
      ].slice(0, 20));
    } finally {
      setIsLoading(false);
    }
  };

  const handleMultipleRequests = async (method: RateLimitMethod, count: number) => {
    setIsLoading(true);
    try {
      const result = await rateLimiterAPI.checkMultipleRequests(method, count);
      
      setResults((prev) => [...result.responses, ...prev].slice(0, 20));
      
      setStats((prev) => ({
        ...prev,
        [method]: {
          allowed: prev[method].allowed + result.allowed,
          blocked: prev[method].blocked + result.blocked,
        },
      }));

      toast({
        title: 'Bulk Test Complete',
        description: `${result.allowed} allowed, ${result.blocked} blocked`,
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to complete bulk test',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="space-y-8"
        >
          {/* Algorithm Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {algorithms.map((algo, index) => (
              <motion.div
                key={algo.method}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <RateLimiterCard
                  {...algo}
                  onTest={handleTest}
                  isLoading={isLoading}
                  stats={stats[algo.method]}
                />
              </motion.div>
            ))}
          </div>

          {/* Multi-Request Tester */}
          <MultiRequestTester
            onTest={handleMultipleRequests}
            isLoading={isLoading}
          />

          {/* Chart */}
          <RequestChart data={stats} />

          {/* Results Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <ResultsPanel results={results} />
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
