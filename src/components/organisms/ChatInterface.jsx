import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import MessageBubble from '@/components/molecules/MessageBubble';
import ChatInput from '@/components/molecules/ChatInput';
import TypingIndicator from '@/components/molecules/TypingIndicator';
import SkeletonLoader from '@/components/molecules/SkeletonLoader';
import ErrorState from '@/components/molecules/ErrorState';
import EmptyState from '@/components/molecules/EmptyState';
import { messageService, correctionService } from '@/services';

const ChatInterface = ({ 
  conversationId, 
  onNewCorrection,
  className = '' 
}) => {
  const [messages, setMessages] = useState([]);
  const [corrections, setCorrections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    loadMessages();
    loadCorrections();
  }, [conversationId]);

  const loadMessages = async () => {
    if (!conversationId) return;
    
    setLoading(true);
    setError(null);
    try {
      const result = await messageService.getByConversationId(conversationId);
      setMessages(result);
    } catch (err) {
      setError(err.message || 'Failed to load messages');
      toast.error('Failed to load conversation');
    } finally {
      setLoading(false);
    }
  };

  const loadCorrections = async () => {
    try {
      const result = await correctionService.getAll();
      setCorrections(result);
    } catch (err) {
      console.error('Failed to load corrections:', err);
    }
  };

  const generateAIResponse = (userMessage) => {
    const responses = [
      "That's really interesting! Could you tell me more about that?",
      "I understand what you mean. What's your favorite part about it?",
      "That sounds wonderful! How long have you been interested in this?",
      "Great point! What would you recommend to someone who's just starting?",
      "I can see why you enjoy that. What got you started with it?",
      "That's fascinating! Are there any challenges you face with it?",
      "I appreciate you sharing that. What do you think others might find surprising about it?",
      "Excellent! How do you usually spend your time doing this activity?"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const generateCorrections = async (messageText) => {
    // Simple grammar checking simulation
    const commonErrors = [
      {
        pattern: /\bi want to discuss about\b/gi,
        original: 'discuss about',
        corrected: 'discuss',
        rule: 'Transitive Verbs',
        explanation: "The verb 'discuss' is transitive and doesn't need the preposition 'about' when followed by a direct object."
      },
      {
        pattern: /\bin free time\b/gi,
        original: 'in free time',
        corrected: 'in my free time',
        rule: 'Possessive Pronouns',
        explanation: "When talking about your own free time, it's more natural to use the possessive pronoun 'my'."
      },
      {
        pattern: /\bi have went\b/gi,
        original: 'have went',
        corrected: 'have gone',
        rule: 'Past Participle',
        explanation: "The past participle of 'go' is 'gone', not 'went'."
      },
      {
        pattern: /\bmore better\b/gi,
        original: 'more better',
        corrected: 'better',
        rule: 'Comparative Adjectives',
        explanation: "'Better' is already a comparative form, so you don't need 'more'."
      }
    ];

    const foundCorrections = [];
    
    commonErrors.forEach(error => {
      if (error.pattern.test(messageText)) {
        foundCorrections.push({
          originalText: error.original,
          correctedText: error.corrected,
          explanation: error.explanation,
          rule: error.rule
        });
      }
    });

    return foundCorrections;
  };

  const handleSendMessage = async (messageText) => {
    try {
      // Add user message
      const userMessage = await messageService.create({
        text: messageText,
        sender: 'user',
        conversationId: conversationId
      });
      
      setMessages(prev => [...prev, userMessage]);

      // Generate corrections for user message
      const newCorrections = await generateCorrections(messageText);
      if (newCorrections.length > 0) {
        const correctionPromises = newCorrections.map(correction =>
          correctionService.create({
            messageId: userMessage.Id,
            ...correction
          })
        );
        
        const createdCorrections = await Promise.all(correctionPromises);
        setCorrections(prev => [...prev, ...createdCorrections]);
        
        // Notify parent component about new corrections
        createdCorrections.forEach(correction => {
          onNewCorrection?.(correction);
        });
      }

      // Show typing indicator
      setIsTyping(true);
      
      // Simulate AI thinking time
      await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
      
      // Add AI response
      const aiResponse = generateAIResponse(messageText);
      const aiMessage = await messageService.create({
        text: aiResponse,
        sender: 'ai',
        conversationId: conversationId
      });
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
      
    } catch (err) {
      setIsTyping(false);
      toast.error('Failed to send message');
      console.error('Error sending message:', err);
    }
  };

  const handleAcceptCorrection = async (correction) => {
    try {
      await correctionService.update(correction.Id, { accepted: true });
      setCorrections(prev => 
        prev.map(c => 
          c.Id === correction.Id ? { ...c, accepted: true } : c
        )
      );
      toast.success('Correction accepted! Great job learning.');
    } catch (err) {
      toast.error('Failed to accept correction');
    }
  };

  const handleRejectCorrection = async (correction) => {
    try {
      await correctionService.delete(correction.Id);
      setCorrections(prev => prev.filter(c => c.Id !== correction.Id));
      toast.info('Correction ignored');
    } catch (err) {
      toast.error('Failed to ignore correction');
    }
  };

  const getMessageCorrections = (messageId) => {
    return corrections.filter(c => c.messageId === messageId);
  };

  if (loading) {
    return (
      <div className={`flex flex-col h-full ${className}`}>
        <div className="flex-1 overflow-y-auto p-4">
          <SkeletonLoader count={4} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex flex-col h-full justify-center ${className}`}>
        <ErrorState 
          message={error}
          onRetry={loadMessages}
        />
      </div>
    );
  }

  return (
    <div className={`flex flex-col h-full bg-surface-50 ${className}`}>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence mode="popLayout">
          {messages.length === 0 ? (
            <EmptyState
              title="Ready to start chatting?"
              description="Send your first message to begin practicing with your AI language coach!"
              actionLabel={null}
              icon="MessageCircle"
            />
          ) : (
            messages.map((message) => (
              <MessageBubble
                key={message.Id}
                message={message}
                corrections={getMessageCorrections(message.Id)}
                onAcceptCorrection={handleAcceptCorrection}
                onRejectCorrection={handleRejectCorrection}
                onCorrectionClick={(correction) => {
                  // Handle correction click for future features
                }}
              />
            ))
          )}
          
          {isTyping && <TypingIndicator />}
        </AnimatePresence>
        
        <div ref={messagesEndRef} />
      </div>

      <ChatInput
        onSendMessage={handleSendMessage}
        disabled={isTyping}
        placeholder="Type your message to practice..."
      />
    </div>
  );
};

export default ChatInterface;