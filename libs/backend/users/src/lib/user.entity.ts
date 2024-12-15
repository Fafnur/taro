import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import type { User } from '@taro/users/common';
import { UserStatus } from '@taro/users/common';

@Entity({
  name: 'users',
})
export class UserEntity implements User {
  @PrimaryGeneratedColumn('uuid')
  uuid!: string;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.Base,
  })
  status!: UserStatus;

  @Column({ unique: true })
  email!: string;

  @Column({ nullable: true })
  firstname!: string;

  @Column({ nullable: true })
  lastname!: string;

  @Column({ nullable: true })
  birthdate!: string;

  @CreateDateColumn()
  created!: string;

  @UpdateDateColumn({ nullable: true })
  updated!: string;
}
