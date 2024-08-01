export interface TodoInterface {
  loading: boolean;
  updateTodo: (
    id: string,
    updates: Partial<Todo>,
    callback: () => void
  ) => Promise<void>;
  deleteTodo: (id: string, callback: () => void) => Promise<void>;
  getAllTodos: () => Promise<void>;
  addTodo: (
    name: string,
    description: string,
    callback: () => void
  ) => Promise<void>;
  todoList: Todo[];
  selectTodo: (id: string) => void;
  selectedTodo: Todo | null;
  todoErrors: Record<string, string>;
}

export const todoStateDefaultValues: TodoInterface = {
  loading: false,
  updateTodo: async (
    id: string,
    updates: Partial<Todo>,
    callback: () => void
  ) => {},
  deleteTodo: async (id: string, callback: () => void) => {},
  getAllTodos: async () => {},
  addTodo: async (
    name: string,
    description: string,
    callback: () => void
  ) => {},
  selectTodo: (id: string) => {},
  selectedTodo: null,
  todoList: [],
  todoErrors: {},
};

export interface Todo {
  _id: string;
  name: string;
  description: string;
}
