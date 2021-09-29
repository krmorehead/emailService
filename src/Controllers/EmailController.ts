import {EmailService, IEmailParams} from "../Services/Email.Service";
import {IntegrationFactory} from "../Factories/IntegrationFactory";

export class EmailController {
  public static async sendEmail(email: IEmailParams) {
    EmailService.validatePostParams(email);
    const processedEmail = EmailService.processPostParams(email);
    const integrations = IntegrationFactory.getIntegrations('email')
    await EmailService.executePostRequest(processedEmail, integrations);
  }
}
