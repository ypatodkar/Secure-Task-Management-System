import { IsEnum, IsNotEmpty } from 'class-validator';
import { RoleName } from '@secure-task-manager/data';

export class UpdateUserRoleDto {
  @IsNotEmpty()
  @IsEnum(RoleName)
  roleName: RoleName;
}
