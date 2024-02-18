// import models
const GameItem = require('../models/gameItem.model');

// add all CRUD operations for gameItem


async function getAllGameItems(req, res) {
    const gameItems = await GameItem.find();
    res.json(gameItems);
}

async function getGameItemById(req, res) {
    const gameItemId = req.params.id;
    const gameItem = await GameItem.findById(gameItemId);
    res.json(gameItem);
}

async function createGameItem(req, res) {
    const gameItem = await GameItem.create(req.body);
    res.json(gameItem);
}

async function updateGameItem(req, res) {
    const gameItemId = req.params.id;
    const updatedGameItem = await GameItem.findByIdAndUpdate(gameItemId, req.body, { new: true });
    res.json(updatedGameItem);

}

async function deleteGameItem(req, res) {
    const gameItemId = req.params.id;
    await GameItem.findByIdAndDelete(gameItemId);
    res.json({ message: "GameItem deleted successfully" });
}

module.exports = {
    getAllGameItems,
    getGameItemById,
    createGameItem,
    updateGameItem,
    deleteGameItem,
};

