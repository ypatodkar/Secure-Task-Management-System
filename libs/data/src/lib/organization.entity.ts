import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { User } from './user.entity';
  import { Task } from './task.entity';
  
  @Entity('organizations')
  export class Organization {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
  
    @Column({ unique: true })
    name!: string;
  
    @CreateDateColumn()
    createdAt!: Date;
  
    @UpdateDateColumn()
    updatedAt!: Date;
  
    // --- Relationships ---
  
    // One organization can have many users
    @OneToMany(() => User, (user) => user.organization)
    users!: User[];
  
    // One organization can have many tasks
    @OneToMany(() => Task, (task) => task.organization)
    tasks!: Task[];
  }
  