import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RoleName, User } from '@secure-task-manager/data'; // Import RoleName and User
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html', // We'll use a template file
  styleUrls: [],
})
export class SidebarComponent implements OnInit {
  // Create an observable that will be true if the user is an admin
  public isAdmin$: Observable<boolean>;

  constructor(private authService: AuthService) {
    this.isAdmin$ = this.authService.currentUser$.pipe(
      map(user => !!user && user.roles.some(role => role.name === RoleName.ADMIN))
    );
  }

  ngOnInit(): void {
    // The async pipe will handle subscription, no need for manual subscription here.
  }

  logout() {
    this.authService.logout();
  }
}
