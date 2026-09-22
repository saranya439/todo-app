const Todo = require("./models/todo");

Todo.showList()
  .then((todos) => {
    if (todos.length === 0) {
      console.log("No todos found.");
      return;
    }

    console.log("My Todo-list");

    todos.forEach((todo) => {
      console.log(Todo.displayableString(todo));
    });
  })
  .catch((error) => {
    console.error("Error:", error.message);
  });
