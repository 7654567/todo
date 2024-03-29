import React, { useCallback, useEffect } from "react";
import "./App.css";
import { TaskType, TodoList } from "./TodoList";
// import {v1} from "uuid";
import { AddItemForm } from "./AddItemForm";
import { ButtonAppBar } from "./ButtonAppBar";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  fetchTodolistsThunk,
  removeTodolistAC,
} from "./state/todolists-reducer";
import {
  addTaskTC,
  changeTaskTitleAC,
  removeTaskTC,
  updateTaskStatusTC,
} from "./state/tasks-reducer";
import {
  // useDispatch,
  useSelector,
} from "react-redux";
import { AppRootStateType, useAppDispatch } from "./state/store";

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

  const todolists = useSelector<AppRootStateType, Array<TodolistType>>(
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
    (id: string, todolistId: string) =>
      // dispatch(changeTaskStatusAC(id, todolistId)),
      dispatch(updateTaskStatusTC(id, todolistId, 1)),
    [dispatch]
  );

  const removeToDoList = useCallback(
    (id: string) => dispatch(removeTodolistAC(id)),
    [dispatch]
  );

  const addTodoList = useCallback(
    (title: string) => dispatch(addTodolistAC(title)),
    [dispatch]
  );

  const editTask = useCallback(
    (val: string, taskId: string, listId: string) =>
      dispatch(changeTaskTitleAC(taskId, val, listId)),
    [dispatch]
  );

  const editTodoListHeader = useCallback(
    (value: string, listId: string) =>
      dispatch(changeTodolistTitleAC(listId, value)),
    [dispatch]
  );

  return (
    <div className="App">
      <ButtonAppBar />

      <AddItemForm addItem={addTodoList} />

      <div className="listsContainer">
        {todolists.map((todolist) => {
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
              filter={todolist.filter}
              editTask={editTask}
              editTodoListHeader={editTodoListHeader}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
