import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task, TaskStatus } from '@secure-task-manager/data';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: [],
})
export class TaskFormComponent implements OnInit, OnChanges {
  @Input() taskToEdit: Task | null = null;
  @Output() saveTask = new EventEmitter<Partial<Task>>();
  @Output() cancel = new EventEmitter<void>();

  taskForm!: FormGroup;
  TaskStatus = TaskStatus; // Make enum available in template

  constructor() {
    this.initForm();
  }

  ngOnInit() {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['taskToEdit']) {
      console.log('Task to edit changed:', changes['taskToEdit'].currentValue);
      this.initForm();
    }
  }

  private initForm() {
    console.log('Initializing form with task:', this.taskToEdit);
    
    // Create the form with the task data
    this.taskForm = new FormGroup({
      title: new FormControl(this.taskToEdit?.title || '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]),
      description: new FormControl(this.taskToEdit?.description || '', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(500)
      ]),
      status: new FormControl(this.taskToEdit?.status || TaskStatus.OPEN, [
        Validators.required
      ]),
      assigneeId: new FormControl(this.taskToEdit?.assigneeId || null)
    });

    // Log the initial form values
    console.log('Form initialized with values:', this.taskForm.value);
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;
      console.log('Submitting form with values:', formValue);
      
      // Remove id from the task data before emitting
      const taskData: Partial<Task> = {
        title: formValue.title,
        description: formValue.description,
        status: formValue.status,
        assigneeId: formValue.assigneeId
      };

      console.log('Emitting task data:', taskData);
      this.saveTask.emit(taskData);
    } else {
      console.log('Form is invalid:', this.taskForm.errors);
    }
  }

  onCancel() {
    console.log('Canceling form edit');
    this.cancel.emit();
  }

  // Helper methods for form validation
  get title() { return this.taskForm.get('title'); }
  get description() { return this.taskForm.get('description'); }
  get status() { return this.taskForm.get('status'); }
}
