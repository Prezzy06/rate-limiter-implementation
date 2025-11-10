import { Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border-b border-border py-6 px-4 md:px-8"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3">
        <div className="bg-primary/10 p-3 rounded-xl">
          <Activity className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Rate Limiter Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Monitor and test rate limiting algorithms in real-time
          </p>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
