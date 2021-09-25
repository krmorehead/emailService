import {email_regex} from "../Globals/global_constants";
import {Helpers} from "../Globals/Helpers";

export class EmailService {
  protected static postParamsType: any = {
     to: 'email',
     to_name: 'string',
     from: 'email',
     from_name: 'string',
     subject: 'string',
     body: 'html',
  }

  public static validatePostParams(params: i_email_params) {
    Object.keys(EmailService.postParamsType).forEach( (paramKey: string) => {
      // @ts-ignore
      const value: string = params[paramKey];
      if (!value) {
        throw new Error(`${paramKey} is a required parameter`);
      }

      switch (EmailService.postParamsType[paramKey] as string) {
        case 'email':
          if (!email_regex.test(value)) {
            throw new Error(`${paramKey}: value of ${value} is not a valid email`)
          }
          break;
        case 'string':
          if (typeof value !== 'string') {
            throw new Error(`${paramKey}: value of ${value} is not a valid string`)
          }
          break;
        case 'html':
          try {
            Helpers.extractInnerContentFromHTMLString(value)
          } catch (e) {
            throw new Error(`${paramKey}: value of ${value} is not a valid html document`)
          }
          // TODO validate HTML
          break;
        default:
          throw new Error(`Params of type ${EmailService.postParamsType[paramKey]} is not supported`);
      }
    })
  }

  public static proccessPostParams(params: i_email_params) {}
}

export interface i_email_params {
  to: string,
  to_name: string,
  from: string,
  from_name: string,
  subject: string,
  body: string
}
