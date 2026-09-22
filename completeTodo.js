const Todo = require("./models/todo");

const id = process.argv[2];

if (!id) {
  console.log("Usage: node completeTodo.js <id>");
  process.exit(1);
}

Todo.markAsComplete(id)
  .then((todo) => {
    console.log("Todo completed successfully:");
    console.log(Todo.displayableString(todo));
  })
  .catch((error) => {
    console.error("Error:", error.message);
  });
