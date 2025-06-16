import correctionData from '../mockData/correction.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let corrections = [...correctionData];

const correctionService = {
  async getAll() {
    await delay(300);
    return [...corrections];
  },

  async getById(id) {
    await delay(200);
    const correction = corrections.find(c => c.Id === parseInt(id, 10));
    return correction ? {...correction} : null;
  },

  async create(correctionData) {
    await delay(400);
    const maxId = corrections.length > 0 ? Math.max(...corrections.map(c => c.Id)) : 0;
    const newCorrection = {
      Id: maxId + 1,
      ...correctionData,
      accepted: false
    };
    corrections.push(newCorrection);
    return {...newCorrection};
  },

  async update(id, updateData) {
    await delay(300);
    const index = corrections.findIndex(c => c.Id === parseInt(id, 10));
    if (index === -1) return null;
    
    const updatedCorrection = {
      ...corrections[index],
      ...updateData,
      Id: corrections[index].Id // Prevent Id modification
    };
    corrections[index] = updatedCorrection;
    return {...updatedCorrection};
  },

  async delete(id) {
    await delay(250);
    const index = corrections.findIndex(c => c.Id === parseInt(id, 10));
    if (index === -1) return false;
    
    corrections.splice(index, 1);
    return true;
  },

  async getByMessageId(messageId) {
    await delay(200);
    return corrections
      .filter(c => c.messageId === parseInt(messageId, 10))
      .map(c => ({...c}));
  }
};

export default correctionService;