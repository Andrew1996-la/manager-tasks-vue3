export interface TodoData {
  listOfTasks: Todo[];
}

export interface ListsData {
  lists: List[];
}

export interface AppData {
  lists: ListsData;
  tasks: TodoData;
}

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  isEdit: boolean;
}

export interface List {
  id: number;
  title: string;
  tasks: Todo[];
}
