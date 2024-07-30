import { useTodoContext } from "@/context/todo-context/todo-context";
import CustomButton from "@/shared/ui/custom-button/custom-button";
import CustomInput from "@/shared/ui/custom-input/custom-input";
import React, { ChangeEvent, useState } from "react";

const AddTodoForm = () => {
  const { addTodo, todoErrors } = useTodoContext();
  const [loading, setloading] = useState<boolean>(false);
  const [formState, setFormState] = useState({
    name: "",
    description: "",
  });

  console.log("add form rerendered");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e?.target;

    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addNewTodo = async () => {
    setloading(true);
    const { name, description } = formState;
    await addTodo(name, description, () => {
      setloading(false);
      setFormState((prev) => ({
        ...prev,
        description: "",
        name: "",
      }));
    });
  };

  return (
    <div className="max-w-lg mx-auto flex flex-col gap-4">
      <h2 className="text-center text-3xl mb-5 font-semibold">Add New Task</h2>

      <CustomInput
        name="name"
        type="text"
        label="Name*"
        placeholder="Pls Write Name Here"
        onChange={handleChange}
      />

      <CustomInput
        name="description"
        type="text"
        label="Description*"
        placeholder="Pls Write Descripiton"
        onChange={handleChange}
      />

      <CustomButton
        title="Add Todo"
        disabled={false}
        loading={loading}
        type="primary"
        classNames="mt-2"
        onClick={addNewTodo}
      />
    </div>
  );
};

export default AddTodoForm;
