const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const data = await controller.addChat(req.body.users)
    response.success(req, res, data, 201);
  } catch (e) {
    response.error(req, res, 'Internal Error', 400, e);
  }
})

router.get('/:userId', async (req, res) => {
  try {
    const users = await controller.listChats(req.params.userId);
    response.success(req, res, users, 200);
  } catch (e) {
    response.error(req, res, 'Unexpected error', 500, e);
  }
})

module.exports = router;