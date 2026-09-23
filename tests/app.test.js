const request = require("supertest");

jest.mock("../models/todo", () => ({
  destroy: jest.fn(),
  findAll: jest.fn(),
}));

const Todo = require("../models/todo");
const app = require("../app");

describe("DELETE /todos/:id", () => {
  test("should return true when a todo is successfully deleted", async () => {
    Todo.destroy.mockResolvedValue(1);

    const response = await request(app).delete("/todos/1");

    expect(response.status).toBe(200);
    expect(response.body).toBe(true);
    expect(Todo.destroy).toHaveBeenCalledWith({
      where: {
        id: "1",
      },
    });
  });

  test("should return false when the todo does not exist", async () => {
    Todo.destroy.mockResolvedValue(0);

    const response = await request(app).delete("/todos/999");

    expect(response.status).toBe(200);
    expect(response.body).toBe(false);
  });
});
