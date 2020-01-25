const express = require('express');
const multer = require('multer');
const config = require('../../config');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();

const upload = multer({
  dest: `public/${config.filesRoutes}/`
})

router.get('/', async (req, res) => {
  try {
    const filterMessage = req.query.user || null;
    const messageList = await controller.getMessages(filterMessage);
    response.success(req, res, messageList, 200);
  } catch (e) {
    response.error(req, res, 'Unexpected error', 500, e);
  }
})

router.post('/', upload.single('file'), async (req, res) => {
  try {
    const fullMessage = await controller.addMessage(
      req.body.chat,
      req.body.user,
      req.body.message,
      req.file
    )
    response.success(req, res, fullMessage, 201);
  } catch (e) {
    response.error(req, res, 'Información Inválida', 400, 'Error en el controlador');
  }
})

router.patch('/:id', async (req, res) => {
  try {
    const data = await controller.updateMessage(req.params.id, req.body.message);
    response.success(req, res, data, 200);
  } catch (e) {
    response.error(req, res, 'Error Interno', 500, e)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await controller.deleteMessage(req.params.id)
    response.success(req, res, `Usuario ${req.params.id} eliminado`, 200)
  } catch (e) {
    response.error(req, res, 'Error Interno', 500, e);
  }
})

module.exports = router;