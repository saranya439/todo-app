const TodoList = require("../todo");

describe("Todo List", () => {
  let todoList;

  beforeEach(() => {
    todoList = new TodoList();
  });

  test("should create a new todo", () => {
    const todo = todoList.createTodo("Complete assignment", "2026-09-25");

    expect(todo.title).toBe("Complete assignment");
    expect(todo.completed).toBe(false);
    expect(todo.dueDate).toEqual(new Date("2026-09-25"));
  });

  test("should mark a todo as completed", () => {
    const todo = todoList.createTodo("Complete assignment", "2026-09-25");

    todoList.completeTodo(todo.id);

    expect(todo.completed).toBe(true);
  });

  test("should retrieve overdue todos", () => {
    const overdueTodo = todoList.createTodo(
      "Submit old assignment",
      "2026-09-20",
    );
    todoList.createTodo("Submit current assignment", "2026-09-25");

    const overdueTodos = todoList.getOverdueTodos(new Date("2026-09-22"));

    expect(overdueTodos).toHaveLength(1);
    expect(overdueTodos[0].id).toBe(overdueTodo.id);
  });

  test("should retrieve todos due today", () => {
    const todayTodo = todoList.createTodo("Study for exam", "2026-09-22");
    todoList.createTodo("Future task", "2026-09-25");

    const dueTodayTodos = todoList.getDueTodayTodos(new Date("2026-09-22"));

    expect(dueTodayTodos).toHaveLength(1);
    expect(dueTodayTodos[0].id).toBe(todayTodo.id);
  });

  test("should retrieve todos due later", () => {
    const laterTodo = todoList.createTodo(
      "Prepare project presentation",
      "2026-09-28",
    );
    todoList.createTodo("Today's task", "2026-09-22");

    const dueLaterTodos = todoList.getDueLaterTodos(new Date("2026-09-22"));

    expect(dueLaterTodos).toHaveLength(1);
    expect(dueLaterTodos[0].id).toBe(laterTodo.id);
  });
});
