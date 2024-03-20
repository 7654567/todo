import React, { useCallback } from "react";
import { Checkbox, IconButton } from "@mui/material";
import { EditableSpan } from "./EditableSpan";
import { Delete } from "@mui/icons-material";
import { TaskType } from "./TodoList";

type TaskPropsType = {
  removeTask: (id: string, todolistId: string) => void;
  changeTaskTitle: (val: string, taskId: string, listId: string) => void;
  changeTaskStatus: (id: string, todolistId: string) => void;
  task: TaskType;
  todolistId: string;
};
export const Task = React.memo((props: TaskPropsType) => {
  const onClickHandler = () =>
    props.removeTask(props.task.id, props.todolistId);
  const onChangeHandler = () =>
    props.changeTaskStatus(props.task.id, props.todolistId);
  const editTask = useCallback(
    (val: string) =>
      props.changeTaskTitle(val, props.task.id, props.todolistId),
    [props.task.id, props.todolistId, props.changeTaskTitle]
  );
  return (
    <li key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
      <Checkbox
        checked={props.task.isDone || false}
        onChange={onChangeHandler}
      />

      {/*<input*/}
      {/*  type="checkbox"*/}
      {/*  checked={props.task.isDone || false}*/}
      {/*  onChange={onChangeHandler}*/}
      {/*/>*/}
      <EditableSpan value={props.task.title} onChange={editTask} />
      <IconButton onClick={onClickHandler}>
        <Delete />
      </IconButton>
    </li>
  );
});
