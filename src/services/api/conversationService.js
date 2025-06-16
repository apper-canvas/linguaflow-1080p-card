import conversationData from '../mockData/conversation.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let conversations = [...conversationData];

const conversationService = {
  async getAll() {
    await delay(300);
    return [...conversations];
  },

  async getById(id) {
    await delay(200);
    const conversation = conversations.find(c => c.Id === parseInt(id, 10));
    return conversation ? {...conversation} : null;
  },

  async create(conversationData) {
    await delay(400);
    const maxId = conversations.length > 0 ? Math.max(...conversations.map(c => c.Id)) : 0;
    const newConversation = {
      Id: maxId + 1,
      ...conversationData,
      startTime: new Date().toISOString(),
      stats: {
        messagesSent: 0,
        correctionsMade: 0,
        correctionsAccepted: 0
      }
    };
    conversations.push(newConversation);
    return {...newConversation};
  },

  async update(id, updateData) {
    await delay(300);
    const index = conversations.findIndex(c => c.Id === parseInt(id, 10));
    if (index === -1) return null;
    
    const updatedConversation = {
      ...conversations[index],
      ...updateData,
      Id: conversations[index].Id // Prevent Id modification
    };
    conversations[index] = updatedConversation;
    return {...updatedConversation};
  },

  async delete(id) {
    await delay(250);
    const index = conversations.findIndex(c => c.Id === parseInt(id, 10));
    if (index === -1) return false;
    
    conversations.splice(index, 1);
    return true;
  }
};

export default conversationService;