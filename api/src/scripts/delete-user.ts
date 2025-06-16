import { DataSource } from 'typeorm';
import { User } from '../../../libs/data/src/lib/user.entity';
import { Role, RoleName } from '../../../libs/data/src/lib/role.entity';
import { Permission } from '../../../libs/data/src/lib/permission.entity';
import { Organization } from '../../../libs/data/src/lib/organization.entity';
import { Task } from '../../../libs/data/src/lib/task.entity';

async function deleteUser(email: string) {
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

    // Find the user
    const user = await userRepository.findOne({
      where: { email },
      relations: ['roles']
    });

    if (!user) {
      console.log(`No user found with email: ${email}`);
      return;
    }

    // // Check if user is an admin
    // const isAdmin = user.roles.some(role => role.name === RoleName.ADMIN);
    // if (isAdmin) {
    //   console.log('Cannot delete an admin user. Please remove admin role first.');
    //   return;
    // }

    // Delete the user
    await userRepository.remove(user);
    console.log(`User ${email} has been deleted successfully.`);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await dataSource.destroy();
  }
}

// Get email from command line argument
const email = process.argv[2];
if (!email) {
  console.log('Please provide an email address:');
  console.log('Usage: npx ts-node delete-user.ts <email>');
  process.exit(1);
}

deleteUser(email); 