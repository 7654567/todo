import {
  SetAppErrorActionType,
  setAppStatusAC,
  SetAppStatusActionType,
} from "./app-reducer";
import { Dispatch } from "redux";
import { authAPI } from "../api/todolists-api";
import {
  handleServerAppError,
  handleServerNetworkError,
} from "../utils/error-utils";

import { clearDataAC, ClearDataActionType } from "./todolists-reducer";

const initialState: InitialStateType = {
  isLoggedIn: false,
};

export type InitialStateType = {
  isLoggedIn: boolean;
};

export const authReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case "AUTH/SET-IS_LOGGED-IN":
      return { ...state, isLoggedIn: action.isLoggedIn };
    default:
      return state;
  }
};

export const setIsLoggedInAC = (isLoggedIn: boolean) =>
  ({ type: "AUTH/SET-IS_LOGGED-IN", isLoggedIn } as const);

export type SetIsLoggsedInACsActionType = ReturnType<typeof setIsLoggedInAC>;

type ActionsType =
  | SetIsLoggsedInACsActionType
  | SetAppStatusActionType
  | SetAppErrorActionType
  | ClearDataActionType;

export const logginTC = (data: any) => (dispatch: Dispatch<ActionsType>) => {
  dispatch(setAppStatusAC("loading"));
  authAPI
    .loggin(data)
    .then((res) => {
      alert(res.data.data.userId);
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC(true));
        dispatch(setAppStatusAC("succeeded"));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((error) => handleServerNetworkError(error, dispatch));
};

// export const initializeAppTC = () => (dispatch: Dispatch) => {
//   authAPI.me().then((res) => {
//     if (res.data.resultCode === 0) {
//       dispatch(setIsLoggedInAC(true));
//     } else {
//       dispatch(setIsLoggedInAC(false));
//     }
//   });
// };
// export const initializeAppTC = (): AppThunk => (dispatch) => {
//   authAPI.me().then((res) => {
//     if (res.data.resultCode === 0) {
//       dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
//     } else {
//     }
//
//     dispatch(appActions.setAppInitialized({ isInitialized: true }));
//   });
// };
export const logoutTC = () => (dispatch: Dispatch<ActionsType>) => {
  dispatch(setAppStatusAC("loading"));
  authAPI
    .logout()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC(false));
        dispatch(setAppStatusAC("succeeded"));
        dispatch(clearDataAC());
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};
