import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from './App';
// import AppWithReducer from "./AppWithReducer";

import { Provider } from "react-redux";
import { store } from "./state/store";
import { Login } from "./features/Login";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import { ErrorPage } from "./features/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Navigate to="/404" />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/404",
    element: <ErrorPage />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
  // 	<AppWithRedux/>
  // </React.StrictMode>

  <Provider store={store}>
    {/*<App />*/}
    <RouterProvider router={router} />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

// ReactDOM.render(
// 	<Provider store={store}>
// 		<AppWithRedux/>
// 	</Provider>, document.getElementById('root')
// )
