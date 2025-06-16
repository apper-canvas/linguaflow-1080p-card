import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import Text from '@/components/atoms/Text';
import ApperIcon from '@/components/ApperIcon';

const TopicSelector = ({ 
  selectedTopic, 
  selectedDifficulty, 
  onTopicChange, 
  onDifficultyChange,
  onStartConversation 
}) => {
  const topics = [
    { id: 'hobbies', label: 'Hobbies & Interests', icon: 'Heart' },
    { id: 'travel', label: 'Travel & Culture', icon: 'Plane' },
    { id: 'food', label: 'Food & Cooking', icon: 'ChefHat' },
    { id: 'business', label: 'Business & Work', icon: 'Briefcase' },
    { id: 'technology', label: 'Technology', icon: 'Smartphone' },
    { id: 'sports', label: 'Sports & Fitness', icon: 'Trophy' },
    { id: 'movies', label: 'Movies & Entertainment', icon: 'Film' },
    { id: 'education', label: 'Education & Learning', icon: 'BookOpen' }
  ];

  const difficulties = [
    { id: 'beginner', label: 'Beginner', description: 'Simple vocabulary and grammar' },
    { id: 'intermediate', label: 'Intermediate', description: 'More complex sentences and idioms' },
    { id: 'advanced', label: 'Advanced', description: 'Professional and academic language' }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Topic Selection */}
      <motion.div variants={itemVariants}>
        <Text variant="heading" size="lg" weight="semibold" className="mb-4">
          Choose a conversation topic
        </Text>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {topics.map((topic) => (
            <motion.button
              key={topic.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onTopicChange(topic.label)}
              className={`
                p-4 rounded-xl border-2 transition-all duration-200 text-left
                ${selectedTopic === topic.label
                  ? 'border-primary-500 bg-primary-50 shadow-md'
                  : 'border-surface-200 bg-white hover:border-primary-300 hover:bg-primary-25'
                }
              `}
            >
              <div className="flex items-center space-x-3">
                <div className={`
                  p-2 rounded-lg
                  ${selectedTopic === topic.label
                    ? 'bg-primary-500 text-white'
                    : 'bg-surface-100 text-surface-600'
                  }
                `}>
                  <ApperIcon name={topic.icon} className="w-5 h-5" />
                </div>
                <Text 
                  variant="body" 
                  size="sm" 
                  weight="medium"
                  color={selectedTopic === topic.label ? 'primary' : 'default'}
                >
                  {topic.label}
                </Text>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Difficulty Selection */}
      <motion.div variants={itemVariants}>
        <Text variant="heading" size="lg" weight="semibold" className="mb-4">
          Select difficulty level
        </Text>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {difficulties.map((difficulty) => (
            <motion.button
              key={difficulty.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onDifficultyChange(difficulty.id)}
              className={`
                p-4 rounded-xl border-2 transition-all duration-200 text-left
                ${selectedDifficulty === difficulty.id
                  ? 'border-secondary-500 bg-secondary-50 shadow-md'
                  : 'border-surface-200 bg-white hover:border-secondary-300 hover:bg-secondary-25'
                }
              `}
            >
              <div className="flex items-center justify-between mb-2">
                <Text 
                  variant="body" 
                  size="base" 
                  weight="semibold"
                  color={selectedDifficulty === difficulty.id ? 'secondary' : 'default'}
                >
                  {difficulty.label}
                </Text>
                <Badge variant={difficulty.id}>{difficulty.label}</Badge>
              </div>
              <Text variant="body" size="sm" color="muted">
                {difficulty.description}
              </Text>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Start Button */}
      <motion.div variants={itemVariants} className="pt-4">
        <Button
          variant="primary"
          size="large"
          icon="MessageCircle"
          onClick={onStartConversation}
          disabled={!selectedTopic || !selectedDifficulty}
          className="w-full md:w-auto"
        >
          Start Conversation
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default TopicSelector;