const { DataTypes } = require("sequelize");
const { sequelize } = require("./index");

const Todo = sequelize.define(
  "Todo",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "todos",
  },
);

Todo.addTask = async function (title, dueDate) {
  return this.create({
    title,
    dueDate,
    completed: false,
  });
};

Todo.showList = async function () {
  return this.findAll({
    order: [["dueDate", "ASC"]],
  });
};

Todo.overdue = async function (today) {
  return this.findAll({
    where: {
      completed: false,
      dueDate: {
        [require("sequelize").Op.lt]: today,
      },
    },
    order: [["dueDate", "ASC"]],
  });
};

Todo.dueToday = async function (today) {
  return this.findAll({
    where: {
      completed: false,
      dueDate: today,
    },
    order: [["dueDate", "ASC"]],
  });
};

Todo.dueLater = async function (today) {
  return this.findAll({
    where: {
      completed: false,
      dueDate: {
        [require("sequelize").Op.gt]: today,
      },
    },
    order: [["dueDate", "ASC"]],
  });
};

Todo.markAsComplete = async function (id) {
  const todo = await this.findByPk(id);

  if (!todo) {
    throw new Error("Todo not found");
  }

  todo.completed = true;
  await todo.save();

  return todo;
};

Todo.displayableString = function (todo) {
  const checkbox = todo.completed ? "[x]" : "[]";
  return `${checkbox} ${todo.title} ${todo.dueDate}`;
};

module.exports = Todo;
