import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '@secure-task-manager/data';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { RoleName } from '@secure-task-manager/data';
@Injectable({ providedIn: 'root' })
export class UsersService {
  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }
  updateUserRole(userId: string, roleName: RoleName): Observable<User> {
    const headers = this.getAuthHeaders();
    return this.http.patch<User>(`${this.apiUrl}/${userId}/role`, { roleName }, { headers });
  }
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }
}
