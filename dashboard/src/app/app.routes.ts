import { Routes } from '@angular/router';
import { TaskListComponent } from './components/tasks/task-list/task-list.component'; // Import TaskListComponent
import { LoginComponent } from './components/auth/login/login.component'; // Import LoginComponent
import { RegisterComponent } from './components/auth/register/register.component'; // Import RegisterComponent
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' }, // Redirect to tasks by default
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { 
    path: 'tasks', 
    component: TaskListComponent,
    canActivate: [authGuard]
  },
  // Add other routes here as you build more pages
];
