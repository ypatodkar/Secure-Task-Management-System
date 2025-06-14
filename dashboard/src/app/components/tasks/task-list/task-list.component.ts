import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task, TaskStatus } from '@secure-task-manager/data';
import { TaskCardComponent } from '../task-card/task-card.component';
import { TasksService } from '../../../services/tasks.service';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskCardComponent, TaskFormComponent],
  templateUrl: './task-list.component.html',
  styleUrls: [],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  isLoading: boolean = false;
  error: string | null = null;
  showEditForm: boolean = false;
  taskToEdit: Task | null = null;

  constructor(private tasksService: TasksService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.isLoading = true;
    this.error = null;
    
    this.tasksService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading tasks:', error);
        this.error = 'Failed to load tasks. Please try again.';
        this.isLoading = false;
      }
    });
  }

  onEdit(task: Task | null) {
    console.log('Editing task:', task);
    if (task) {
      // Create a deep copy of the task to prevent direct mutation
      this.taskToEdit = { ...task };
    } else {
      this.taskToEdit = null;
    }
    this.showEditForm = true;
  }

  onDelete(taskId: string) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.isLoading = true;
      this.tasksService.deleteTask(taskId).subscribe({
        next: () => {
          this.tasks = this.tasks.filter(task => task.id !== taskId);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error deleting task:', error);
          this.error = 'Failed to delete task. Please try again.';
          this.isLoading = false;
        }
      });
    }
  }

  onChangeStatus(event: { taskId: string, status: TaskStatus }) {
    const task = this.tasks.find(t => t.id === event.taskId);
    if (task) {
      this.isLoading = true;
      this.tasksService.updateTask(event.taskId, { status: event.status }).subscribe({
        next: (updatedTask) => {
          this.tasks = this.tasks.map(t => t.id === updatedTask.id ? updatedTask : t);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error updating task status:', error);
          this.error = 'Failed to update task status. Please try again.';
          this.isLoading = false;
        }
      });
    }
  }

  onSaveTask(taskData: Partial<Task>) {
    console.log('Saving task data:', taskData);
    if (this.taskToEdit) {
      this.isLoading = true;
      this.tasksService.updateTask(this.taskToEdit.id, taskData).subscribe({
        next: (updatedTask) => {
          console.log('Task updated successfully:', updatedTask);
          this.tasks = this.tasks.map(t => t.id === updatedTask.id ? updatedTask : t);
          this.showEditForm = false;
          this.taskToEdit = null;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error updating task:', error);
          this.error = 'Failed to update task. Please try again.';
          this.isLoading = false;
        }
      });
    } else {
      this.isLoading = true;
      this.tasksService.createTask(taskData).subscribe({
        next: (newTask) => {
          console.log('Task created successfully:', newTask);
          this.tasks = [...this.tasks, newTask];
          this.showEditForm = false;
          this.taskToEdit = null;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error creating task:', error);
          this.error = 'Failed to create task. Please try again.';
          this.isLoading = false;
        }
      });
    }
  }

  onCancelEdit() {
    console.log('Canceling edit');
    this.showEditForm = false;
    this.taskToEdit = null;
  }
}
