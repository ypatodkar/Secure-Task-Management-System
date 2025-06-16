import { DataSource } from 'typeorm';
import { User } from '../../../libs/data/src/lib/user.entity';
import { Role, RoleName } from '../../../libs/data/src/lib/role.entity';
import { Permission } from '../../../libs/data/src/lib/permission.entity';
import { Organization } from '../../../libs/data/src/lib/organization.entity';
import { Task } from '../../../libs/data/src/lib/task.entity';

async function checkAdminUsers() {
  const dataSource = new DataSource({
    type: 'sqlite',
    database: 'data/secure-task-manager.sqlite',
    entities: [User, Role, Permission, Organization, Task],
    synchronize: true,
  });

  try {
    await dataSource.initialize();
    console.log('Database connection established');

    const userRepository = dataSource.getRepository(User);
    const adminUsers = await userRepository.find({
      relations: ['roles'],
      where: {
        roles: {
          name: RoleName.ADMIN
        }
      },
      select: {
        id: true,
        email: true,
        password: true,
        firstName: true,
        lastName: true,
        roles: {
          id: true,
          name: true
        }
      }
    });

    if (adminUsers.length === 0) {
      console.log('No admin users found. Please run create-admin.ts to create one.');
    } else {
      console.log(`Found ${adminUsers.length} admin user(s):`);
      adminUsers.forEach(user => {
        console.log('----------------------------------------');
        console.log(`Email: ${user.email}`);
        console.log(`Name: ${user.firstName} ${user.lastName}`);
        console.log(`Password Hash: ${user.password}`);
        console.log('Roles:');
        user.roles.forEach(role => {
          console.log(`- ${role.name} (${role.id})`);
        });
        console.log('----------------------------------------');
      });
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await dataSource.destroy();
  }
}

checkAdminUsers(); 