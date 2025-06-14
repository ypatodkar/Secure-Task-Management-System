import { createAction, props } from '@ngrx/store';
import { Task } from '@secure-task-manager/data'; // Import Task entity

// Load Tasks Actions
export const loadTasks = createAction('[Tasks] Load Tasks');
export const loadTasksSuccess = createAction(
  '[Tasks] Load Tasks Success',
  props<{ tasks: Task[] }>()
);
export const loadTasksFailure = createAction(
  '[Tasks] Load Tasks Failure',
  props<{ error: string }>()
);

// Create Task Actions
export const createTask = createAction(
  '[Tasks] Create Task',
  props<{ task: Partial<Task> }>() // Use Partial<Task> for creation DTO
);
export const createTaskSuccess = createAction(
  '[Tasks] Create Task Success',
  props<{ task: Task }>()
);
export const createTaskFailure = createAction(
  '[Tasks] Create Task Failure',
  props<{ error: string }>()
);

// Update Task Actions
export const updateTask = createAction(
  '[Tasks] Update Task',
  props<{ taskId: string; task: Partial<Task> }>()
);
export const updateTaskSuccess = createAction(
  '[Tasks] Update Task Success',
  props<{ task: Task }>()
);
export const updateTaskFailure = createAction(
  '[Tasks] Update Task Failure',
  props<{ error: string }>()
);

// Delete Task Actions
export const deleteTask = createAction(
  '[Tasks] Delete Task',
  props<{ taskId: string }>()
);
export const deleteTaskSuccess = createAction(
  '[Tasks] Delete Task Success',
  props<{ taskId: string }>()
);
export const deleteTaskFailure = createAction(
  '[Tasks] Delete Task Failure',
  props<{ error: string }>()
);

// Select Task for Editing/Viewing
export const selectTask = createAction(
  '[Tasks] Select Task',
  props<{ taskId: string | null }>() // Null to deselect
);

// Clear Tasks (e.g., on logout)
export const clearTasks = createAction('[Tasks] Clear Tasks');
