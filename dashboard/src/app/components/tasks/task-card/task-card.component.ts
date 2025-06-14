import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task, TaskStatus } from '@secure-task-manager/data'; // Import Task and TaskStatus

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-card.component.html',
  styleUrls: [],
})
export class TaskCardComponent {
  @Input() task!: Task; // Input property to receive a task object
  @Output() edit = new EventEmitter<Task>(); // Event for editing a task
  @Output() delete = new EventEmitter<string>(); // Event for deleting a task (emits task ID)
  @Output() statusChange = new EventEmitter<{ taskId: string, status: TaskStatus }>(); // Event for changing status

  TaskStatus = TaskStatus; // Make enum available in template

  onEdit() {
    this.edit.emit(this.task);
  }

  onDelete() {
    if (confirm(`Are you sure you want to delete task "${this.task.title}"?`)) {
      this.delete.emit(this.task.id);
    }
  }

  onChangeStatus(newStatus: TaskStatus) {
    this.statusChange.emit({ taskId: this.task.id, status: newStatus });
  }
}
