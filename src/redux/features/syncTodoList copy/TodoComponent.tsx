import React, { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";

import { useAppSelector, useAppDispatch } from "../../hooks";
import {
  getTodos,
  deleteToto,
  addTodo,
  Todo,
  changeStatusTodo,
} from "./todoSlice";

export default function TodoComponent() {
  const { todos } = useAppSelector(getTodos);
  const dispatch = useAppDispatch();
  const [todo, setTodo] = useState("");

  const addNewTodo = () => {
    dispatch(addTodo({ _id: nanoid(), name: todo, status: false }));
  };
  const addTodoWihtEnter = (e: any) => {
    if (e.key === "Enter") {
      dispatch(addTodo({ _id: nanoid(), name: todo, status: false }));
    }
  };

  const _deleteTodo = (ele: Todo) => {
    dispatch(deleteToto(ele));
  };

  const handleTodo = (ele: Todo) => {
    dispatch(changeStatusTodo(ele));
  };
  return (
    <div style={{ textAlign: "center", fontSize: 24 }}>
      <h3>Sincrona Todolist </h3>
      <input
        name="inputTodo"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        onKeyDown={addTodoWihtEnter}
        type="text"
        placeholder="Inserisci todo"
      />
      <button onClick={addNewTodo}>Add Todo</button>
      <ul>
        {todos.map((ele, i) => (
          <li key={`${ele}${i}`}>
            <input
              checked={ele.status}
              name={ele.name}
              onChange={() => handleTodo(ele)}
              type="checkbox"
            />
            {ele.name}
            <button onClick={() => _deleteTodo(ele)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
