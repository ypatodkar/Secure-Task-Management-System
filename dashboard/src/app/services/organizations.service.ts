import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Organization } from '@secure-task-manager/data';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { User } from '@secure-task-manager/data'; 
@Injectable({ providedIn: 'root' })
export class OrganizationsService {
  private apiUrl = `${environment.apiUrl}/organizations`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getOrganizations(): Observable<Organization[]> {
    return this.http.get<Organization[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }
  addUserToOrganization(organizationId: string, userId: string): Observable<User> {
  const headers = this.getAuthHeaders(); // Assuming you have a getAuthHeaders method
  return this.http.post<User>(`${this.apiUrl}/${organizationId}/users`, { userId }, { headers });
}
}
