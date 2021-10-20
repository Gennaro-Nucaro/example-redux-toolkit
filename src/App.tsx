import React from "react";
import Button from "@mui/material/Button";
import { Counter } from "./redux/features/counter/Counter";
import TodoList from "./redux/features/syncTodoList/TodoComponent";
import Pokedex from "./redux/features/rtkQuery/Conponent";

function App() {
  return (
    <div>
      <Counter />
      <TodoList />
      <Pokedex />
    </div>
  );
}

export default App;
