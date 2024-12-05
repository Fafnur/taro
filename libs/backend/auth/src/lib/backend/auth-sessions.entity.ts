import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'auths_sessions',
})
export class AuthSessionsEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  email!: string;

  @Column({
    nullable: true,
  })
  userAgent!: string | null;

  @Column()
  refreshToken!: string;

  @CreateDateColumn({
    type: 'datetime',
  })
  created!: Date;

  @Column({
    type: 'datetime',
    nullable: true,
  })
  used!: Date | null;
}
