import {EmailService, i_email_params} from "../Services/Email.Service";
import {IntegrationFactory} from "../Factories/IntegrationFactory";

export class EmailController {
  public static async sendEmail(email: i_email_params) {
    EmailService.validatePostParams(email);
    const processedEmail = EmailService.processPostParams(email);
    const integrations = IntegrationFactory.getIntegrations('email')
    await EmailService.executePostRequest(processedEmail, integrations);
  }
}
