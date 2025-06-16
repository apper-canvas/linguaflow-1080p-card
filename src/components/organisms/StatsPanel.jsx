import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Text from '@/components/atoms/Text';
import Badge from '@/components/atoms/Badge';
import ApperIcon from '@/components/ApperIcon';
import { conversationService, messageService, correctionService } from '@/services';

const StatsPanel = ({ 
  conversationId, 
  onStatsUpdate,
  className = '' 
}) => {
  const [stats, setStats] = useState({
    messagesSent: 0,
    correctionsMade: 0,
    correctionsAccepted: 0,
    improvementRate: 0
  });

  useEffect(() => {
    loadStats();
  }, [conversationId]);

  const loadStats = async () => {
    try {
      if (conversationId) {
        const conversation = await conversationService.getById(conversationId);
        if (conversation?.stats) {
          const improvementRate = conversation.stats.correctionsMade > 0 
            ? Math.round((conversation.stats.correctionsAccepted / conversation.stats.correctionsMade) * 100)
            : 0;
          
          setStats({
            ...conversation.stats,
            improvementRate
          });
          
          onStatsUpdate?.({
            ...conversation.stats,
            improvementRate
          });
        }
      }
    } catch (err) {
      console.error('Failed to load stats:', err);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.2 }
    }
  };

  const statItems = [
    {
      id: 'messages',
      label: 'Messages Sent',
      value: stats.messagesSent,
      icon: 'MessageCircle',
      color: 'primary',
      bgColor: 'bg-primary-100',
      textColor: 'text-primary-600'
    },
    {
      id: 'corrections',
      label: 'Corrections Made',
      value: stats.correctionsMade,
      icon: 'Edit3',
      color: 'accent',
      bgColor: 'bg-accent-100',
      textColor: 'text-accent-600'
    },
    {
      id: 'accepted',
      label: 'Corrections Accepted',
      value: stats.correctionsAccepted,
      icon: 'CheckCircle',
      color: 'success',
      bgColor: 'bg-green-100',
      textColor: 'text-green-600'
    },
    {
      id: 'improvement',
      label: 'Improvement Rate',
      value: `${stats.improvementRate}%`,
      icon: 'TrendingUp',
      color: 'secondary',
      bgColor: 'bg-secondary-100',
      textColor: 'text-secondary-600'
    }
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`bg-white rounded-xl shadow-sm border border-surface-200 p-6 ${className}`}
    >
      <div className="flex items-center justify-between mb-6">
        <Text variant="heading" size="lg" weight="semibold">
          Session Stats
        </Text>
        <Badge variant="primary">Live</Badge>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statItems.map((item, index) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.1 }}
            className="text-center"
          >
            <div className={`w-12 h-12 ${item.bgColor} rounded-xl flex items-center justify-center mx-auto mb-3`}>
              <ApperIcon name={item.icon} className={`w-6 h-6 ${item.textColor}`} />
            </div>
            
            <Text variant="heading" size="2xl" weight="bold" color="default" className="mb-1">
              {item.value}
            </Text>
            
            <Text variant="body" size="sm" color="muted">
              {item.label}
            </Text>
          </motion.div>
        ))}
      </div>

      {stats.improvementRate > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg"
        >
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
              <ApperIcon name="Trophy" className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <Text variant="body" size="sm" weight="medium" color="success">
                Great progress!
              </Text>
              <Text variant="body" size="xs" color="muted">
                You're accepting {stats.improvementRate}% of corrections
              </Text>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default StatsPanel;