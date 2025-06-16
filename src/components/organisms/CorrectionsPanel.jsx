import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Text from '@/components/atoms/Text';
import Badge from '@/components/atoms/Badge';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import { correctionService } from '@/services';

const CorrectionsPanel = ({ 
  conversationId, 
  newCorrection, 
  className = '' 
}) => {
  const [corrections, setCorrections] = useState([]);
  const [expandedCorrection, setExpandedCorrection] = useState(null);

  useEffect(() => {
    loadCorrections();
  }, [conversationId]);

  useEffect(() => {
    if (newCorrection) {
      setCorrections(prev => {
        const exists = prev.find(c => c.Id === newCorrection.Id);
        if (exists) return prev;
        return [newCorrection, ...prev];
      });
    }
  }, [newCorrection]);

  const loadCorrections = async () => {
    try {
      const result = await correctionService.getAll();
      // Filter corrections for current conversation (if we had message linking)
      setCorrections(result.slice(0, 10)); // Show recent corrections
    } catch (err) {
      console.error('Failed to load corrections:', err);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.2 }
    },
    exit: { 
      opacity: 0, 
      x: 20,
      transition: { duration: 0.2 }
    }
  };

  const toggleExpanded = (correctionId) => {
    setExpandedCorrection(
      expandedCorrection === correctionId ? null : correctionId
    );
  };

  const getRuleIcon = (rule) => {
    const ruleIcons = {
      'Transitive Verbs': 'ArrowRight',
      'Possessive Pronouns': 'User',
      'Past Participle': 'Clock',
      'Comparative Adjectives': 'TrendingUp',
      'Articles': 'Type',
      'Prepositions': 'ArrowRightLeft'
    };
    return ruleIcons[rule] || 'BookOpen';
  };

  const getRuleColor = (rule) => {
    const ruleColors = {
      'Transitive Verbs': 'primary',
      'Possessive Pronouns': 'secondary',
      'Past Participle': 'accent',
      'Comparative Adjectives': 'success',
      'Articles': 'warning',
      'Prepositions': 'error'
    };
    return ruleColors[rule] || 'default';
  };

  if (corrections.length === 0) {
    return (
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`bg-white rounded-xl shadow-sm border border-surface-200 p-6 ${className}`}
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ApperIcon name="CheckCircle" className="w-8 h-8 text-accent-500" />
          </div>
          <Text variant="heading" size="lg" weight="semibold" className="mb-2">
            No corrections yet
          </Text>
          <Text variant="body" size="sm" color="muted">
            Keep chatting and I'll help you improve your grammar!
          </Text>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`bg-white rounded-xl shadow-sm border border-surface-200 ${className}`}
    >
      <div className="p-6 border-b border-surface-200">
        <div className="flex items-center justify-between">
          <Text variant="heading" size="lg" weight="semibold">
            Grammar Corrections
          </Text>
          <Badge variant="primary">{corrections.length}</Badge>
        </div>
        <Text variant="body" size="sm" color="muted" className="mt-1">
          Click on corrections to learn more
        </Text>
      </div>

      <div className="p-4 max-h-96 overflow-y-auto">
        <AnimatePresence>
          {corrections.map((correction) => (
            <motion.div
              key={correction.Id}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
              className="mb-4 last:mb-0"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleExpanded(correction.Id)}
                className="w-full text-left p-4 bg-surface-50 rounded-lg border border-surface-200 hover:bg-surface-100 transition-colors duration-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`p-1 rounded bg-${getRuleColor(correction.rule)}-100`}>
                        <ApperIcon 
                          name={getRuleIcon(correction.rule)} 
                          className={`w-4 h-4 text-${getRuleColor(correction.rule)}-600`} 
                        />
                      </div>
                      <Badge variant={getRuleColor(correction.rule)} size="small">
                        {correction.rule}
                      </Badge>
                      {correction.accepted && (
                        <Badge variant="success" size="small">
                          Accepted
                        </Badge>
                      )}
                    </div>
                    
                    <div className="space-y-1">
                      <Text variant="body" size="sm" weight="medium" color="error">
                        Original: "{correction.originalText}"
                      </Text>
                      <Text variant="body" size="sm" weight="medium" color="success">
                        Corrected: "{correction.correctedText}"
                      </Text>
                    </div>
                  </div>
                  
                  <motion.div
                    animate={{ rotate: expandedCorrection === correction.Id ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ApperIcon name="ChevronDown" className="w-5 h-5 text-surface-400" />
                  </motion.div>
                </div>
              </motion.button>

              <AnimatePresence>
                {expandedCorrection === correction.Id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-2 p-4 bg-white border border-surface-200 rounded-lg"
                  >
                    <Text variant="body" size="sm" color="muted" className="mb-3">
                      {correction.explanation}
                    </Text>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="accent"
                        size="small"
                        icon="Lightbulb"
                        className="flex-1"
                      >
                        Learn More
                      </Button>
                      <Button
                        variant="ghost"
                        size="small"
                        icon="BookOpen"
                        className="flex-1"
                      >
                        Examples
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default CorrectionsPanel;