import React, { ChangeEvent, useCallback } from "react";
import { Checkbox, IconButton } from "@mui/material";
import { EditableSpan } from "./EditableSpan";
import { Delete } from "@mui/icons-material";
import { TaskStatuses } from "./api/todolists-api";

type TaskPropsType = {
  removeTask: (id: string, todolistId: string) => void;
  changeTaskTitle: (val: string, taskId: string, listId: string) => void;
  changeTaskStatus: (id: string, todolistId: string, status: any) => void;
  task: any;
  todolistId: string;
};
export const Task = React.memo((props: TaskPropsType) => {
  const onClickHandler = () =>
    props.removeTask(props.task.id, props.todolistId);
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let newIsDoneValue = e.currentTarget.checked;
    props.changeTaskStatus(
      props.task.id,
      props.todolistId,
      newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New
    );
  };
  // props.changeTaskStatus(props.task.id, props.todolistId);
  const editTask = useCallback(
    (val: string) =>
      props.changeTaskTitle(val, props.task.id, props.todolistId),
    [props.task.id, props.todolistId, props.changeTaskTitle]
  );
  return (
    <li key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
      <Checkbox
        checked={props.task.status === TaskStatuses.Completed}
        onChange={onChangeHandler}
      />

      {/*<input*/}
      {/*  type="checkbox"*/}
      {/*  checked={props.task.isDone || false}*/}
      {/*  onChange={onChangeHandler}*/}
      {/*/>*/}
      <EditableSpan value={props.task.title} onChange={editTask} />
      <IconButton
        onClick={onClickHandler}
        //TODO disabled={props.task.entityStatus === 'loading'}
      >
        <Delete />
      </IconButton>
    </li>
  );
});
