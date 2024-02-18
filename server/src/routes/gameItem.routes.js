
const express = require('express');
const router = express.Router();

const gameItemController = require('../controllers/gameItem.controller');

router.get('/', gameItemController.getAllGameItems);

router.get('/:id', gameItemController.getGameItemById);

router.post('/', gameItemController.createGameItem);

router.put('/:id', gameItemController.updateGameItem);

router.delete('/:id', gameItemController.deleteGameItem);

module.exports = router;
// Path: server/src/routes/gameItem.routes.js