const Model = require('./model')

const addMessage = (message) => {
  const myMessage = new Model(message);
  myMessage.save();
}

const getMessages = (filterUser) => {
  return new Promise(async (resolve, reject) => {
    let filter = {};
    if (filterUser) {
      filter = {
        user: filterUser
      }
    }
    try {
      await Model.find(filter)
        .populate('user')
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

const updateText = async (id, message) => {
  const foundMessage = await Model.findOne({
    _id: id
  });
  foundMessage.message = message;
  const newMessage = await foundMessage.save();
  return newMessage;
}

const removeMessage = (id) =>  {
  return Model.deleteOne({
    _id: id
  })
}

module.exports = {
  add: addMessage,
  list: getMessages,
  updateText: updateText,
  remove: removeMessage
}