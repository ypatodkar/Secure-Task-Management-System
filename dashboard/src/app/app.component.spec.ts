import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterOutlet], // Keep CommonModule and RouterOutlet
  selector: 'app-root',
  template: `
    <!-- This will be our main layout for the dashboard -->
    <div class="min-h-screen bg-gray-100 flex flex-col">
      <!-- Header will go here -->
      <header class="bg-white shadow-sm p-4">
        <h1 class="text-2xl font-semibold text-gray-800">Secure Task Manager</h1>
      </header>

      <!-- Main content area with sidebar and tasks -->
      <div class="flex flex-1">
        <!-- Sidebar will go here -->
        <aside class="w-64 bg-gray-800 text-white p-4">
          <nav>
            <ul>
              <li class="mb-2"><a href="#" class="block hover:bg-gray-700 p-2 rounded">Dashboard</a></li>
              <li class="mb-2"><a href="#" class="block hover:bg-gray-700 p-2 rounded">Tasks</a></li>
              <li class="mb-2"><a href="#" class="block hover:bg-gray-700 p-2 rounded">Organizations</a></li>
              <li class="mb-2"><a href="#" class="block hover:bg-gray-700 p-2 rounded">Users</a></li>
              <li class="mb-2"><a href="#" class="block hover:bg-gray-700 p-2 rounded">Audit Logs</a></li>
            </ul>
          </nav>
        </aside>

        <!-- Content area for router outlet -->
        <main class="flex-1 p-6">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styleUrls: ['./app.component.css'], // Or inline styles if preferred
})
export class AppComponent {
  title = 'dashboard';
}
