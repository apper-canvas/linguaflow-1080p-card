import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import ApperIcon from '@/components/ApperIcon';

const ErrorState = ({ 
  message = 'Something went wrong', 
  onRetry,
  title = 'Oops!',
  className = ''
}) => {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3 }
    }
  };

  const iconVariants = {
    initial: { rotate: 0 },
    animate: { 
      rotate: [0, -10, 10, -10, 0],
      transition: { 
        duration: 0.5,
        repeat: Infinity,
        repeatDelay: 3
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`flex flex-col items-center justify-center p-8 text-center ${className}`}
    >
      <motion.div
        variants={iconVariants}
        initial="initial"
        animate="animate"
        className="mb-4"
      >
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
          <ApperIcon name="AlertTriangle" className="w-8 h-8 text-red-500" />
        </div>
      </motion.div>
      
      <Text variant="heading" size="xl" weight="semibold" className="mb-2">
        {title}
      </Text>
      
      <Text variant="body" size="base" color="muted" className="mb-6 max-w-md">
        {message}
      </Text>
      
      {onRetry && (
        <Button
          variant="primary"
          icon="RefreshCw"
          onClick={onRetry}
          className="min-w-32"
        >
          Try Again
        </Button>
      )}
    </motion.div>
  );
};

export default ErrorState;