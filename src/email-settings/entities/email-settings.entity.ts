import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class EmailSetting {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, unique: true })
  incoming_mail: string;

  @Column({ nullable: true, unique: true })
  outgoing_mail: string;

  @Column({ nullable: true, unique: true })
  s_imap_port: number;

  @Column({ nullable: true, unique: true })
  s_pop3_port: number;

  @Column({ nullable: true, unique: true })
  n_imap_port: number;

  @Column({ nullable: true, unique: true })
  n_pop3_port: number;

  @Column({ nullable: true, unique: true })
  n_smtp_port: number;

  @Column({ nullable: true, unique: true })
  webmail_url: string;

  @Column({ nullable: true, unique: true })
  subject: string;

  @Column({ nullable: true, unique: true })
  body: string;
}
