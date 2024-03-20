import React, { useReducer } from "react";
import "./App.css";
import { TaskType, TodoList } from "./TodoList";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";
import { ButtonAppBar } from "./ButtonAppBar";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todolistsReducer,
} from "./state/todolists-reducer";
import {
  // addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksReducer,
} from "./state/tasks-reducer";

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
  let todolistID1 = v1();
  let todolistID2 = v1();

  let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
    { id: todolistID1, title: "What to learn", filter: "all" },
    { id: todolistID2, title: "What to buy", filter: "all" },
  ]);

  let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
    [todolistID1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
    ],
    [todolistID2]: [
      { id: v1(), title: "Rest API", isDone: true },
      { id: v1(), title: "GraphQL", isDone: false },
    ],
  });

  function changeFilter(value: FilterValueTypes, todolistId: string) {
    dispatchToTodolistsReducer(changeTodolistFilterAC(todolistId, value));
  }

  function addTask(title: string, todolistId: string) {
    // dispatchToTasksReducer(addTaskAC(title, todolistId))
  }

  function removeTask(id: string, todolistId: string) {
    dispatchToTasksReducer(removeTaskAC(id, todolistId));
  }

  function changeTaskStatus(id: string, todolistId: string) {
    dispatchToTasksReducer(changeTaskStatusAC(id, todolistId));
  }

  function removeToDoList(id: string) {
    const action = removeTodolistAC(id);
    dispatchToTodolistsReducer(action);
    dispatchToTasksReducer(action);
  }

  function addTodoList(title: string) {
    const action = addTodolistAC(title);
    dispatchToTodolistsReducer(action);
    dispatchToTasksReducer(action);
  }

  function editTask(val: string, taskId: string, listId: string) {
    dispatchToTasksReducer(changeTaskTitleAC(taskId, val, listId));
  }

  function editTodoListHeader(value: string, listId: string) {
    dispatchToTodolistsReducer(changeTodolistTitleAC(listId, value));
  }

  return (
    <div className="App">
      <ButtonAppBar />

      <AddItemForm addItem={addTodoList} />

      <div className="listsContainer">
        {todolists.map((todolist) => {
          let tasksForTodolist = tasks[todolist.id];

          if (todolist.filter === "completed")
            tasksForTodolist = tasks[todolist.id].filter((t) => t.isDone);
          if (todolist.filter === "active")
            tasksForTodolist = tasks[todolist.id].filter((t) => !t.isDone);

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
