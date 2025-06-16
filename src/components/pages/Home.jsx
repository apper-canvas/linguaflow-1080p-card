import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import Text from '@/components/atoms/Text';
import TopicSelector from '@/components/molecules/TopicSelector';
import ChatInterface from '@/components/organisms/ChatInterface';
import CorrectionsPanel from '@/components/organisms/CorrectionsPanel';
import StatsPanel from '@/components/organisms/StatsPanel';
import ApperIcon from '@/components/ApperIcon';
import { conversationService } from '@/services';

const Home = () => {
  const [currentStep, setCurrentStep] = useState('topic'); // 'topic' or 'chat'
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [currentConversation, setCurrentConversation] = useState(null);
  const [newCorrection, setNewCorrection] = useState(null);
  const [sessionStats, setSessionStats] = useState(null);

  useEffect(() => {
    // Reset to topic selection on component mount
    setCurrentStep('topic');
  }, []);

  const handleStartConversation = async () => {
    try {
      const conversation = await conversationService.create({
        topic: selectedTopic,
        difficulty: selectedDifficulty
      });
      
      setCurrentConversation(conversation);
      setCurrentStep('chat');
      toast.success(`Started conversation about ${selectedTopic}!`);
    } catch (err) {
      toast.error('Failed to start conversation');
      console.error('Error starting conversation:', err);
    }
  };

  const handleNewTopic = () => {
    setCurrentStep('topic');
    setCurrentConversation(null);
    setSelectedTopic('');
    setSelectedDifficulty('');
    setNewCorrection(null);
    setSessionStats(null);
  };

  const handleNewCorrection = (correction) => {
    setNewCorrection(correction);
  };

  const handleStatsUpdate = (stats) => {
    setSessionStats(stats);
  };

  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-surface-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                <ApperIcon name="MessageCircle" className="w-6 h-6 text-white" />
              </div>
              <div>
                <Text variant="heading" size="xl" weight="bold" color="primary">
                  LinguaFlow
                </Text>
                <Text variant="body" size="xs" color="muted">
                  AI Language Coach
                </Text>
              </div>
            </div>

            {currentStep === 'chat' && (
              <div className="flex items-center space-x-4">
                {sessionStats && (
                  <div className="hidden md:flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <ApperIcon name="MessageCircle" className="w-4 h-4 text-primary-500" />
                      <Text variant="body" size="sm" color="muted">
                        {sessionStats.messagesSent} messages
                      </Text>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ApperIcon name="TrendingUp" className="w-4 h-4 text-green-500" />
                      <Text variant="body" size="sm" color="muted">
                        {sessionStats.improvementRate}% improvement
                      </Text>
                    </div>
                  </div>
                )}
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNewTopic}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                >
                  <ApperIcon name="RotateCcw" className="w-4 h-4" />
                  <span className="hidden sm:inline">New Topic</span>
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentStep === 'topic' ? (
          <motion.div
            key="topic-selection"
            variants={pageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="max-w-4xl mx-auto"
          >
            {/* Hero Section */}
            <div className="text-center mb-12">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-6"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-2xl mx-auto flex items-center justify-center mb-4">
                  <ApperIcon name="Sparkles" className="w-10 h-10 text-white" />
                </div>
                <Text variant="display" size="3xl" weight="bold" className="mb-4">
                  Practice with your AI Language Coach
                </Text>
                <Text variant="body" size="lg" color="muted" className="max-w-2xl mx-auto">
                  Choose a topic and difficulty level to start a conversation. I'll help you improve your grammar with real-time corrections and explanations.
                </Text>
              </motion.div>
            </div>

            {/* Topic Selection */}
            <TopicSelector
              selectedTopic={selectedTopic}
              selectedDifficulty={selectedDifficulty}
              onTopicChange={setSelectedTopic}
              onDifficultyChange={setSelectedDifficulty}
              onStartConversation={handleStartConversation}
            />
          </motion.div>
        ) : (
          <motion.div
            key="chat-interface"
            variants={pageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="h-[calc(100vh-8rem)]"
          >
            {/* Chat Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
              {/* Main Chat Area */}
              <div className="lg:col-span-2 h-full">
                <div className="bg-white rounded-xl shadow-sm border border-surface-200 h-full flex flex-col">
                  <div className="p-4 border-b border-surface-200 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-t-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <Text variant="heading" size="lg" weight="semibold">
                          {selectedTopic}
                        </Text>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <Text variant="body" size="sm" color="muted">
                            {selectedDifficulty} level • AI Coach active
                          </Text>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                          <ApperIcon name="Bot" className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 min-h-0">
                    <ChatInterface
                      conversationId={currentConversation?.Id}
                      onNewCorrection={handleNewCorrection}
                    />
                  </div>
                </div>
              </div>

              {/* Right Panels */}
              <div className="lg:col-span-2 space-y-6 h-full overflow-y-auto">
                {/* Corrections Panel */}
                <CorrectionsPanel
                  conversationId={currentConversation?.Id}
                  newCorrection={newCorrection}
                />

                {/* Stats Panel */}
                <StatsPanel
                  conversationId={currentConversation?.Id}
                  onStatsUpdate={handleStatsUpdate}
                />
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Home;