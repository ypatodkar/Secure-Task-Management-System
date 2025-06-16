import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task, TaskStatus, RoleName, User } from '@secure-task-manager/data';
import { TaskCardComponent } from '../task-card/task-card.component';
import { TasksService } from '../../../services/tasks.service';
import { TaskFormComponent } from '../task-form/task-form.component';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AuthService } from '../../../services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskCardComponent, TaskFormComponent, DragDropModule],
  templateUrl: './task-list.component.html',
})
export class TaskListComponent implements OnInit {
  todoTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  doneTasks: Task[] = [];
  TaskStatus = TaskStatus;
  isLoading: boolean = false;
  error: string | null = null;
  showEditForm: boolean = false;
  taskToEdit: Task | null = null;
  canCreateTasks$: Observable<boolean>;
  
  constructor(
    private tasksService: TasksService,
    private authService: AuthService,
  ) {
    this.canCreateTasks$ = this.authService.currentUser$.pipe(
      map(user => {
        const userRole = user?.roles[0]?.name;
        return userRole === RoleName.ADMIN || userRole === RoleName.MANAGER;
      })
    );
  }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.isLoading = true;
    this.error = null;
    this.tasksService.getTasks().subscribe({
      next: (tasks) => {
        this.todoTasks = tasks.filter(t => t.status === TaskStatus.OPEN);
        this.inProgressTasks = tasks.filter(t => t.status === TaskStatus.IN_PROGRESS);
        this.doneTasks = tasks.filter(t => t.status === TaskStatus.DONE);
        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'Failed to load tasks.';
        this.isLoading = false;
      }
    });
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const task = event.previousContainer.data[event.previousIndex];
      const newStatus = event.container.id as TaskStatus;
      this.onChangeStatus({ taskId: task.id, status: newStatus });
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  onEdit(task: Task | null) {
    this.taskToEdit = task ? { ...task } : null;
    this.showEditForm = true;
  }

  onDelete(taskId: string) {
    this.tasksService.deleteTask(taskId).subscribe({
      next: () => this.loadTasks(),
      error: (err) => this.error = 'Failed to delete task.',
    });
  }

  onChangeStatus(event: { taskId: string, status: TaskStatus }) {
    this.tasksService.updateTask(event.taskId, { status: event.status }).subscribe({
      error: (err) => this.error = 'Failed to update status.',
    });
  }

  onCancelEdit() {
    this.showEditForm = false;
    this.taskToEdit = null;
  }

  /**
   * Main handler that decides whether to create or update a task.
   */
  onSaveTask(formData: any) {
    if (this.taskToEdit) {
      this.handleUpdateTask(formData);
    } else {
      this.handleCreateTask(formData);
    }
  }

  /**
   * Handles the logic for CREATING a new task.
   */
  private handleCreateTask(formData: any) {
    this.error = null;
    this.isLoading = true;
    this.tasksService.createTask(formData).subscribe({
      next: () => {
        this.showEditForm = false;
        this.isLoading = false;
        this.loadTasks();
      },
      error: (err) => {
        this.error = err.error?.message || 'Failed to create task.';
        this.isLoading = false;
      },
    });
  }

  /**
   * Handles the logic for UPDATING an existing task.
   */
  private handleUpdateTask(formData: any) {
    if (!this.taskToEdit) return;

    // Create a payload that merges the original task with form changes.
    const updatePayload: Partial<Task> = {
      ...this.taskToEdit,
      ...formData,
    };
    
    this.error = null;
    this.isLoading = true;
    this.tasksService.updateTask(this.taskToEdit.id, updatePayload).subscribe({
      next: () => {
        this.showEditForm = false;
        this.taskToEdit = null;
        this.isLoading = false;
        this.loadTasks();
      },
      error: (err) => {
        this.error = err.error?.message || 'Failed to update task.';
        this.isLoading = false;
      },
    });
  }
}
