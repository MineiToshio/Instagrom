const Model = require('./model')

const addChat = (chat) => {
  const myChat = new Model(chat);
  return myChat.save();
}

const listChats = (userId) => {
  return new Promise(async (resolve, reject) => {
    let filter = {};
    if (userId) {
      filter = {
        users: userId
      }
    }
    try {
      await Model.find(filter)
        .populate('users')
        .exec((error, populated) => {
          if (error) {
            reject(error);
          }
          resolve(populated);
        });
    } catch (e) {
      reject(e);
    }
  })
}

module.exports = {
  add: addChat,
  list: listChats
}