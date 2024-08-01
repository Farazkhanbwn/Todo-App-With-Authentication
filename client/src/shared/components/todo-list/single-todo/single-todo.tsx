import { useTodoContext } from "@/context/todo-context/todo-context";
import CustomButton from "@/shared/ui/custom-button/custom-button";
import React, { useState } from "react";

interface SingleTodoProps {
  name: string;
  description: string;
  id: string;
}

const SingleTodo: React.FC<SingleTodoProps> = ({ name, description, id }) => {
  const { deleteTodo, selectTodo } = useTodoContext();
  const [disable, setDisable] = useState(false);

  const handleDeleteTodo = async () => {
    setDisable(true);
    await deleteTodo(id, () => {
      setDisable(false);
    });
  };

  const handleSelectTodo = () => {
    selectTodo(id);
  };

  return (
    <>
      <td>{name}</td>
      <td>{description}</td>
      <td>
        <CustomButton title="Update" type="link" onClick={handleSelectTodo} />
      </td>
      <td className="border-2 text-center">
        <CustomButton
          title="Delete"
          disabled={disable}
          type="primary"
          onClick={handleDeleteTodo}
        />
      </td>
    </>
  );
};

export default SingleTodo;
