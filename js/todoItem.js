"use strict";
/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */
/*global React */
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="./interfaces.d.ts"/>
const classNames = require("classnames");
const React = require("react");
const ReactDOM = require("react-dom");
const constants_1 = require("./constants");
class TodoItem extends React.Component {
    constructor(props) {
        super(props);
        console.log("You just created a new todo item: ", this.props.todo.title);
        this.state = { editText: this.props.todo.title };
    }
    handleSubmit(event) {
        var val = this.state.editText.trim();
        if (val) {
            this.props.onSave(val);
            this.setState({ editText: val });
        }
        else {
            this.props.onDestroy();
        }
    }
    handleEdit() {
        this.props.onEdit();
        this.setState({ editText: this.props.todo.title });
    }
    handleKeyDown(event) {
        if (event.keyCode === constants_1.ESCAPE_KEY) {
            this.setState({ editText: this.props.todo.title });
            this.props.onCancel(event);
        }
        else if (event.keyCode === constants_1.ENTER_KEY) {
            this.handleSubmit(event);
        }
    }
    handleChange(event) {
        var input = event.target;
        this.setState({ editText: input.value });
    }
    /**
     * This is a completely optional performance enhancement that you can
     * implement on any React component. If you were to delete this method
     * the app would still work correctly (and still be very performant!), we
     * just use it as an example of how little code it takes to get an order
     * of magnitude performance improvement.
     */
    shouldComponentUpdate(nextProps, nextState) {
        return (nextProps.todo !== this.props.todo ||
            nextProps.editing !== this.props.editing ||
            nextState.editText !== this.state.editText);
    }
    /**
     * Safely manipulate the DOM after updating the state when invoking
     * `this.props.onEdit()` in the `handleEdit` method above.
     * For more info refer to notes at https://facebook.github.io/react/docs/component-api.html#setstate
     * and https://facebook.github.io/react/docs/component-specs.html#updating-componentdidupdate
     */
    componentDidUpdate(prevProps) {
        if (!prevProps.editing && this.props.editing) {
            var node = ReactDOM.findDOMNode(this.refs["editField"]);
            node.focus();
            node.setSelectionRange(node.value.length, node.value.length);
        }
    }
    render() {
        return (React.createElement("li", { className: classNames({
                completed: this.props.todo.completed,
                editing: this.props.editing
            }) },
            React.createElement("div", { className: "view" },
                React.createElement("input", { className: "toggle", type: "checkbox", checked: this.props.todo.completed, onChange: this.props.onToggle }),
                React.createElement("label", { onDoubleClick: e => this.handleEdit() }, this.props.todo.title),
                React.createElement("button", { className: "destroy", onClick: this.props.onDestroy })),
            React.createElement("input", { ref: "editField", className: "edit", value: this.state.editText, onBlur: e => this.handleSubmit(e), onChange: e => this.handleChange(e), onKeyDown: e => this.handleKeyDown(e) })));
    }
}
exports.TodoItem = TodoItem;
