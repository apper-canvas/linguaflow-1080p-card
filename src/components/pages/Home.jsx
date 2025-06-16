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
  const [currentStep, setCurrentStep] = useState('mode'); // 'mode', 'topic', or 'chat'
  const [selectedLearningMode, setSelectedLearningMode] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [currentConversation, setCurrentConversation] = useState(null);
  const [newCorrection, setNewCorrection] = useState(null);
  const [sessionStats, setSessionStats] = useState(null);

useEffect(() => {
    // Reset to learning mode selection on component mount
    setCurrentStep('mode');
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
const handleModeSelection = (mode) => {
    setSelectedLearningMode(mode);
    setCurrentStep('topic');
  };

  const handleBackToModes = () => {
    setCurrentStep('mode');
    setSelectedLearningMode('');
    setSelectedTopic('');
    setSelectedDifficulty('');
    setCurrentConversation(null);
    setNewCorrection(null);
    setSessionStats(null);
  };

  const handleBackToTopics = () => {
    setCurrentStep('topic');
    setCurrentConversation(null);
    setNewCorrection(null);
    setSessionStats(null);
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

  const LearningModeSelector = () => {
    const learningModes = [
      {
        id: 'conversation',
        title: 'Conversation Practice',
        description: 'Chat with AI to improve speaking and grammar in real-time',
        icon: 'MessageCircle',
        color: 'from-blue-500 to-purple-500'
      },
      {
        id: 'grammar',
        title: 'Grammar Exercises',
        description: 'Targeted practice for specific grammar rules and structures',
        icon: 'BookOpen',
        color: 'from-green-500 to-teal-500'
      },
      {
        id: 'vocabulary',
        title: 'Vocabulary Builder',
        description: 'Learn new words with spaced repetition and context',
        icon: 'Brain',
        color: 'from-orange-500 to-red-500'
      },
      {
        id: 'reading',
        title: 'Reading Comprehension',
        description: 'Practice reading skills with articles and stories',
        icon: 'FileText',
        color: 'from-purple-500 to-pink-500'
      },
      {
        id: 'pronunciation',
        title: 'Pronunciation Practice',
        description: 'Improve your accent with speech recognition feedback',
        icon: 'Mic',
        color: 'from-indigo-500 to-blue-500'
      }
    ];

    return (
      <motion.div
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="max-w-5xl mx-auto"
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
              Choose Your Learning Path
            </Text>
            <Text variant="body" size="lg" color="muted" className="max-w-2xl mx-auto">
              Select the type of language practice that fits your goals. Each mode offers unique ways to improve your skills.
            </Text>
          </motion.div>
        </div>

        {/* Learning Mode Grid */}
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {learningModes.map((mode, index) => (
            <motion.div
              key={mode.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleModeSelection(mode.id)}
              className="bg-white rounded-xl shadow-sm border border-surface-200 p-6 cursor-pointer hover:shadow-md transition-all duration-200 group"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${mode.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                <ApperIcon name={mode.icon} className="w-6 h-6 text-white" />
              </div>
              
              <Text variant="heading" size="lg" weight="semibold" className="mb-2">
                {mode.title}
              </Text>
              
              <Text variant="body" size="sm" color="muted" className="mb-4">
                {mode.description}
              </Text>

              {mode.id === 'conversation' && (
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <Text variant="body" size="xs" color="success">
                    Available now
                  </Text>
                </div>
              )}

              {mode.id !== 'conversation' && (
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <Text variant="body" size="xs" color="warning">
                    Coming soon
                  </Text>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    );
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

{currentStep !== 'mode' && (
              <div className="flex items-center space-x-4">
                {currentStep === 'chat' && sessionStats && (
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
                
                {currentStep === 'topic' && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleBackToModes}
                    className="flex items-center space-x-2 px-4 py-2 bg-surface-500 text-white rounded-lg hover:bg-surface-600 transition-colors"
                  >
                    <ApperIcon name="ArrowLeft" className="w-4 h-4" />
                    <span className="hidden sm:inline">Back to Modes</span>
                  </motion.button>
                )}

                {currentStep === 'chat' && (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleBackToTopics}
                      className="flex items-center space-x-2 px-4 py-2 bg-surface-500 text-white rounded-lg hover:bg-surface-600 transition-colors"
                    >
                      <ApperIcon name="ArrowLeft" className="w-4 h-4" />
                      <span className="hidden sm:inline">Back to Topics</span>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNewTopic}
                      className="flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                    >
                      <ApperIcon name="RotateCcw" className="w-4 h-4" />
                      <span className="hidden sm:inline">New Topic</span>
                    </motion.button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentStep === 'mode' ? (
          <LearningModeSelector />
        ) : currentStep === 'topic' ? (
          <motion.div
            key="topic-selection"
            variants={pageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="max-w-4xl mx-auto"
          >
            {/* Topic Selection */}
            <TopicSelector
              learningMode={selectedLearningMode}
              selectedTopic={selectedTopic}
              selectedDifficulty={selectedDifficulty}
              onTopicChange={setSelectedTopic}
              onDifficultyChange={setSelectedDifficulty}
              onStartConversation={handleStartConversation}
            />
          </motion.div>
) : selectedLearningMode === 'conversation' ? (
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
        ) : (
          <motion.div
            key="placeholder-interface"
            variants={pageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="max-w-4xl mx-auto text-center"
          >
            <div className="bg-white rounded-xl shadow-sm border border-surface-200 p-12">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl mx-auto flex items-center justify-center mb-6">
                <ApperIcon name="Construction" className="w-8 h-8 text-white" />
              </div>
              
              <Text variant="heading" size="2xl" weight="bold" className="mb-4">
                Coming Soon!
              </Text>
              
              <Text variant="body" size="lg" color="muted" className="mb-6">
                We're working hard to bring you this learning mode. Stay tuned for updates!
              </Text>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBackToModes}
                className="flex items-center space-x-2 px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors mx-auto"
              >
                <ApperIcon name="ArrowLeft" className="w-4 h-4" />
                <span>Choose Different Mode</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Home;