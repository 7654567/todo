import { v1 } from "uuid";
import { Dispatch } from "redux";
import { todolistsAPI } from "../api/todolists-api";
import { RequestStatusType, setAppStatusAC } from "./app-reducer";
import { FilterValueTypes, TodolistType } from "../App";
import { fetchTasksTC } from "./tasks-reducer";

export type TodolistDomainType = TodolistType & {
  filter: FilterValueTypes;
  entityStatus: RequestStatusType;
};
export type RemoveTodolistActionType = {
  type: "REMOVE-TODOLIST";
  id: string;
};
export type AddTodolistActionType = {
  type: "ADD-TODOLIST";
  title: string;
  todolistId: string;
};
export type ChangeTodolistTitleActionType = {
  type: "CHANGE-TODOLIST-TITLE";
  id: string;
  title: string;
};
export type ChangeTodolistFilterActionType = {
  type: "CHANGE-TODOLIST-FILTER";
  id: string;
  filter: FilterValueTypes;
};
export type SetTodolistsActionType = {
  type: "SET-TODOLISTS";
  todolists: Array<TodolistType>;
};
export type ClearDataActionType = ReturnType<typeof clearDataAC>;

type ChangeTodolistEntityStatusType = ReturnType<
  typeof changeTodolistEntityStatusAC
>;

type ActionType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType
  | SetTodolistsActionType
  | ChangeTodolistEntityStatusType
  | ClearDataActionType;

const initialState: Array<TodolistDomainType> = [];
//     [
//   { id: todolistId1, title: "What to learn", filter: "all" },
//   { id: todolistId2, title: "What to buy", filter: "all" },
// ];
// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state
export const todolistsReducer = (
  state: Array<TodolistDomainType> = initialState,
  action: ActionType
): Array<TodolistDomainType> => {
  switch (action.type) {
    case "REMOVE-TODOLIST":
      return state.filter((todolist) => todolist.id !== action.id);

    case "ADD-TODOLIST":
      const newTodoListId = action.todolistId;
      const newTodoList: TodolistDomainType = {
        id: newTodoListId,
        title: action.title,
        filter: "all",
        entityStatus: "idle",
      };
      return [newTodoList, ...state];

    case "CHANGE-TODOLIST-TITLE":
      return state.map((t) => {
        if (t.id === action.id) t.title = action.title;
        return t;
      });

    case "CHANGE-TODOLIST-FILTER":
      return state.map((t) => {
        if (t.id === action.id) t.filter = action.filter;
        return t;
      });

    case "CHANGE-TODOLIST-ENTITY-STATUS":
      return state.map((t) => {
        if (t.id === action.id) t.entityStatus = action.status;
        return t;
      });

    case "SET-TODOLISTS": {
      const filter: FilterValueTypes = "all";
      // @ts-ignore
      return action.todolists.map((tl) => ({
        ...tl,
        filter,
        //TODO: filter: "all"
      }));
    }
    case "CLEAR-DATA": {
      return [];
    }

    default:
      return state;
  }
};

export const clearDataAC = () => ({ type: "CLEAR-DATA" } as const);
export const removeTodolistAC = (
  todolistId: string
): RemoveTodolistActionType => ({ type: "REMOVE-TODOLIST", id: todolistId });
export const addTodolistAC = (
  todolistTitle: string
): AddTodolistActionType => ({
  type: "ADD-TODOLIST",
  title: todolistTitle,
  todolistId: v1(),
});
export const changeTodolistTitleAC = (
  todolistId: string,
  todolistTitle: string
): ChangeTodolistTitleActionType => ({
  type: "CHANGE-TODOLIST-TITLE",
  id: todolistId,
  title: todolistTitle,
});
export const changeTodolistFilterAC = (
  todolistId: string,
  filter: FilterValueTypes
): ChangeTodolistFilterActionType => ({
  type: "CHANGE-TODOLIST-FILTER",
  id: todolistId,
  filter: filter,
});
export const setTodolistsAC = (
  todolists: Array<TodolistDomainType>
): SetTodolistsActionType => ({ type: "SET-TODOLISTS", todolists: todolists });
export const changeTodolistEntityStatusAC = (
  id: string,
  status: RequestStatusType
) =>
  ({
    type: "CHANGE-TODOLIST-ENTITY-STATUS",
    id,
    status,
  } as const);

export const fetchTodolistsThunk = (dispatch: Dispatch<any>) => {
  dispatch(setAppStatusAC("loading"));
  todolistsAPI
    .getTodolists()
    .then((res) => {
      dispatch(setTodolistsAC(res.data));
      dispatch(setAppStatusAC("succeeded"));
      return res.data;
    })
    .then((todolists) => {
      todolists.forEach((tl: any) => dispatch(fetchTasksTC(tl.id)));
    });
};
export const addTodolistsThunk = (title: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC("loading"));
  todolistsAPI.addTodolist(title).then((res) => {
    dispatch(addTodolistAC(res.data.data.item.title));
    dispatch(setAppStatusAC("succeeded"));
  });
};
export const removeTodolistsThunk =
  (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(changeTodolistEntityStatusAC(todolistId, "loading"));
    todolistsAPI.removeTodolist(todolistId).then(() => {
      dispatch(removeTodolistAC(todolistId));
    });
  };
export const changeTodolistTitleTC = (id: string, title: string) => {
  return (dispatch: Dispatch<ActionType>) => {
    todolistsAPI.updateTodolist(id, title).then(() => {
      dispatch(changeTodolistTitleAC(id, title));
    });
  };
};
