const store = require('./store');

const addChat = (users) => {
    if (!users) {
      Promise.reject('Invalid user list');
    }
    const chat = {
      users
    };
  store.add(chat);
}

const listChats = (userId) => {
  return store.list(userId);
}

module.exports = {
  addChat,
  listChats
}