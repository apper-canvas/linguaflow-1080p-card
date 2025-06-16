import { useState } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Input = ({
  label,
  type = 'text',
  placeholder = '',
  value = '',
  onChange,
  error = '',
  disabled = false,
  icon,
  className = '',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const hasValue = value && value.toString().length > 0;
  const shouldFloatLabel = isFocused || hasValue;

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          className={`
            w-full px-4 py-3 border-2 rounded-lg transition-all duration-200
            ${error 
              ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
              : 'border-surface-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200'
            }
            ${disabled ? 'bg-surface-100 cursor-not-allowed' : 'bg-white'}
            ${icon ? 'pl-12' : ''}
            placeholder-transparent
          `}
          placeholder={placeholder}
          {...props}
        />
        
        {icon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <ApperIcon name={icon} className="w-5 h-5 text-surface-400" />
          </div>
        )}

        {label && (
          <motion.label
            initial={false}
            animate={{
              top: shouldFloatLabel ? '0.5rem' : '50%',
              fontSize: shouldFloatLabel ? '0.75rem' : '1rem',
              color: error ? '#ef4444' : isFocused ? '#6366f1' : '#64748b'
            }}
            transition={{ duration: 0.2 }}
            className={`
              absolute left-4 transform -translate-y-1/2 px-1 bg-white pointer-events-none
              ${icon ? 'left-12' : 'left-4'}
            `}
          >
            {label}
          </motion.label>
        )}
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-red-500 flex items-center"
        >
          <ApperIcon name="AlertCircle" className="w-4 h-4 mr-1" />
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default Input;