import { v1 } from "uuid";
import {
  AddTodolistActionType,
  RemoveTodolistActionType,
  SetTodolistsActionType,
} from "./todolists-reducer";
import { TaskStatuses, todolistsAPI } from "../api/todolists-api";
import { Dispatch } from "redux";
import { TaskType } from "../TodoList";
import { AppRootStateType } from "./store";
import { setAppStatusAC } from "./app-reducer";
import { TasksStateType } from "../App";
import {
  handleServerAppError,
  handleServerNetworkError,
} from "../utils/error-utils";
// import { TaskType } from "../TodoList";

const REMOVE_TASK = "REMOVE-TASK";
const ADD_TASK = "ADD-TASK";
const CHANGE_TASK_STATUS = "CHANGE-TASK-STATUS";
const CHANGE_TASK_TITLE = "CHANGE-TASK-TITLE";
// const ADD_TODOLIST = "ADD_TODOLIST"

// type ActionName = 'REMOVE-TODOLIST' | 'ADD-TODOLIST' | 'CHANGE-TODOLIST-TITLE' | 'CHANGE-TODOLIST-FILTER'

export type RemoveTaskActionType = {
  type: "REMOVE-TASK";
  taskId: string;
  todolistId: string;
};
export type AddTaskActionType = {
  type: "ADD-TASK";
  // title: string;
  // todolistId: string;
  task: TaskType;
};
export type ChangeTaskStatusActionType = {
  type: "CHANGE-TASK-STATUS";
  todolistId: string;
  taskId: string;
  model: any;
};

export type ChangeTaskTitleActionType = {
  type: "CHANGE-TASK-TITLE";
  title: string;
  todolistId: string;
  taskId: string;
};

export type SetTasksActionType = {
  type: "SET-TASK-TITLE";
  todolistId: string;
  taskId: string;
};

// export type TasksStateType = {
//   [key: string]: Array<TaskType>;
// };

type ActionType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTodolistsActionType
  | ReturnType<typeof setTasksAC>;

export const todolistId1 = v1();
export const todolistId2 = v1();
const initialState: TasksStateType = {};
//     = {
//   [todolistId1]: [
//     { id: v1(), title: "HTML&CSS", isDone: true },
//     { id: v1(), title: "JS", isDone: true },
//     { id: v1(), title: "ReactJS", isDone: false },
//   ],
//   [todolistId2]: [
//     { id: v1(), title: "Rest API", isDone: true },
//     { id: v1(), title: "GraphQL", isDone: false },
//   ],
// };

export const tasksReducer = (
  state: TasksStateType = initialState,
  action: ActionType
): TasksStateType => {
  switch (action.type) {
    case REMOVE_TASK:
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter(
          (task) => task.id !== action.taskId
        ),
      };
    case ADD_TASK:
      // return {
      //   ...state,
      //   [action.todolistId]: [
      //     { id: v1(), title: action.title, isDone: false },
      //     ...state[action.todolistId],
      //   ],
      // };
      const stateCopy = { ...state };
      // @ts-ignore
      const tasks = stateCopy[action.task.todoListId];
      const newTasks = [action.task, ...tasks];
      // @ts-ignore
      stateCopy[action.task.todoListId] = newTasks;
      return stateCopy;
    case CHANGE_TASK_STATUS:
      console.log(action.model);
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((task) =>
          task.id === action.taskId ? { ...task, ...action.model } : task
        ),
      };
    case CHANGE_TASK_TITLE:
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((task) =>
          task.id === action.taskId
            ? {
                ...task,
                title: action.title,
              }
            : task
        ),
      };
    case "ADD-TODOLIST":
      return {
        ...state,
        [action.todolistId]: [],
      };
    case "REMOVE-TODOLIST":
      let newState = { ...state };
      delete newState[action.id];

      return newState;

    case "SET-TODOLISTS": {
      const stateCopy = { ...state };
      action.todolists.forEach((tl) => {
        stateCopy[tl.id] = [];
      });
      return stateCopy;
    }
    case "SET-TASKS":
      return { ...state, [action.todolistId]: action.tasks };

    default:
      return state;
  }
};

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) =>
  ({ type: "SET-TASKS", tasks, todolistId } as const);
export const removeTaskAC = (
  taskId: string,
  todolistId: string
): RemoveTaskActionType => {
  return { type: REMOVE_TASK, taskId, todolistId };
};

export const addTaskAC = (task: TaskType): AddTaskActionType => {
  return { type: "ADD-TASK", task };
};
export const changeTaskAC = (
  taskId: string,
  todolistId: string,
  model: TaskStatuses
): ChangeTaskStatusActionType => {
  return { type: CHANGE_TASK_STATUS, todolistId, taskId, model };
};
export const changeTaskTitleAC = (
  taskId: string,
  title: string,
  todolistId: string
): ChangeTaskTitleActionType => {
  return {
    type: CHANGE_TASK_TITLE,
    title: title,
    todolistId: todolistId,
    taskId: taskId,
  };
};

export const fetchTasksTC =
  (todolistId: string) => (dispatch: Dispatch<ActionType>) => {
    todolistsAPI.getTasks(todolistId).then((res) => {
      const tasks = res.data.items;
      const action = setTasksAC(tasks, todolistId);
      dispatch(action);
    });
  };
export const removeTaskTC =
  (taskId: string, todolistId: string) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTask(taskId, todolistId).then(() => {
      const action = removeTaskAC(taskId, todolistId);
      dispatch(action);
    });
  };
// export const addTaskTC =
//   (title: string, todolistId: string) => (dispatch: Dispatch) => {
//     todolistsAPI.addTask(title, todolistId).then((task) => {
//       const action = addTaskAC(task);
//       dispatch(action);
//     });
//   };

export const addTaskTC =
  (title: string, todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"));
    todolistsAPI
      .addTask(title, todolistId)
      .then((res) => {
        if (res.data.resultCode === 0) {
          const task = res.data.data.item;
          dispatch(addTaskAC(task));
          dispatch(setAppStatusAC("succeeded"));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((error) => handleServerNetworkError(error, dispatch));
  };

export const updateTaskStatusTC = (
  taskId: string,
  todolistId: string,
  model: any
) => {
  return (dispatch: Dispatch, getState: () => AppRootStateType) => {
    // так как мы обязаны на сервер отправить все св-ва, которые сервер ожидает, а не только
    // те, которые мы хотим обновить, соответственно нам нужно в этом месте взять таску целиком  // чтобы у неё отобрать остальные св-ва
    console.log(taskId, todolistId, model);
    const allTasksFromState = getState().tasks;
    const tasksForCurrentTodolist = allTasksFromState[todolistId];
    const task = tasksForCurrentTodolist.find((t: TaskType) => {
      return t.id === taskId;
    });

    if (task) {
      todolistsAPI
        .updateTask(todolistId, taskId, {
          title: task.title,
          startDate: task.startDate,
          priority: task.priority,
          description: task.description,
          deadline: task.deadline,
          ...model,
        })
        .then((res) => {
          if (res.data.resultCode === 0) {
            dispatch(changeTaskAC(taskId, todolistId, model));
          } else {
            handleServerAppError(res.data, dispatch);
          }
        })
        .catch((error) => handleServerNetworkError(error, dispatch));
      // .then((res) => {
      //   const action = changeTaskAC(taskId, todolistId, model);
      //   dispatch(action);
      // });
    }
  };
};
