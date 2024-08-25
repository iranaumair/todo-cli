// todo.js
const fs = require("fs");
const filePath = "todos.json";

const args = process.argv.slice(2);
const command = args[0];
const task = args[1];

if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, JSON.stringify([]));
}

const todos = JSON.parse(fs.readFileSync(filePath));

switch (command) {
  case "add":
    todos.push(task);
    console.log(`Added task: ${task}`);
    break;
  case "list":
    console.log("To-Do List:");
    todos.forEach((todo, index) => {
      console.log(`${index + 1}. ${todo}`);
    });
    break;
  case "delete":
    const index = parseInt(task) - 1;
    if (index >= 0 && index < todos.length) {
      const removed = todos.splice(index, 1);
      console.log(`Removed task: ${removed}`);
    } else {
      console.log("Invalid task number");
    }
    break;
  default:
    console.log("Unknown command");
}

fs.writeFileSync(filePath, JSON.stringify(todos));
