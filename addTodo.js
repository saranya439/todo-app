const Todo = require("./models/todo");

const title = process.argv[2];
const dueDate = process.argv[3];

if (!title || !dueDate) {
  console.log("Usage: node addTodo.js <title> <dueDate>");
  process.exit(1);
}

Todo.addTask(title, dueDate)
  .then((todo) => {
    console.log("Todo added successfully:");
    console.log(Todo.displayableString(todo));
  })
  .catch((error) => {
    console.error("Error:", error.message);
  });
