const { Router } = require("express");

const {
  getTasks,
  saveTask,
  updateTask,
  deleteTask,
} = require("../controller/TaskController");

const router = Router();

router.get("/", getTasks);
router.post("/save", saveTask);
router.post("/update/:id", updateTask);
router.post("/delete/:id", deleteTask);
module.exports = router;
