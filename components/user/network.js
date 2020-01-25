const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const data = await controller.addUser(req.body.name);
    response.success(req, res, data, 201);
  } catch (e) {
    response.error(req, res, 'Internal Error', 500, e);
  }
})

router.get('/', async (req, res) => {
  try {
    const users = await controller.listUsers();
    response.success(req, res, users, 200);
  } catch (e) {
    response.error(req, res, 'Unexpected error', 500, e);
  }
})

module.exports = router;