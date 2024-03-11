import React, { useEffect, useState } from "react";
import { todolistAPI } from "../api/todolists-api";

export default {
  title: "API",
};

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    // здесь мы будем делать запрос и ответ закидывать в стейт.
    // который в виде строки будем отображать в div-ке
    todolistAPI.getTodolists().then((res) => setState(res.data));
  }, []);
  return <div>{JSON.stringify(state)}</div>;
};

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    todolistAPI
      .createTodolist("2345234")
      .then((res) => setState(res.data.data.item));
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null);
  const [userId, setUserId] = useState<any>(null);
  //
  // useEffect(() => {
  //   todolistAPI.deleteTodolist(userId).then((res) => setState(res));
  // }, []);

  return (
    <>
      <input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.currentTarget.value)}
      />
      <button
        onClick={() =>
          todolistAPI.deleteTodolist(userId).then((res) => setState(res))
        }
      >
        delete
      </button>
      <div>{JSON.stringify(state)}</div>
    </>
  );
};

export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    todolistAPI
      .updateTodolist("1087b610-39e4-467a-843b-4e7e5d258c05", "new title")
      .then((res) => setState(res));
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};
