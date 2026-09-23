const express = require("express");
const path = require("path");
const Todo = require("./models/todo");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (request, response) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const [overdue, dueToday, dueLater] = await Promise.all([
      Todo.overdue(today),
      Todo.dueToday(today),
      Todo.dueLater(today),
    ]);

    response.render("index", {
      overdue,
      dueToday,
      dueLater,
    });
  } catch (error) {
    response.status(500).send(error.message);
  }
});

// GET /todos - Get all todos
app.get("/todos", async (request, response) => {
  try {
    const todos = await Todo.findAll();
    response.json(todos);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

// DELETE /todos/:id - Delete a todo by id
app.delete("/todos/:id", async (request, response) => {
  try {
    const deletedCount = await Todo.destroy({
      where: {
        id: request.params.id,
      },
    });

    response.json(deletedCount > 0);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

module.exports = app;
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
