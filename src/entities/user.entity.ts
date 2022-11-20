import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true, default: '' })
  username: string;

  @Column({ default: false })
  is2FA: boolean;

  @Column()
  friends: number[];
  @Column()
  reqsent: number[];
  @Column()
  reqpending: number[];
  @Column()
  blockedby: number[];
  @Column()
  blocked: number[];
  /*
  
  */
}
