export class CreateEmailInput {
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
