import { createReducer, on } from '@ngrx/store';
import { initialTasksState } from './tasks.models';
import * as TasksActions from './tasks.actions'; // Import all actions

export const tasksFeatureKey = 'tasks'; // Feature key for tasks state

export const tasksReducer = createReducer(
  initialTasksState,

  // Load Tasks
  on(TasksActions.loadTasks, (state) => ({ ...state, isLoading: true, error: null })),
  on(TasksActions.loadTasksSuccess, (state, { tasks }) => ({
    ...state,
    list: tasks,
    isLoading: false,
    error: null,
  })),
  on(TasksActions.loadTasksFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  // Create Task
  on(TasksActions.createTask, (state) => ({ ...state, isLoading: true, error: null })),
  on(TasksActions.createTaskSuccess, (state, { task }) => ({
    ...state,
    list: [...state.list, task], // Add new task to the list
    isLoading: false,
    error: null,
    selectedTask: null, // Clear selected task after creation
  })),
  on(TasksActions.createTaskFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  // Update Task
  on(TasksActions.updateTask, (state) => ({ ...state, isLoading: true, error: null })),
  on(TasksActions.updateTaskSuccess, (state, { task }) => ({
    ...state,
    list: state.list.map((t) => (t.id === task.id ? task : t)), // Update the task in the list
    isLoading: false,
    error: null,
    selectedTask: null, // Clear selected task after update
  })),
  on(TasksActions.updateTaskFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  // Delete Task
  on(TasksActions.deleteTask, (state) => ({ ...state, isLoading: true, error: null })),
  on(TasksActions.deleteTaskSuccess, (state, { taskId }) => ({
    ...state,
    list: state.list.filter((t) => t.id !== taskId), // Remove the task from the list
    isLoading: false,
    error: null,
    selectedTask: null, // Clear selected task if it was the deleted one
  })),
  on(TasksActions.deleteTaskFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  // Select Task
  on(TasksActions.selectTask, (state, { taskId }) => ({
    ...state,
    selectedTask: taskId ? state.list.find(task => task.id === taskId) || null : null,
  })),

  // Clear Tasks
  on(TasksActions.clearTasks, (state) => ({
    ...initialTasksState, // Reset to initial state
  }))
);
