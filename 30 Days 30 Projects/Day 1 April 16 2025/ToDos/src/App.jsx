import {useState} from "react";
import ContextProvider from "./context/ContextSetup";
import "./App.css";
import TodoAddEdit from "./components/TodoAddEdit";

function App() {
  return (
    <>
      <ContextProvider>
        <TodoAddEdit />
      </ContextProvider>
    </>
  );
}

export default App;
