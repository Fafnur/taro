import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'auths',
})
export class AuthEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  email!: string;

  @Column()
  code!: string;

  @Column({ name: 'valid_until' })
  validUntil!: string;
}
