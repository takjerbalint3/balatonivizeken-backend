export enum EmailTemplateName {
  VERIFICATION = 'verification',
  USER_NEW_REGISTRATION = 'user_new_registration',
  PASSWORD_RESET = 'password_reset',
}

export class EmailTemplateTypeParams {
  name: EmailTemplateName;
  subject: string;

  constructor(name: EmailTemplateName, subject: string) {
    this.name = name;
    this.subject = subject;
  }
}
