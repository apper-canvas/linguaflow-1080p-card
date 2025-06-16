import { motion } from 'framer-motion';
import Text from '@/components/atoms/Text';
import CorrectionHighlight from '@/components/molecules/CorrectionHighlight';
import { format } from 'date-fns';

const MessageBubble = ({ 
  message, 
  corrections = [], 
  onCorrectionClick,
  onAcceptCorrection,
  onRejectCorrection 
}) => {
  const isUser = message.sender === 'user';
  
  const bubbleVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  };

  const renderMessageWithCorrections = (text) => {
    if (!corrections.length || !isUser) {
      return text;
    }

    let result = [];
    let lastIndex = 0;

    corrections.forEach((correction, index) => {
      const startIndex = text.indexOf(correction.originalText, lastIndex);
      if (startIndex !== -1) {
        // Add text before correction
        if (startIndex > lastIndex) {
          result.push(text.substring(lastIndex, startIndex));
        }
        
        // Add correction highlight
        result.push(
          <CorrectionHighlight
            key={`correction-${correction.Id}`}
            correction={correction}
            onAccept={() => onAcceptCorrection(correction)}
            onReject={() => onRejectCorrection(correction)}
            onClick={() => onCorrectionClick(correction)}
          />
        );
        
        lastIndex = startIndex + correction.originalText.length;
      }
    });

    // Add remaining text
    if (lastIndex < text.length) {
      result.push(text.substring(lastIndex));
    }

    return result;
  };

  return (
    <motion.div
      variants={bubbleVariants}
      initial="hidden"
      animate="visible"
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className={`max-w-xs lg:max-w-md xl:max-w-lg ${isUser ? 'order-2' : 'order-1'}`}>
        <div
          className={`
            px-4 py-3 rounded-2xl shadow-sm
            ${isUser 
              ? 'bg-gradient-to-br from-secondary-500 to-secondary-600 text-white rounded-br-md' 
              : 'bg-gradient-to-br from-primary-50 to-primary-100 text-surface-900 rounded-bl-md border border-primary-200'
            }
          `}
        >
          <Text 
            variant="body" 
            size="sm" 
            color={isUser ? 'white' : 'default'}
            className="break-words leading-relaxed"
          >
            {renderMessageWithCorrections(message.text)}
          </Text>
        </div>
        
        <div className={`mt-1 px-2 ${isUser ? 'text-right' : 'text-left'}`}>
          <Text variant="caption" size="xs" color="muted">
            {format(new Date(message.timestamp), 'HH:mm')}
          </Text>
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;