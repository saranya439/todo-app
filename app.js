const express = require("express");
const Todo = require("./models/todo");

const app = express();

app.use(express.json());

app.get("/", (request, response) => {
  response.send("Todo Express Server is running!");
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
