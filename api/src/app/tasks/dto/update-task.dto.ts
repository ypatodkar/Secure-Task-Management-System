import { IsString, IsOptional, IsEnum, IsUUID } from 'class-validator';
import { TaskStatus } from '@secure-task-manager/data'; // Import TaskStatus enum
import { PartialType } from '@nestjs/mapped-types'; // Used for partial updates

// Import CreateTaskDto
import { CreateTaskDto } from './create-task.dto';

// PartialType makes all properties optional and keeps validation rules
export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus; // Optional: New status for the task

  @IsString()
  @IsOptional()
  @IsUUID('4', { message: 'Invalid assigneeId format' })
  assigneeId?: string; // Optional: Update assignee
}
