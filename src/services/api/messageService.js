import messageData from '../mockData/message.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let messages = [...messageData];

const messageService = {
  async getAll() {
    await delay(300);
    return [...messages];
  },

  async getById(id) {
    await delay(200);
    const message = messages.find(m => m.Id === parseInt(id, 10));
    return message ? {...message} : null;
  },

  async create(messageData) {
    await delay(400);
    const maxId = messages.length > 0 ? Math.max(...messages.map(m => m.Id)) : 0;
    const newMessage = {
      Id: maxId + 1,
      ...messageData,
      timestamp: new Date().toISOString()
    };
    messages.push(newMessage);
    return {...newMessage};
  },

  async update(id, updateData) {
    await delay(300);
    const index = messages.findIndex(m => m.Id === parseInt(id, 10));
    if (index === -1) return null;
    
    const updatedMessage = {
      ...messages[index],
      ...updateData,
      Id: messages[index].Id // Prevent Id modification
    };
    messages[index] = updatedMessage;
    return {...updatedMessage};
  },

  async delete(id) {
    await delay(250);
    const index = messages.findIndex(m => m.Id === parseInt(id, 10));
    if (index === -1) return false;
    
    messages.splice(index, 1);
    return true;
  },

  async getByConversationId(conversationId) {
    await delay(200);
    return messages
      .filter(m => m.conversationId === parseInt(conversationId, 10))
      .map(m => ({...m}));
  }
};

export default messageService;