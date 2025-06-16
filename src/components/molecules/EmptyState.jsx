import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import ApperIcon from '@/components/ApperIcon';

const EmptyState = ({ 
  title = 'No messages yet',
  description = 'Start a conversation to practice your language skills',
  actionLabel = 'Start Chatting',
  onAction,
  icon = 'MessageCircle',
  className = ''
}) => {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.4 }
    }
  };

  const iconVariants = {
    initial: { y: 0 },
    animate: { 
      y: [-10, 0, -10],
      transition: { 
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
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
        className="mb-6"
      >
        <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
          <ApperIcon name={icon} className="w-10 h-10 text-primary-500" />
        </div>
      </motion.div>
      
      <Text variant="heading" size="xl" weight="semibold" className="mb-2">
        {title}
      </Text>
      
      <Text variant="body" size="base" color="muted" className="mb-8 max-w-md">
        {description}
      </Text>
      
      {onAction && (
        <motion.div
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <Button
            variant="primary"
            size="large"
            icon="MessageCircle"
            onClick={onAction}
          >
            {actionLabel}
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default EmptyState;