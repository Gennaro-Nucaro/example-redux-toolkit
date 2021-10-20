import React, { useState, useEffect } from "react";
import { nanoid } from "@reduxjs/toolkit";
import axios from "axios";

import { useAppSelector, useAppDispatch } from "../../hooks";
import {
  getAsyncTodolist,
  addAsyncTodo,
  getTodolist,
  deleteAsyncTodo,
  Todo,
} from "./todoSlice";

export default function TodoComponent() {
  const { todos, ajax } = useAppSelector(getTodolist);
  const dispatch = useAppDispatch();
  const [todo, setTodo] = useState("");
  const [todolist, setTodolist] = useState<Todo[]>([]);

  const addNewTodo = () => {
    dispatch(addAsyncTodo({ id: nanoid(), name: todo, status: false }));
  };
  const addNewTodoWithEnter = (e: any) => {
    if (e.key === "Enter") {
      dispatch(addAsyncTodo({ id: nanoid(), name: todo, status: false }));
    }
  };

  useEffect(() => {
    dispatch(getAsyncTodolist());
  }, []);

  useEffect(() => {
    setTodolist(todos);
  }, [todos]);

  const deleteTodo = (id: number | string) => {
    dispatch(deleteAsyncTodo(id));
  };

  return (
    <div style={{ textAlign: "center", fontSize: 24 }}>
      <h3>Asincrona Todolist </h3>
      <input
        name="inputTodo"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        onKeyDown={addNewTodoWithEnter}
        type="text"
        placeholder="Inserisci todo"
      />
      <button onClick={addNewTodo}>Add Todo</button>
      {ajax === "loading" ? (
        <h4>loading...</h4>
      ) : (
        <ul>
          {todolist.map((ele, i) => (
            <li key={`${ele}${i}`}>
              <input
                checked={ele.status}
                name={ele.name}
                // onChange={() => handleTodo(ele)}
                type="checkbox"
              />
              {ele.name}
              <button onClick={() => deleteTodo(ele.id)}>delete</button>
            </li>
          ))}
        </ul>
      )}
      {ajax === "failed" ? <h6>Error server</h6> : ""}
    </div>
  );
}
