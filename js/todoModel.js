"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
class TodoModel {
    constructor(key) {
        this.key = key;
        this.todos = utils_1.Utils.store(key);
        this.onChanges = [];
    }
    subscribe(onChange) {
        this.onChanges.push(onChange);
    }
    inform() {
        utils_1.Utils.store(this.key, this.todos);
        this.onChanges.forEach(function (cb) { cb(); });
    }
    addTodo(title) {
        this.todos = this.todos.concat({
            id: utils_1.Utils.uuid(),
            title: title,
            completed: false
        });
        this.inform();
    }
    toggleAll(checked) {
        this.todos = this.todos.map((todo) => {
            return utils_1.Utils.extend({}, todo, { completed: checked });
        });
        this.inform();
    }
    toggle(todoToToggle) {
        this.todos = this.todos.map((todo) => {
            return todo !== todoToToggle ?
                todo :
                utils_1.Utils.extend({}, todo, { completed: !todo.completed });
        });
        this.inform();
    }
    destroy(todo) {
        this.todos = this.todos.filter(function (candidate) {
            return candidate !== todo;
        });
        this.inform();
    }
    save(todoToSave, text) {
        this.todos = this.todos.map(function (todo) {
            return todo !== todoToSave ? todo : utils_1.Utils.extend({}, todo, { title: text });
        });
        this.inform();
    }
    clearCompleted() {
        this.todos = this.todos.filter(function (todo) {
            return !todo.completed;
        });
        this.inform();
    }
}
exports.TodoModel = TodoModel;
