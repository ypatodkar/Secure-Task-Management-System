// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { AuthService } from '../../services/auth.service';
// import { Observable } from 'rxjs';

// // Define a type for the user object, matching what AuthService provides
// type AuthenticatedUser = {
//   id: string;
//   email: string;
//   firstName: string;
//   lastName: string;
// } | null;

// @Component({
//   selector: 'app-header',
//   standalone: true,
//   imports: [CommonModule],
//   template: `
//     <header class="bg-white shadow-sm p-4 flex justify-between items-center">
//       <h1 class="text-2xl font-semibold text-gray-800">Task Manager</h1>
//       <div *ngIf="currentUser$ | async as user" class="relative">
//         <button (click)="toggleDropdown()" class="flex items-center space-x-2">
//           <div class="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
//             {{ user.firstName.charAt(0) }}{{ user.lastName.charAt(0) }}
//           </div>
//           <span class="text-gray-700 font-medium">{{ user.firstName }} {{ user.lastName }}</span>
//         </button>

//         <!-- Dropdown Menu -->
//         <div *ngIf="isDropdownOpen" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
//           <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
//           <a href="#" (click)="logout($event)" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</a>
//         </div>
//       </div>
//     </header>
//   `,
//   styles: []
// })
// export class HeaderComponent {
//   currentUser$: Observable<AuthenticatedUser>;
//   isDropdownOpen = false;

//   constructor(private authService: AuthService) {
//     this.currentUser$ = this.authService.currentUser$;
//   }

//   toggleDropdown() {
//     this.isDropdownOpen = !this.isDropdownOpen;
//   }

//   logout(event: MouseEvent) {
//     event.preventDefault(); // Prevent default link behavior
//     this.authService.logout();
//   }
// }
