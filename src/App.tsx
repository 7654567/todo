import React, { useCallback, useEffect } from "react";
import "./App.css";
import { TaskType } from "./TodoList";
import { ButtonAppBar } from "./ButtonAppBar";
import { fetchTodolistsThunk } from "./state/todolists-reducer";

import { useSelector } from "react-redux";
import { AppRootStateType, useAppDispatch } from "./state/store";
import { LinearProgress } from "@mui/material";
import { meTC, RequestStatusType, setAppErrorAC } from "./state/app-reducer";
import { ErrorSnackbar } from "./ErrorSnackbar";
import { Navigate } from "react-router-dom";
import { logoutTC } from "./state/auth-reducer";
import { TodoLists } from "./TodoLists";
import CircularProgress from "@mui/material/CircularProgress";

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
    dispatch(meTC());
    // dispatch(initializeAppTC());
    // @ts-ignore
    dispatch(fetchTodolistsThunk);
  }, []);
  const isLoggedIn = useSelector<AppRootStateType, boolean>(
    (state) => state.auth.isLoggedIn
  );
  const isInitialized = useSelector<AppRootStateType, boolean>(
    (state) => state.app.isInitialized
  );

  const status = useSelector<AppRootStateType, RequestStatusType>(
    (state) => state.app.status
  );
  const error = useSelector<AppRootStateType, string | null>(
    (state) => state.app.error
  );
  const dispatch = useAppDispatch();
  const closeSnackbar = useCallback(
    () => dispatch(setAppErrorAC(null)),
    [dispatch]
  );
  const logout = useCallback(() => dispatch(logoutTC()), [dispatch]);
  if (!isLoggedIn) {
    return <Navigate to={"/login"} />;
  }

  if (!isInitialized) {
    return (
      <div
        style={{
          position: "fixed",
          top: "30%",
          textAlign: "center",
          width: "100%",
        }}
      >
        <CircularProgress />
      </div>
    );
  }
  return (
    <div className="App">
      <ButtonAppBar isLoggedIn={isLoggedIn} logout={logout} />
      {status === "loading" && <LinearProgress />}

      <TodoLists />
      <ErrorSnackbar error={error} handleClose={closeSnackbar} />
    </div>
  );
}

export default App;
