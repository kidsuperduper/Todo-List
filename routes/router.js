const express = require("express");
const controller = require("../controllers/controller");

const router = express.Router();

router.get("/", controller.getAllTodo);

router.get("/:id", controller.getTodo);

router.post("/", controller.addTodo);

router.delete("/:id", controller.deleteTodo);

router.patch("/:id", controller.updateTodo);

module.exports = router;
