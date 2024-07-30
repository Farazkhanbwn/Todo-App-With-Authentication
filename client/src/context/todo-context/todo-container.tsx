"use client";
import React, {
  ComponentType,
  FC,
  PropsWithChildren,
  useLayoutEffect,
  useState,
} from "react";
import { todoStateDefaultValues } from "./todo-interface";
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
        todoList: [...prev.todoList, data],
        todoErrors: error,
      }));
    } catch (error) {
      console.log("error value is : ", error);
    } finally {
      callback();
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const { data, error } = await TodoService.deleteTodo(id);
      if (data) {
        setTodoState((prev) => ({
          ...prev,
          todoList: prev?.todoList?.filter((todo) => todo?.id !== id),
          todoErrors: error,
        }));
      }
    } catch {}
  };

  //   const updateTodo = async (
  //     id: string,
  //     name?: string,
  //     description?: string
  //   ) => {
  //     try {
  //       const { data, error } = await TodoService.updateTodo(
  //         id,
  //         name,
  //         description
  //       );
  //       if (data) {
  //         setTodoState((prev) => ({
  //           ...prev,
  //           todoList: [
  //             ...prev.todoList,
  //             {
  //               id,
  //               name,
  //               description,
  //             },
  //           ],
  //         }));
  //       }
  //     } catch (error) {
  //       console.log("error value is : ", error);
  //     }
  //   };

  return (
    <TodoProvider value={{ ...todoState, getAllTodos, addTodo, deleteTodo }}>
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
