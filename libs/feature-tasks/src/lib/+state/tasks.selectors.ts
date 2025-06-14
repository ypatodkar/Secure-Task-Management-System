import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TasksState } from './tasks.models';
import { tasksFeatureKey } from './tasks.reducer';

// Select the entire tasks feature state
export const selectTasksState = createFeatureSelector<TasksState>(tasksFeatureKey);

// Select all tasks from the list
export const selectAllTasks = createSelector(
  selectTasksState,
  (state: TasksState) => state.list
);

// Select the currently selected task
export const selectSelectedTask = createSelector(
  selectTasksState,
  (state: TasksState) => state.selectedTask
);

// Select loading status
export const selectTasksLoading = createSelector(
  selectTasksState,
  (state: TasksState) => state.isLoading
);

// Select error message
export const selectTasksError = createSelector(
  selectTasksState,
  (state: TasksState) => state.error
);
