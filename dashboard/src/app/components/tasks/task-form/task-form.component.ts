import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task, User } from '@secure-task-manager/data';
import { UsersService } from '../../../services/users.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
})
export class TaskFormComponent implements OnInit, OnChanges {
  @Input() taskToEdit: Task | null = null;
  @Output() saveTask = new EventEmitter<any>(); // Emits the raw form value
  @Output() cancel = new EventEmitter<void>();

  taskForm!: FormGroup;
  users$: Observable<User[]>;

  constructor(private usersService: UsersService) {
    this.users$ = this.usersService.getUsers();
    this.initForm();
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['taskToEdit']) {
      this.initForm();
    }
  }

  private initForm() {
    this.taskForm = new FormGroup({
      title: new FormControl(this.taskToEdit?.title || '', [Validators.required, Validators.minLength(3)]),
      description: new FormControl(this.taskToEdit?.description || '', [Validators.required]),
      assigneeId: new FormControl(this.taskToEdit?.assigneeId || '', [Validators.required]),
    });
  }

  // --- START OF THE FIX ---
  // Add these public getters to expose the form controls to the template
  get title() {
    return this.taskForm.get('title');
  }

  get description() {
    return this.taskForm.get('description');
  }
  // --- END OF THE FIX ---

  onSubmit() {
    if (this.taskForm.valid) {
      this.saveTask.emit(this.taskForm.value);
    } else {
      this.taskForm.markAllAsTouched();
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
