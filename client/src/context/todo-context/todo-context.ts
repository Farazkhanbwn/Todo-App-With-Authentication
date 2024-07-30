import { createContext, useContext } from "react";
import { TodoInterface, todoStateDefaultValues } from "./todo-interface";

const TodoContext = createContext<TodoInterface>(todoStateDefaultValues);

export const TodoProvider = TodoContext.Provider;

export const useTodoContext = () => useContext(TodoContext);
