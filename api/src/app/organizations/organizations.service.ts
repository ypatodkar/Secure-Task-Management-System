import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Organization, User } from '@secure-task-manager/data';
import { Repository } from 'typeorm';
import { CreateOrganizationDto } from './dto/create-organization.dto';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organization)
    private organizationsRepository: Repository<Organization>,
    // Inject the User repository to update users
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<Organization[]> {
    return this.organizationsRepository.find();
  }

  async create(createOrganizationDto: CreateOrganizationDto): Promise<Organization> {
    const newOrganization = this.organizationsRepository.create(createOrganizationDto);
    return this.organizationsRepository.save(newOrganization);
  }

  /**
   * Adds a user to a specific organization.
   * @param organizationId - The ID of the organization.
   * @param userId - The ID of the user to add.
   * @returns The updated user.
   */
  async addUser(organizationId: string, userId: string): Promise<User> {
    const organization = await this.organizationsRepository.findOneBy({ id: organizationId });
    if (!organization) {
      throw new NotFoundException(`Organization with ID "${organizationId}" not found`);
    }

    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`User with ID "${userId}" not found`);
    }

    user.organizationId = organization.id;
    return this.usersRepository.save(user);
  }
  
}
