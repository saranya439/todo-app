class TodoList {
  constructor() {
    this.todos = [];
    this.nextId = 1;
  }

  createTodo(title, dueDate) {
    const todo = {
      id: this.nextId++,
      title,
      completed: false,
      dueDate: new Date(dueDate),
    };

    this.todos.push(todo);
    return todo;
  }

  completeTodo(id) {
    const todo = this.todos.find((item) => item.id === id);

    if (!todo) {
      throw new Error("Todo not found");
    }

    todo.completed = true;
    return todo;
  }

  getOverdueTodos(today = new Date()) {
    const startOfToday = new Date(today);
    startOfToday.setHours(0, 0, 0, 0);

    return this.todos.filter(
      (todo) => !todo.completed && todo.dueDate < startOfToday,
    );
  }

  getDueTodayTodos(today = new Date()) {
    const startOfToday = new Date(today);
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date(startOfToday);
    endOfToday.setDate(endOfToday.getDate() + 1);

    return this.todos.filter(
      (todo) =>
        !todo.completed &&
        todo.dueDate >= startOfToday &&
        todo.dueDate < endOfToday,
    );
  }

  getDueLaterTodos(today = new Date()) {
    const endOfToday = new Date(today);
    endOfToday.setHours(0, 0, 0, 0);
    endOfToday.setDate(endOfToday.getDate() + 1);

    return this.todos.filter(
      (todo) => !todo.completed && todo.dueDate >= endOfToday,
    );
  }

  toDisplayableList(todos = this.todos) {
    return todos.map((todo) => ({
      id: todo.id,
      title: todo.title,
      completed: todo.completed,
      dueDate: todo.dueDate.toISOString().split("T")[0],
    }));
  }
}

module.exports = TodoList;

