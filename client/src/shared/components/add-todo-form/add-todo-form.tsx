import { useTodoContext } from "@/context/todo-context/todo-context";
import CustomButton from "@/shared/ui/custom-button/custom-button";
import CustomInput from "@/shared/ui/custom-input/custom-input";
import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";

const AddTodoForm = () => {
  const { addTodo, selectedTodo, updateTodo } = useTodoContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [formState, setFormState] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    if (selectedTodo) {
      setFormState({
        name: selectedTodo.name,
        description: selectedTodo.description,
      });
    }
  }, [selectedTodo]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e?.target;

    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    const { name, description } = formState;

    const callback = () => {
      setLoading(false);
      setFormState({ name: "", description: "" });
    };

    if (selectedTodo) {
      await updateTodo(selectedTodo._id, {name, description} , callback);
    } else {
      await addTodo(name, description, callback);
    }
  };

  return (
    <div className="max-w-lg mx-auto flex flex-col gap-4">
      <h2 className="text-center text-3xl mb-5 font-semibold">
        {selectedTodo ? "Update Task" : "Add New Task"}
      </h2>

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
        title={selectedTodo ? "Update Todo" : "Add Todo"}
        disabled={false}
        loading={loading}
        type="primary"
        classNames="mt-2"
        onClick={handleSubmit}
      />
    </div>
  );
};

export default AddTodoForm;
