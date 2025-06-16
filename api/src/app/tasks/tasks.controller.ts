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
import { HasPermissions } from '../../decorators/has-roles.decorator';

@Controller('tasks') // Base route for tasks endpoints (e.g., /api/tasks)
@UseGuards(AuthGuard('jwt')) // Protect all task endpoints with JWT authentication
export class TasksController {
  constructor(private tasksService: TasksService) {}


  @Post()
  @UsePipes(ValidationPipe)
  // CRITICAL CHANGE: Only ADMIN and MANAGER can create tasks.
  @HasPermissions(PermissionName.CREATE_TASK)
  async createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user);
  }


  @Get()
  // This can remain broad, as the service now handles the scoping.
  @HasPermissions(PermissionName.READ_TASK, PermissionName.READ_OWN_TASK)
  async getTasks(
    @Query(ValidationPipe) filterDto: TaskFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
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
