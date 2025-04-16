import {createContext, useState} from "react";

export const UseContext = createContext();

export default function ContextProvider({children}) {
  const [isEdit, setIsEdit] = useState(false);
  const [toDos, setToDos] = useState([]);

  return (
    <UseContext.Provider value={{isEdit, setIsEdit, toDos, setToDos}}>
      {children}
    </UseContext.Provider>
  );
}
