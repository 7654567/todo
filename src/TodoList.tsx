import React, { useCallback } from "react";
import { FilterValueTypes } from "./App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import Button from "@mui/material/Button";
import { Delete } from "@mui/icons-material";
import { IconButton, Paper } from "@mui/material";
import { Task } from "./Task";

type TodoListPropsTypes = {
  id: string;
  title: string;
  tasks: TaskType[];
  changeFilter: (id: FilterValueTypes, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  removeTask: (id: string, todolistId: string) => void;
  editTask: (val: string, taskId: string, listId: string) => void;
  changeTaskStatus: (id: string, todolistId: string) => void;
  removeToDoList: (id: string) => void;
  editTodoListHeader: (val: string, listId: string) => void;
  filter: FilterValueTypes;
};
export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
  todoListId?: string;
};
export const TodoList = (props: TodoListPropsTypes) => {
  console.log("Todolist called");

  const addTask = useCallback(
    (title: string) => props.addTask(title, props.id),
    [props.addTask, props.id]
  );

  const onRemoveToDoList = () => props.removeToDoList(props.id);
  //TODO onClickHandler
  // const onClickHandler = (item: TaskType) => props.removeTask(item.id)
  const onAllClickHandler = useCallback(
    () => props.changeFilter("all", props.id),
    [props.id, props.changeFilter]
  );
  const onActiveClickHandler = useCallback(
    () => props.changeFilter("active", props.id),
    [props.id, props.changeFilter]
  );
  const onCompletedClickHandler = useCallback(
    () => props.changeFilter("completed", props.id),
    [props.id, props.changeFilter]
  );
  const editTodoListHeader = (val: string) =>
    props.editTodoListHeader(val, props.id);
  let tasksForTodolist = props.tasks;

  if (props.filter === "completed")
    tasksForTodolist = props.tasks.filter((t) => t.isDone);
  if (props.filter === "active")
    tasksForTodolist = props.tasks.filter((t) => !t.isDone);
  /*TODO onKeyPress deprecated*/
  return (
    <Paper style={{ padding: "10px" }} elevation={12}>
      {/*<div className="todoList">*/}
      <h3>
        <EditableSpan value={props.title} onChange={editTodoListHeader} />
        {/*<button onClick={onRemoveToDoList}>X</button>*/}
        <IconButton onClick={onRemoveToDoList}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} />
      <ul>
        {tasksForTodolist.map((task) => (
          <Task
            removeTask={props.removeTask}
            changeTaskTitle={props.editTask}
            changeTaskStatus={props.changeTaskStatus}
            task={task}
            todolistId={props.id}
            key={task.id}
          />
        ))}
      </ul>
      <div>
        <Button
          style={{
            maxHeight: "30px",
            minWidth: "30px",
            minHeight: "30px",
            marginRight: "15px",
          }}
          onClick={onAllClickHandler}
          variant={props.filter === "all" ? "outlined" : "contained"}
        >
          All
        </Button>
        <Button
          style={{
            maxHeight: "30px",
            minWidth: "30px",
            minHeight: "30px",
            marginRight: "15px",
          }}
          onClick={onActiveClickHandler}
          variant={props.filter === "active" ? "outlined" : "contained"}
        >
          Active
        </Button>
        <Button
          style={{
            maxHeight: "30px",
            minWidth: "30px",
            minHeight: "30px",
            marginRight: "15px",
          }}
          onClick={onCompletedClickHandler}
          variant={props.filter === "completed" ? "outlined" : "contained"}
        >
          Completad
        </Button>
        {/*<button onClick={onAllClickHandler}*/}
        {/*		className={props.filter === 'all' ? 'active-filter' : ''}>All*/}
        {/*</button>*/}
        {/*<button onClick={onActiveClickHandler}*/}
        {/*		className={props.filter === 'active' ? 'active-filter' : ''}>Completad*/}
        {/*</button>*/}
        {/*<button onClick={onCompletedClickHandler}*/}
        {/*		className={props.filter === 'completed' ? 'active-filter' : ''}>Completad*/}
        {/*</button>*/}
      </div>
      {/*</div>*/}
    </Paper>
  );
};
