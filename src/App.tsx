import React, { useCallback, useEffect } from "react";
import "./App.css";
import { TaskType, TodoList } from "./TodoList";
import { AddItemForm } from "./AddItemForm";
import { ButtonAppBar } from "./ButtonAppBar";
import {
  addTodolistsThunk,
  changeTodolistFilterAC,
  changeTodolistTitleTC,
  fetchTodolistsThunk,
  removeTodolistsThunk,
  TodolistDomainType,
} from "./state/todolists-reducer";
import {
  addTaskTC,
  removeTaskTC,
  updateTaskStatusTC,
} from "./state/tasks-reducer";
import {
  // useDispatch,
  useSelector,
} from "react-redux";
import { AppRootStateType, useAppDispatch } from "./state/store";
import { LinearProgress } from "@mui/material";
import { RequestStatusType, setAppErrorAC } from "./state/app-reducer";
import { ErrorSnackbar } from "./ErrorSnackbar";

export type FilterValueTypes = "all" | "active" | "completed";
export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValueTypes;
};
export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function App() {
  useEffect(() => {
    // @ts-ignore
    dispatch(fetchTodolistsThunk);
  }, []);

  const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(
    (state) => state.todolists
  );

  const tasks = useSelector<AppRootStateType, TasksStateType>(
    (state) => state.tasks
  );
  const status = useSelector<AppRootStateType, RequestStatusType>(
    (state) => state.app.status
  );
  const error = useSelector<AppRootStateType, string | null>(
    (state) => state.app.error
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

  const closeSnackbar = useCallback(
    () => dispatch(setAppErrorAC(null)),
    [dispatch]
  );

  return (
    <div className="App">
      <ButtonAppBar />
      {status === "loading" && <LinearProgress />}
      <AddItemForm addItem={addTodoList} />

      <div className="listsContainer">
        {todolists &&
          todolists.map((todolist) => {
            let tasksForTodolist = tasks[todolist.id];
            //
            // if (todolist.filter === "completed") tasksForTodolist = tasks[todolist.id].filter(t => t.isDone)
            // if (todolist.filter === "active") tasksForTodolist = tasks[todolist.id].filter(t => !t.isDone)

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
      <ErrorSnackbar error={error} handleClose={closeSnackbar} />
    </div>
  );
}

export default App;
