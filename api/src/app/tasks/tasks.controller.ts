import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, UsePipes, ValidationPipe, Query, Req } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskFilterDto } from './dto/task-filter.dto';
import { AuthGuard } from '@nestjs/passport'; // For JWT authentication
import { Task, User } from '@secure-task-manager/data'; // To type req.user
import { GetUser } from '../../decorators/get-user.decorator'; // We will create this
import { RolesGuard } from '../../guards/roles.guard'; // We will create this
import { HasRoles } from '../../decorators/has-roles.decorator'; // We will create this
import { RoleName, PermissionName } from '@secure-task-manager/data';

@Controller('tasks') // Base route for tasks endpoints (e.g., /api/tasks)
@UseGuards(AuthGuard('jwt')) // Protect all task endpoints with JWT authentication
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  @UsePipes(ValidationPipe) // Apply validation
  @UseGuards(RolesGuard) // Apply RBAC guard
  @HasRoles(RoleName.ADMIN, RoleName.MANAGER, RoleName.USER) // Users with these roles can create tasks
  async createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User, // Get the authenticated user
  ): Promise<any> {
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true })) // Enable transform for query parameters
  @UseGuards(RolesGuard)
  @HasRoles(RoleName.ADMIN, RoleName.MANAGER, RoleName.USER, RoleName.GUEST) // Even guests might view some tasks
  async getTasks(
    @Query() filterDto: TaskFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    // Implement permission check within the service for fine-grained control
    // Or, define more specific permissions like READ_ALL_TASKS vs READ_OWN_TASKS
    // For now, the service handles organization-level filtering.
    return this.tasksService.getTasks(filterDto, user);
  }

  @Get('/:id')
  @UseGuards(RolesGuard)
  @HasRoles(RoleName.ADMIN, RoleName.MANAGER, RoleName.USER, RoleName.GUEST)
  async getTaskById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Task> {
    // The service handles access control (organization-level and ownership implied)
    return this.tasksService.getTaskById(id, user);
  }

  @Patch('/:id')
  @UsePipes(ValidationPipe)
  @UseGuards(RolesGuard)
  @HasRoles(RoleName.ADMIN, RoleName.MANAGER, RoleName.USER) // Admins/Managers/Users can update tasks
  async updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    // The service handles access control (organization-level and ownership implied)
    return this.tasksService.updateTask(id, updateTaskDto, user);
  }

  @Delete('/:id')
  @UseGuards(RolesGuard)
  @HasRoles(RoleName.ADMIN, RoleName.MANAGER, RoleName.USER) // Admins/Managers/Users can delete tasks (fine-grain logic in service)
  async deleteTask(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<void> {
    // The service handles access control
    return this.tasksService.deleteTask(id, user);
  }
}
