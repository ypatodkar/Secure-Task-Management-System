import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '@secure-task-manager/data'; // Import Task entity

@Injectable({ providedIn: 'root' }) // Make it a singleton service
export class TasksApiService {
  private apiUrl = 'http://localhost:3000/api/tasks'; // Your NestJS API URL for tasks

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    // In the next step, we'll add authentication headers here
    return this.http.get<Task[]>(this.apiUrl);
  }

  createTask(task: Partial<Task>): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  updateTask(taskId: string, task: Partial<Task>): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/${taskId}`, task);
  }

  deleteTask(taskId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${taskId}`);
  }
}
