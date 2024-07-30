import { useTodoContext } from "@/context/todo-context/todo-context";
import CustomButton from "@/shared/ui/custom-button/custom-button";
import CustomInput from "@/shared/ui/custom-input/custom-input";
import axios from "axios";
import React, { ChangeEvent, useState } from "react";

const AddTodoForm = () => {
  const { todoErrors, todoList, getAllTodos } = useTodoContext();
  const [loading, setloading] = useState<boolean>(false);
  const [formState, setFormState] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e?.target;

    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addTodo = async () => {
    try {
      const response = await axios.get("http://localhost:4000/todo", {
        withCredentials: true,
      });
      console.log("response from todo is:", response.data);
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error message:", error.message);
        console.error("Axios error response:", error.response);
      } else {
        console.error("Error adding todo:", error);
      }
      throw error;
    }
  };

  const addNewTodo = async () => {
    setloading(true);
    const { name, description } = formState;

    await getAllTodos();

    // await addTodo(name, description, () => {
    //   setloading(false);
    //   setFormState((prev) => ({
    //     ...prev,
    //     description: "",
    //     name: "",
    //   }));
    // });
  };

  return (
    <div className="max-w-lg mx-auto flex flex-col gap-4">
      <h2 className="text-center text-3xl mb-5 font-semibold">Add New Task</h2>

      <CustomInput
        name="name"
        type="text"
        value={formState.name}
        label="Name*"
        placeholder="Pls Write Name Here"
        onChange={handleChange}
      />

      <CustomInput
        name="description"
        type="text"
        label="Description*"
        value={formState.description}
        placeholder="Pls Write Descripiton"
        onChange={handleChange}
      />

      <CustomButton
        title="Add Todo"
        disabled={false}
        loading={loading}
        type="primary"
        classNames="mt-2"
        onClick={addTodo}
      />
    </div>
  );
};

export default AddTodoForm;
