import { DataSource } from 'typeorm';
import { User } from '../../../libs/data/src/lib/user.entity';
import { Role, RoleName } from '../../../libs/data/src/lib/role.entity';
import { Permission } from '../../../libs/data/src/lib/permission.entity';
import { Organization } from '../../../libs/data/src/lib/organization.entity';
import { Task } from '../../../libs/data/src/lib/task.entity';
import * as bcrypt from 'bcryptjs';

async function createAdminUser() {
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
    const roleRepository = dataSource.getRepository(Role);

    // Check if admin user exists and delete it
    const existingAdmin = await userRepository.findOne({
      where: { email: 'admin@example.com' },
      relations: ['roles']
    });

    if (existingAdmin) {
      console.log('Deleting existing admin user:', existingAdmin.email);
      await userRepository.remove(existingAdmin);
    }

    // Get or create admin role
    let adminRole = await roleRepository.findOne({
      where: { name: RoleName.ADMIN }
    });

    if (!adminRole) {
      adminRole = roleRepository.create({
        name: RoleName.ADMIN,
        description: 'Administrator role'
      });
      await roleRepository.save(adminRole);
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('Password@123', 10);
    const adminUser = userRepository.create({
      email: 'admin@example.com',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      roles: [adminRole]
    });

    await userRepository.save(adminUser);
    console.log('Admin user created successfully:', adminUser.email);
    console.log('Default credentials:');
    console.log('Email: admin@example.com');
    console.log('Password: Password@123');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await dataSource.destroy();
  }
}

createAdminUser(); 