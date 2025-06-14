import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as TasksActions from './tasks.actions';
import { TasksApiService } from '../tasks-api.service';
import { Task } from '../task.model';

@Injectable()
export class TasksEffects {
  // Declare the effects properties here.
  readonly loadTasks$;
  readonly createTask$;
  readonly updateTask$;
  readonly deleteTask$;

  constructor(
    private readonly actions$: Actions,
    private readonly tasksApiService: TasksApiService
  ) {
    // Initialize the effects inside the constructor where injected services are available.

    /**
     * Effect to handle loading all tasks.
     * Uses switchMap to cancel any pending load requests if a new one comes in.
     */
    this.loadTasks$ = createEffect(() =>
      this.actions$.pipe(
        ofType(TasksActions.loadTasks),
        switchMap(() =>
          this.tasksApiService.getTasks().pipe(
            map((tasks) => TasksActions.loadTasksSuccess({ tasks })),
            catchError((error) => of(TasksActions.loadTasksFailure({ error: error.message })))
          )
        )
      )
    );

    /**
     * Effect to handle creating a new task.
     * Uses concatMap to ensure create requests are processed in order.
     */
    this.createTask$ = createEffect(() =>
      this.actions$.pipe(
        ofType(TasksActions.createTask),
        concatMap(({ task }) =>
          this.tasksApiService.createTask(task).pipe(
            map((newTask) => TasksActions.createTaskSuccess({ task: newTask })),
            catchError((error) => of(TasksActions.createTaskFailure({ error: error.message })))
          )
        )
      )
    );

    /**
     * Effect to handle updating an existing task.
     * Uses concatMap to ensure update requests are processed in order.
     */
    this.updateTask$ = createEffect(() =>
      this.actions$.pipe(
        ofType(TasksActions.updateTask),
        concatMap(({ taskId, task }) =>
          this.tasksApiService.updateTask(taskId, task).pipe(
            map((updatedTask) => TasksActions.updateTaskSuccess({ task: updatedTask })),
            catchError((error) => of(TasksActions.updateTaskFailure({ error: error.message })))
          )
        )
      )
    );

    /**
     * Effect to handle deleting a task.
     * Uses concatMap to ensure delete requests are processed in order.
     */
    this.deleteTask$ = createEffect(() =>
      this.actions$.pipe(
        ofType(TasksActions.deleteTask),
        concatMap(({ taskId }) =>
          this.tasksApiService.deleteTask(taskId).pipe(
            map(() => TasksActions.deleteTaskSuccess({ taskId })),
            catchError((error) => of(TasksActions.deleteTaskFailure({ error: error.message })))
          )
        )
      )
    );
  }
}
