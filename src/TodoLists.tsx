import {
  addTodolistsThunk,
  changeTodolistFilterAC,
  changeTodolistTitleTC,
  removeTodolistsThunk,
  TodolistDomainType,
} from "./state/todolists-reducer";
import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { AppRootStateType, useAppDispatch } from "./state/store";

import {
  addTaskTC,
  removeTaskTC,
  updateTaskStatusTC,
} from "./state/tasks-reducer";
import { FilterValueTypes, TasksStateType } from "./App";
import { AddItemForm } from "./AddItemForm";
import { TodoList } from "./TodoList";

export function TodoLists() {
  const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(
    (state) => state.todolists
  );

  const tasks = useSelector<AppRootStateType, TasksStateType>(
    (state) => state.tasks
  );

  const dispatch = useAppDispatch();

  const changeFilter = useCallback(
    (value: FilterValueTypes, todolistId: string) =>
      dispatch(changeTodolistFilterAC(todolistId, value)),
    [dispatch]
  );

  const addTask = useCallback(
    (title: string, todolistId: string) =>
      dispatch(addTaskTC(title, todolistId)),
    [dispatch]
  );

  const removeTask = useCallback(
    // (id: string, todolistId: string) => dispatch(removeTaskAC(id, todolistId)),
    (id: string, todolistId: string) => dispatch(removeTaskTC(id, todolistId)),
    [dispatch]
  );

  const changeTaskStatus = useCallback(
    (id: string, todolistId: string, status: any) =>
      // dispatch(changeTaskStatusAC(id, todolistId)),
      dispatch(updateTaskStatusTC(id, todolistId, { status })),
    [dispatch]
  );

  const removeToDoList = useCallback(
    (id: string) => dispatch(removeTodolistsThunk(id)),
    [dispatch]
  );

  const addTodoList = useCallback(
    (title: string) => dispatch(addTodolistsThunk(title)),
    [dispatch]
  );

  const editTask = useCallback(
    (title: string, taskId: string, todolistId: string) =>
      dispatch(updateTaskStatusTC(taskId, todolistId, { title })),
    [dispatch]
  );

  const editTodoListHeader = useCallback(
    (title: string, listId: string) =>
      dispatch(changeTodolistTitleTC(listId, title)),
    [dispatch]
  );

  return (
    <>
      <AddItemForm addItem={addTodoList} />
      <div className="listsContainer">
        {todolists &&
          todolists.map((todolist) => {
            let tasksForTodolist = tasks[todolist.id];
            // if (todolist.filter === "completed")
            //   tasksForTodolist = tasks[todolist.id].filter((t) => t.isDone);
            // if (todolist.filter === "active")
            //   tasksForTodolist = tasks[todolist.id].filter((t) => !t.isDone);

            return (
              <TodoList
                key={todolist.id}
                id={todolist.id}
                title={todolist.title}
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                removeToDoList={removeToDoList}
                entityStatus={todolist.entityStatus}
                filter={todolist.filter}
                editTask={editTask}
                editTodoListHeader={editTodoListHeader}
              />
            );
          })}
      </div>
    </>
  );
}
