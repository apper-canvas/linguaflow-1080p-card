import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Text from "@/components/atoms/Text";
import ApperIcon from "@/components/ApperIcon";
import React from "react";

const getModeTitle = (mode) => {
  const titles = {
    conversation: 'Practice with your AI Language Coach',
    grammar: 'Master Grammar Rules',
    vocabulary: 'Build Your Vocabulary',
    reading: 'Improve Reading Skills',
    pronunciation: 'Perfect Your Pronunciation'
  };
  return titles[mode] || 'Choose Your Learning Topic';
};

const getModeDescription = (mode) => {
  const descriptions = {
    conversation: 'Choose a topic and difficulty level to start a conversation. I\'ll help you improve your grammar with real-time corrections and explanations.',
    grammar: 'Select focused grammar topics to practice specific rules and structures.',
    vocabulary: 'Pick themes to learn new words with context and usage examples.',
    reading: 'Choose reading materials that match your interests and skill level.',
    pronunciation: 'Select conversation topics to practice speaking with feedback.'
  };
  return descriptions[mode] || 'Select your preferred topic and difficulty level.';
};

const getFilteredTopics = (mode, allTopics) => {
  // For conversation mode, return all topics
  if (mode === 'conversation') {
    return allTopics;
  }
  
  // For other modes, return relevant topics
  const modeTopics = {
    grammar: ['business', 'education', 'daily-life'],
    vocabulary: ['hobbies', 'travel', 'food', 'technology'],
    reading: ['travel', 'technology', 'education', 'culture'],
    pronunciation: ['hobbies', 'travel', 'food', 'daily-life']
  };
  
  return allTopics.filter(topic => 
    modeTopics[mode]?.includes(topic.id) || mode === 'conversation'
  );
};

const TopicSelector = ({
  learningMode = 'conversation',
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
    {
      id: 'beginner',
      label: 'Beginner',
      description: 'Simple vocabulary and basic sentence structures'
    },
    {
      id: 'intermediate',
      label: 'Intermediate',
      description: 'More complex sentences and varied vocabulary'
    },
    {
      id: 'advanced',
      label: 'Advanced',
      description: 'Professional and academic level discussions'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const filteredTopics = getFilteredTopics(learningMode, topics);
  
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-2xl mx-auto flex items-center justify-center mb-4">
            <ApperIcon name="Target" className="w-10 h-10 text-white" />
          </div>
          <Text variant="display" size="3xl" weight="bold" className="mb-4">
            {getModeTitle(learningMode)}
          </Text>
          <Text variant="body" size="lg" color="muted" className="max-w-2xl mx-auto">
            {getModeDescription(learningMode)}
          </Text>
        </motion.div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Topics Grid */}
        <motion.div variants={itemVariants} className="mb-8">
          <Text variant="heading" size="lg" weight="semibold" className="mb-4">
            Choose a conversation topic
          </Text>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredTopics.map((topic) => (
              <motion.button
                key={topic.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onTopicChange(topic.id)}
                className={`
                  p-4 rounded-xl border-2 transition-all duration-200 text-left
                  ${selectedTopic === topic.id
                    ? 'border-primary-500 bg-primary-50 shadow-md'
                    : 'border-surface-200 bg-white hover:border-primary-300 hover:bg-primary-25'
                  }
                `}
              >
                <div className={`
                  w-10 h-10 rounded-lg flex items-center justify-center mb-3
                  ${selectedTopic === topic.id
                    ? 'bg-primary-500 text-white'
                    : 'bg-surface-100 text-surface-600'
                  }
                `}>
                  <ApperIcon name={topic.icon} className="w-5 h-5" />
                </div>
                <Text 
                  variant="body" 
                  size="sm" 
                  weight="semibold"
                  color={selectedTopic === topic.id ? 'primary' : 'default'}
                  className="mb-1"
                >
                  {topic.label}
                </Text>
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