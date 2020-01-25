const store = require('./store');
const socket = require('../../socket').socket;
const config = require('../../config');

const addMessage = (chat, user, message, file) => {
  return new Promise((resolve, reject) => {
    if(!user || !message) {
      console.error('[messageController] No hay usuario o mensaje');
      reject('Los datos son incorrectos');
    }

    let fileUrl = ''
    if (file) {
      fileUrl = `${config.host}:${config.port}${config.publicRoute}/${config.filesRoutes}/${file.filename}`;
    }

    const fullMessage = {
      chat,
      user,
      message,
      date: new Date(),
      file: fileUrl
    };
    store.add(fullMessage);

    socket.io.emit('message', fullMessage);

    resolve(fullMessage);
  });
}

const getMessages = (filterUser) => {
  return new Promise((resolve, reject) => {
    resolve(store.list(filterUser))
  });
}

const updateMessage = (id, message) => {
  return new Promise(async (resolve, reject) => {
    if(!id, !message) {
      reject('invalid data')
    }
    const result = store.updateText(id, message);
    resolve(result);
  });
}

const deleteMessage = (id) => {
  return new Promise(async (resolve, reject) => {
    if(!id) {
      reject('Id inválido');
    }
    try {
      await store.remove(id)
      resolve();
    } catch(e) {
      reject(e);
    }
  });
}

module.exports = {
  addMessage,
  getMessages,
  updateMessage,
  deleteMessage
}