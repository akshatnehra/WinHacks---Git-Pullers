
const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const bodyParser = require("body-parser");

router.get("/", userController.getAllUsers);

router.get("/:id", userController.getUserById);

router.post("/", userController.createUser);

router.put("/:id", userController.updateUser);

router.delete("/:id", userController.deleteUser);

router.get("/:email", userController.getUserByEmail);

router.post("/balance", userController.getUserBalance);

router.post("/add-funds", bodyParser.raw({type: 'application/json'}), userController.addFunds);

module.exports = router;
// Path: server/src/routes/user.routes.js