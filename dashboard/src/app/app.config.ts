import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http';
import { TasksEffects } from '@secure-task-manager/feature-tasks';
import { tasksReducer } from '@secure-task-manager/feature-tasks';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideStore({
      tasks: tasksReducer,
    }),
    provideEffects([TasksEffects]),
    provideHttpClient(),
  ],
};
