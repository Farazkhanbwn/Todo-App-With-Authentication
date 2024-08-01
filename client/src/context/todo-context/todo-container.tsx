"use client";
import React, {
  ComponentType,
  FC,
  PropsWithChildren,
  useLayoutEffect,
  useState,
} from "react";
import { Todo, todoStateDefaultValues } from "./todo-interface";
import TodoService from "@/services/todo-service";
import { TodoProvider } from "./todo-context";

const TodoContainer: FC<PropsWithChildren> = ({ children }) => {
  const [todoState, setTodoState] = useState(todoStateDefaultValues);

  const getAllTodos = async () => {
    try {
      const { data, error } = await TodoService.getAllTodos();
      setTodoState((prev) => ({
        ...prev,
        todoList: data,
        todoErrors: error,
      }));
    } catch (error) {
      console.log("error is : ", error);
    }
  };

  useLayoutEffect(() => {
    getAllTodos();
  }, []);

  const addTodo = async (
    name: string,
    description: string,
    callback: () => void
  ) => {
    try {
      const { data, error } = await TodoService.addTodo(name, description);
      setTodoState((prev) => ({
        ...prev,
        todoList: [data, ...prev.todoList],
        todoErrors: error,
      }));
    } catch (error) {
      console.log("error value is : ", error);
    } finally {
      callback();
    }
  };

  const deleteTodo = async (id: string, callback: () => void) => {
    try {
      const { data, error } = await TodoService.deleteTodo(id);
      if (data) {
        setTodoState((prev) => ({
          ...prev,
          todoList: prev?.todoList?.filter((todo) => todo?._id !== id),
          todoErrors: error,
        }));
      }
    } catch (error) {
      console.log("error message ", error);
    } finally {
      callback();
    }
  };

  const updateTodo = async (
    id: string,
    updates: Partial<Todo>,
    callback: () => void
  ) => {
    try {
      const { data, error } = await TodoService.updateTodo(id, updates);
      if (data) {
        setTodoState((prev) => ({
          ...prev,
          todoList: prev.todoList.map((todo) =>
            todo._id === id ? { ...todo, ...updates } : todo
          ),
        }));
      }
    } catch (error) {
      console.log("error value is:", error);
    } finally {
      callback();
      setTodoState((prev) => ({
        ...prev,
        selectedTodo: null,
      }));
    }
  };

  const selectTodo = (id: string) => {
    const filterTodo = todoState?.todoList?.filter((todo) => todo?._id === id);
    setTodoState((prev) => ({
      ...prev,
      selectedTodo: filterTodo[0],
    }));
  };

  return (
    <TodoProvider
      value={{
        ...todoState,
        getAllTodos,
        addTodo,
        deleteTodo,
        updateTodo,
        selectTodo,
      }}
    >
      {children}
    </TodoProvider>
  );
};

export const withTodoContainer = <P extends object>(
  WrappedComponent: ComponentType<P>
): FC<P> => {
  const withTodoContainer: FC<P> = (props) => {
    return (
      <TodoContainer>
        <WrappedComponent {...props} />
      </TodoContainer>
    );
  };
  return withTodoContainer;
};
