import { PartialType } from '@nestjs/mapped-types';
import { CreateEmailInput } from './create-email-input';

export class UpdateEmailInput extends PartialType(CreateEmailInput) {
  id: string;

  incoming_mail: string;

  outgoing_mail: string;

  s_imap_port: number;

  s_pop3_port: number;

  s_smtp_port: number;

  n_imap_port: number;

  n_pop3_port: number;

  n_smtp_port: number;

  webmail_url: string;

  body: string;

  subject: string;

  receiver: string;
}
