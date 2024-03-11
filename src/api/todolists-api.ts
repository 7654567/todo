import axios from "axios";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
  headers: {
    // Не забываем заменить API-KEY на собственный
    "API-KEY": "a9e7edde-9af1-46f9-bd6b-bdceb88a71cb",
  },
});
type TodolistType = {
  id: string;
  addedDate: string;
  order: number;
  title: string;
};
type ResponseType<D = {}> = {
  resultCode: number;
  messages: string[];
  fieldsErrors: FieldErrorType[];
  data: D;
};

type FieldErrorType = {
  error: string;
  field: string;
};
export const todolistAPI = {
  updateTodolist: (todolistId: string, title: string) =>
    instance.put<ResponseType>(`todo-lists/${todolistId}`, { title }),
  getTodolists: () => instance.get<ResponseType>(`todo-lists/`),
  createTodolist: (title: string) =>
    instance.post<ResponseType<{ item: TodolistType }>>(`todo-lists/`, {
      title,
    }),
  deleteTodolist: (todolistId: string) =>
    instance.delete<ResponseType>(`todo-lists/${todolistId}`),
};
