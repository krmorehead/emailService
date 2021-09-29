import {emailRegex} from "../Globals/globalConstants";
import {Helpers} from "../Globals/Helpers";
import {IIntegrationConfig} from "../../configuration/configuration";
import {EmailIntegrationFactory} from "../Factories/EmailIntegrationFactory";

export class EmailService {
  protected static postParamsType: any = {
     to: 'email',
     to_name: 'string',
     from: 'email',
     from_name: 'string',
     subject: 'string',
     body: 'html',
  }

  public static validatePostParams(params: IEmailParams) {
    Object.keys(EmailService.postParamsType).forEach( (paramKey: string) => {
      // @ts-ignore
      const value: string = params[paramKey];
      if (!value) {
        throw new Error(`${paramKey} is a required parameter`);
      }

      switch (EmailService.postParamsType[paramKey] as string) {
        case 'email':
          if (!emailRegex.test(value)) {
            throw new Error(`${paramKey}: value of ${value} is not a valid email`)
          }
          return;
        case 'string':
          if (typeof value !== 'string') {
            throw new Error(`${paramKey}: value of ${value} is not a valid string`)
          }
          return;
        case 'html':
          // Note - not good type checking - more advance methods required in the future.
          if (typeof value !== 'string') {
            throw new Error(`${paramKey}: value of ${value} is not a valid html document`)
          }
          // TODO validate HTML
          return;
        default:
          throw new Error(`Params of type ${EmailService.postParamsType[paramKey]} is not supported`);
      }
    })
  }

  public static processPostParams(params: IEmailParams): IEmailParams {
    // Note cloning can be a performance sink if we run into issues then evaluate option of side effects
    const paramClones = { ...params };
    paramClones.body = Helpers.extractInnerContentFromHTMLString(params.body);
    return paramClones;
  }

  public static async executePostRequest(params: IEmailParams, integrations: IIntegrationConfig[]) {
    for (var i = 0; i < integrations.length; i++) {
      const config = integrations[i];
      const integration = EmailIntegrationFactory.getIntegrationHandler(config);
      try {
        await integration.execute(params);
        break;
      } catch (e) {
        if (integrations.length - 1 === i) {
          throw e;
        }
        console.warn(`${config.slug} integration failed with ${e}. Falling back on next email integration`)
      }
    }
  }
}

export interface IEmailParams {
  to: string,
  to_name: string,
  from: string,
  from_name: string,
  subject: string,
  body: string
}
