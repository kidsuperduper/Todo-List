const express = require("express");
const todoController = require("../controllers/controller");
const router = express.Router();

router.get("/", todoController.getAllTodo);

router.get("/:id", todoController.getTodo);

router.post("/", todoController.addTodo);

router.delete("/:id", todoController.deleteTodo);

router.patch("/:id", todoController.updateTodo);

module.exports = router;
