import React, {useContext, useEffect, useState} from "react";
import {MdDelete} from "react-icons/md";
import {MdEdit} from "react-icons/md";
import {UseContext} from "../context/ContextSetup";
import "../styles/TodoAddEdit.css";

export default function TodoAddEdit() {
  const {isEdit, setIsEdit, toDos, setToDos} = useContext(UseContext);
  const [newToDo, setNewToDo] = useState("");
  const [editToDoId, setEditToDoId] = useState("");

  useEffect(() => {
    //console.log("todo to be updated: ", editToDoId);
  }, [editToDoId]);

  const markDoneOrPending = (selectedToDoId) => {
    const updatedToDos = toDos.map((todo) => {
      return todo.id === selectedToDoId
        ? {...todo, status: todo.status === "pending" ? "done" : "pending"}
        : todo;
    });

    setToDos(updatedToDos);
  };

  const saveToDo = () => {
    if (!isEdit) {
      const newlyAddedToDo = {
        id: new Date().toISOString(),
        text: newToDo,
        status: "pending",
        lastUpdated: new Date().toLocaleString(),
      };
      setToDos((prev) => [...prev, newlyAddedToDo]);
    } else {
      const updatedToDosList =
        editToDoId &&
        toDos.map((todo) => {
          return todo.id === editToDoId
            ? {...todo, text: newToDo, lastUpdated: new Date().toLocaleString()}
            : todo;
        });
      setToDos(updatedToDosList);
      setIsEdit(false);
      setNewToDo("");
      setEditToDoId("");
    }
  };

  const deleteToDo = (delToDoId) => {
    const updatedToDos = toDos.filter((todo) => todo.id !== delToDoId);
    setToDos(updatedToDos);
  };

  const editToDo = (editToDoId) => {
    setIsEdit(true);
    setEditToDoId(editToDoId);
    const toDoTobeEdited =
      editToDoId && toDos.filter((todo) => todo.id === editToDoId);
    setNewToDo(toDoTobeEdited[0].text);
  };

  return (
    <div className="mainContainer">
      <div className="box">
        <h2 className="text-2xl font-bold">ToDos</h2>
        <div className="addTodo">
          <input
            type="text"
            value={newToDo}
            onChange={(e) => setNewToDo(e.target.value)}
          />
          <button className="btn" onClick={saveToDo}>
            {isEdit ? "Save" : "Add"}
          </button>
        </div>
        <div className="toDosList">
          {toDos.map((todo) => (
            <div
              key={todo.id}
              className="eachToDoRow flex justify-between pl-0.5 pr-0.5"
            >
              <label className="flex items-center space-x-2 cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    className="check_box peer appearance-none w-5 h-5 border-2 border-gray-400 checked:bg-black checked:border-transparent rounded-xl p-2"
                    checked={todo.status === "done"}
                    onChange={() => markDoneOrPending(todo.id)}
                  />
                  <div className="checkIcon absolute w-4 h-4 flex items-center justify-center text-white text-sm peer-checked:visible peer-checked:opacity-100 opacity-0">
                    ✓
                  </div>
                </div>
                <span
                  className={`pb-0.5 ${
                    todo.status === "done"
                      ? "line-through text-gray-500 underline-offset-2"
                      : ""
                  }`}
                >
                  {todo.text}
                </span>
              </label>
              <span className="btn controls flex gap-5 justify-center items-center">
                <MdEdit
                  className="btn w-5 h-5"
                  onClick={() => editToDo(todo.id)}
                />
                <MdDelete
                  className="btn w-5 h-5"
                  onClick={() => deleteToDo(todo.id)}
                />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
