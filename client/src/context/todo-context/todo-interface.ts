export interface TodoInterface {
  loading: boolean;
  updateTodo: (id: string, updates: Partial<Todo>) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  getAllTodos: () => Promise<void>;
  addTodo: (
    name: string,
    description: string,
    callback: () => void
  ) => Promise<void>;
  todoList: Todo[];
  todoErrors: Record<string, string>;
}

export const todoStateDefaultValues: TodoInterface = {
  loading: false,
  updateTodo: async (id: string, updates: Partial<Todo>) => {},
  deleteTodo: async (id: string) => {},
  getAllTodos: async () => {},
  addTodo: async (
    name: string,
    description: string,
    callback: () => void
  ) => {},
  todoList: [],
  todoErrors: {},
};

interface Todo {
  id: string;
  name: string;
  //   task: string;
  description: string;
}
