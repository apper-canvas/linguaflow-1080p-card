import { motion } from 'framer-motion';

const SkeletonLoader = ({ count = 3 }) => {
  const shimmerVariants = {
    initial: { x: '-100%' },
    animate: { 
      x: '100%',
      transition: {
        repeat: Infinity,
        duration: 1.5,
        ease: 'linear'
      }
    }
  };

  return (
    <div className="space-y-4">
      {[...Array(count)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`flex ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}
        >
          <div className="max-w-xs lg:max-w-md w-full">
            <div className="relative overflow-hidden bg-surface-200 rounded-2xl p-4">
              <div className="space-y-2">
                <div className="h-4 bg-surface-300 rounded w-3/4"></div>
                <div className="h-4 bg-surface-300 rounded w-1/2"></div>
              </div>
              
              {/* Shimmer effect */}
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              />
            </div>
            
            <div className="mt-1 px-2">
              <div className="h-3 bg-surface-200 rounded w-12"></div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SkeletonLoader;