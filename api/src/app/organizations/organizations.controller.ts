import { Controller, Get, Post, Body, Param, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PermissionName } from '@secure-task-manager/data';
import { OrganizationsService } from './organizations.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { AddUserToOrganizationDto } from './dto/add-user.dto';

// Import your existing guard and decorator
import { RolesGuard } from '../../guards/roles.guard';
import { HasPermissions } from '../../decorators/has-roles.decorator';

@Controller('organizations')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Get()
  @HasPermissions(PermissionName.READ_ORGANIZATION)
  findAll() {
    return this.organizationsService.findAll();
  }

  @Post()
  @HasPermissions(PermissionName.CREATE_ORGANIZATION)
  create(@Body(ValidationPipe) createOrganizationDto: CreateOrganizationDto) {
    return this.organizationsService.create(createOrganizationDto);
  }

  @Post(':orgId/users')
  @HasPermissions(PermissionName.UPDATE_ORGANIZATION)
  addUserToOrganization(
    @Param('orgId') orgId: string,
    @Body(ValidationPipe) addUserDto: AddUserToOrganizationDto,
  ) {
    return this.organizationsService.addUser(orgId, addUserDto.userId);
  }
}
