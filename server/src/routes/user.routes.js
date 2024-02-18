
const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.get("/", userController.getAllUsers);

router.get("/:id", userController.getUserById);

router.post("/", userController.createUser);

router.put("/:id", userController.updateUser);

router.delete("/:id", userController.deleteUser);

router.get("/:email", userController.getUserByEmail);

router.post("/balance", userController.getUserBalance);

module.exports = router;
// Path: server/src/routes/user.routes.js