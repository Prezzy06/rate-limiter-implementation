import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

interface RequestChartProps {
  data: {
    token: { allowed: number; blocked: number };
    leaky: { allowed: number; blocked: number };
    fixed: { allowed: number; blocked: number };
    sliding: { allowed: number; blocked: number };
  };
}

const RequestChart = ({ data }: RequestChartProps) => {
  const chartData = [
    {
      name: 'Token Bucket',
      Allowed: data.token.allowed,
      Blocked: data.token.blocked,
    },
    {
      name: 'Leaky Bucket',
      Allowed: data.leaky.allowed,
      Blocked: data.leaky.blocked,
    },
    {
      name: 'Fixed Window',
      Allowed: data.fixed.allowed,
      Blocked: data.fixed.blocked,
    },
    {
      name: 'Sliding Window',
      Allowed: data.sliding.allowed,
      Blocked: data.sliding.blocked,
    },
  ];

  const total = Object.values(data).reduce(
    (sum, val) => sum + val.allowed + val.blocked,
    0
  );

  if (total === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Request Statistics</CardTitle>
          <CardDescription>
            Overview of allowed and blocked requests by algorithm
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis
                dataKey="name"
                className="text-xs"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis
                className="text-xs"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '0.5rem',
                }}
              />
              <Legend />
              <Bar dataKey="Allowed" fill="hsl(var(--success))" radius={[8, 8, 0, 0]} />
              <Bar dataKey="Blocked" fill="hsl(var(--destructive))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RequestChart;
