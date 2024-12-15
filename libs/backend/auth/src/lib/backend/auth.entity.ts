import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({
  name: 'auths',
})
export class AuthEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  email!: string;

  @Column({
    length: 6,
  })
  code!: string;

  @Column({
    type: 'datetime',
  })
  expired!: Date;

  @Column({
    type: 'datetime',
    nullable: true,
  })
  verified!: Date | null;

  @CreateDateColumn({
    type: 'datetime',
  })
  created!: Date;

  @UpdateDateColumn({
    type: 'datetime',
    nullable: true,
  })
  updated!: Date;

  @Column({
    default: 0,
  })
  faults!: number;
}
