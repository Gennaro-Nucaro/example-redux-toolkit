import React from "react";
import Button from "@mui/material/Button";
import { Counter } from "./redux/features/counter/Counter";
import TodoList from "./redux/features/syncTodoList/TodoComponent";
import AsyncTodoList from "./redux/features/asyncTodolist/TodoComponent";
import Pokedex from "./redux/features/rtkQuery/Conponent";

function App() {
  return (
    <div>
      <Counter />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <TodoList />
        <AsyncTodoList />
      </div>
      <Pokedex />
    </div>
  );
}

export default App;
