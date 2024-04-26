import axios from "axios";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
  headers: {
    "API-KEY": "a9e7edde-9af1-46f9-bd6b-bdceb88a71cb",
  },
});

export const todolistsAPI = {
  addTodolist: (title: string) => instance.post(`todo-lists/`, { title }),
  removeTodolist: (todolistId: string) =>
    instance.delete(`todo-lists/${todolistId}`),

  // addTodolistTasks: (title: string) =>
  //   instance.post<ResponseType>(`todo-lists/`, { title }),
  updateTodolist: (todolistId: string, title: string) =>
    instance.put<ResponseType>(`todo-lists/${todolistId}`, { title }),
  getTodolists: () => instance.get(`todo-lists/`),
  //TODO: getTodolists: () => instance.get<ResponseType>(`todo-lists/`),
  createTodolist: (title: string) =>
    instance.post<ResponseType<{ item: TodolistType }>>(`todo-lists/`, {
      title,
    }),
  deleteTodolist: (todolistId: string) =>
    instance.delete<ResponseType>(`todo-lists/${todolistId}`),
  deleteTask: (taskId: string, todolistId: string) =>
    instance.delete(`/todo-lists/${todolistId}/tasks/${taskId}`),
  addTask: (title: string, todolistId: string) =>
    instance
      .post(`/todo-lists/${todolistId}/tasks/`, { title })
      .then((res) => res),
  updateTask: (todolistId: string, taskId: string, task: any) =>
    instance
      .put(`/todo-lists/${todolistId}/tasks/${taskId}`, task)
      .then((res) => res.data.data.item),
  getTasks(todolistId: string) {
    return instance.get(`todo-lists/${todolistId}/tasks`);
  },
};

export const authAPI = {
  loggin(data: LogginModelType) {
    return instance.post("/auth/login", data);
  },
  me() {
    return instance.get("/auth/me");
  },
  logout() {
    return instance.delete("/auth/login");
  },
};
// type TodolistType = {
//   id: string;
//   addedDate: string;
//   order: number;
//   title: string;
// };
// type ResponseType<D = {}> = {
//   resultCode: number;
//   messages: string[];
//   fieldsErrors: FieldErrorType[];
//   data: D;
// };
//
// type FieldErrorType = {
//   error: string;
//   field: string;
// };

// types
export type TodolistType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};
export type ResponseType<D = {}> = {
  resultCode: number;
  messages: Array<string>;
  fieldsErrors: Array<string>;
  data: D;
};

export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}

export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4,
}

export type TaskType = {
  description: string;
  title: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};
export type UpdateTaskModelType = {
  title: string;
  description: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
};
// type GetTasksResponse = {
//   error: string | null;
//   totalCount: number;
//   items: TaskType[];
// };
export type LogginModelType = {
  email: string;
  password: string;
  rememberMe?: boolean;
  captcha?: boolean;
};
