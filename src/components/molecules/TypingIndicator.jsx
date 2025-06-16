import { motion } from 'framer-motion';
import Text from '@/components/atoms/Text';

const TypingIndicator = () => {
  const dotVariants = {
    initial: { opacity: 0.4, scale: 1 },
    animate: { 
      opacity: 1, 
      scale: 1.2,
      transition: {
        duration: 0.6,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut'
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex justify-start mb-4"
    >
      <div className="max-w-xs lg:max-w-md">
        <div className="bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200 px-4 py-3 rounded-2xl rounded-bl-md">
          <div className="flex items-center space-x-1">
            <Text variant="body" size="sm" color="muted" className="mr-2">
              AI is typing
            </Text>
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                variants={dotVariants}
                initial="initial"
                animate="animate"
                style={{ animationDelay: `${index * 0.2}s` }}
                className="w-2 h-2 bg-primary-400 rounded-full"
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TypingIndicator;