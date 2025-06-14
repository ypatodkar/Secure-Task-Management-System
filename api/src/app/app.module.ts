import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User, Organization, Role, Permission, Task, AuditLog } from '@secure-task-manager/data';
import { AuthModule } from './auth/auth.module'; // Import AuthModule
import { TasksModule } from './tasks/tasks.module'; // Import TasksModule

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './data/secure-task-manager.sqlite',
      entities: [User, Organization, Role, Permission, Task, AuditLog],
      synchronize: true, // Keep true for development
      logging: ['query', 'error'],
    }),
    AuthModule, // Add AuthModule here
    TasksModule, // Add TasksModule here
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
