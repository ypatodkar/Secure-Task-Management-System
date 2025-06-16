import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// Make sure both Organization and User are imported
import { Organization, User } from '@secure-task-manager/data';
import { AuthModule } from '../auth/auth.module';
import { OrganizationsController } from './organizations.controller';
import { OrganizationsService } from './organizations.service';

@Module({
  imports: [
    // Add User to the forFeature array
    TypeOrmModule.forFeature([Organization, User]),
    AuthModule,
  ],
  controllers: [OrganizationsController],
  providers: [OrganizationsService],
})
export class OrganizationsModule {}
