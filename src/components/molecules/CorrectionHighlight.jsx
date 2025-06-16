import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import ApperIcon from '@/components/ApperIcon';

const CorrectionHighlight = ({ 
  correction, 
  onAccept, 
  onReject, 
  onClick 
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const tooltipVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.2, ease: 'easeOut' }
    },
    exit: { 
      opacity: 0, 
      y: 10, 
      scale: 0.95,
      transition: { duration: 0.15 }
    }
  };

  return (
    <span className="relative inline-block">
      <motion.span
        whileHover={{ scale: 1.02 }}
        className={`
          cursor-pointer relative
          ${correction.accepted 
            ? 'text-green-600 bg-green-100 px-1 rounded' 
            : 'border-b-2 border-dashed border-accent-500 text-accent-700 hover:bg-accent-50'
          }
        `}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={onClick}
      >
        {correction.originalText}
      </motion.span>

      <AnimatePresence>
        {showTooltip && !correction.accepted && (
          <motion.div
            variants={tooltipVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50"
          >
            <div className="bg-white rounded-lg shadow-lg border border-surface-200 p-4 min-w-64 max-w-sm">
              <div className="space-y-3">
                <div>
                  <Text variant="body" size="sm" weight="medium" color="error">
                    Original: {correction.originalText}
                  </Text>
                  <Text variant="body" size="sm" weight="medium" color="success">
                    Suggested: {correction.correctedText}
                  </Text>
                </div>
                
                <div className="border-t border-surface-100 pt-3">
                  <Text variant="caption" size="xs" color="muted" weight="medium">
                    {correction.rule}
                  </Text>
                  <Text variant="body" size="xs" color="muted" className="mt-1">
                    {correction.explanation}
                  </Text>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    variant="accent"
                    size="small"
                    icon="Check"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAccept();
                      setShowTooltip(false);
                    }}
                    className="flex-1"
                  >
                    Accept
                  </Button>
                  <Button
                    variant="ghost"
                    size="small"
                    icon="X"
                    onClick={(e) => {
                      e.stopPropagation();
                      onReject();
                      setShowTooltip(false);
                    }}
                    className="flex-1"
                  >
                    Ignore
                  </Button>
                </div>
              </div>

              {/* Tooltip arrow */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
                <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-surface-200 -mt-1"></div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
};

export default CorrectionHighlight;