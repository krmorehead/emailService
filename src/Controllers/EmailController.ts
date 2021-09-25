import {EmailService, i_email_params} from "../Services/Email.Service";

export class EmailController {
  public static async sendEmail(email: i_email_params) {
    EmailService.validatePostParams(email);
    const processedEmail = EmailService.processPostParams(email);
    return processedEmail;
  }
}
