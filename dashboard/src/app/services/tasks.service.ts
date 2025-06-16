import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Task } from '@secure-task-manager/data';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private apiUrl = `${environment.apiUrl}/tasks`;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken');
    console.log("Token:", token);
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl, { headers: this.getHeaders() }).pipe(
      catchError(error => {
        console.error('Error fetching tasks:', error);
        return throwError(() => error);
      })
    );
  }

  createTask(task: Partial<Task>): Observable<Task> {
    console.log('Creating task with data:', task);
    return this.http.post<Task>(this.apiUrl, task, { headers: this.getHeaders() }).pipe(
      catchError(error => {
        console.error('Error creating task:', error);
        return throwError(() => error);
      })
    );
  }

  updateTask(taskId: string, task: Partial<Task>): Observable<Task> {
    console.log('Updating task with data:', `${this.apiUrl}/${taskId}`);
    console.log(' task  data:', task);

    return this.http.patch<Task>(`${this.apiUrl}/${taskId}`, task, { headers: this.getHeaders() }).pipe(
      catchError(error => {
        console.error('Error updating task:', error);
        return throwError(() => error);
      })
    );
  }

  deleteTask(taskId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${taskId}`, { headers: this.getHeaders() }).pipe(
      catchError(error => {
        console.error('Error deleting task:', error);
        return throwError(() => error);
      })
    );
  }
} 