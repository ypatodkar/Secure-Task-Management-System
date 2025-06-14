import { Controller, Get, UseGuards, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuditLogsService } from './audit-logs.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@secure-task-manager/data';
import { GetUser } from '../../decorators/get-user.decorator'; // We will create this
import { RolesGuard } from '../../guards/roles.guard'; // We will create this
import { HasRoles } from '../../decorators/has-roles.decorator'; // We will create this
import { RoleName } from '@secure-task-manager/data';

@Controller('audit-logs') // Base route for audit logs (e.g., /api/audit-logs)
@UseGuards(AuthGuard('jwt'), RolesGuard) // Protect with JWT and then apply RolesGuard
@HasRoles(RoleName.ADMIN, RoleName.MANAGER) // Only Admins and Managers can view audit logs
export class AuditLogsController {
  constructor(private auditLogsService: AuditLogsService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async getAuditLogs(@GetUser() user: User): Promise<any[]> {
    // The service already handles organization-level filtering.
    return this.auditLogsService.getAuditLogs(user);
  }
}
