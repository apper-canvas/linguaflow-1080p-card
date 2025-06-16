import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const ChatInput = ({ onSendMessage, disabled = false, placeholder = "Type your message..." }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="flex items-end gap-2 p-4 bg-white border-t border-surface-200"
    >
      <div className="flex-1 relative">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          className="
            w-full px-4 py-3 pr-12 border-2 border-surface-300 rounded-xl
            focus:border-primary-500 focus:ring-2 focus:ring-primary-200
            resize-none placeholder-surface-400 transition-all duration-200
            disabled:bg-surface-100 disabled:cursor-not-allowed
            min-h-[48px] max-h-32
          "
          style={{
            height: 'auto',
            minHeight: '48px'
          }}
          onInput={(e) => {
            e.target.style.height = 'auto';
            e.target.style.height = Math.min(e.target.scrollHeight, 128) + 'px';
          }}
        />
        
        {message.length > 0 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            type="button"
            onClick={() => setMessage('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-surface-400 hover:text-surface-600"
          >
            <ApperIcon name="X" className="w-4 h-4" />
          </motion.button>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        size="medium"
        icon="Send"
        disabled={!message.trim() || disabled}
        className="min-w-[48px] h-12"
      />
    </motion.form>
  );
};

export default ChatInput;