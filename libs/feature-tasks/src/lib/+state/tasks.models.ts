import { Task } from '@secure-task-manager/data';// Import your Task entity

export interface TasksState {
  list: Task[]; // Array of tasks
  selectedTask: Task | null; // Currently selected task for editing/viewing
  isLoading: boolean; // Loading indicator
  error: string | null; // Error message
}

// Initial state for tasks
export const initialTasksState: TasksState = {
  list: [],
  selectedTask: null,
  isLoading: false,
  error: null,
};
