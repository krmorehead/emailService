import {StandardHandler} from "./StandardHandler";
import {IEmailParams} from "../Services/Email.Service";
import {APIRequestTypes} from "../Globals/globalInterfaces";

export class SpendgridHandler extends StandardHandler{
  protected host = 'bw-interviews.herokuapp.com';
  protected path = '/spendgrid/send_email';
  protected method = APIRequestTypes.Post;

  public async execute(params: IEmailParams): Promise<any> {
    const transformedParams = this.transformParams(params)
    return super.execute(transformedParams);
  }

  public transformParams(params: IEmailParams): ISpendgridEmail {
    return {
      sender: `${params.from_name} <${params.from}>`,
      recipient: `${params.to_name} <${params.to}>`,
      subject: params.subject,
      body: params.body
    }
  }
}

export interface ISpendgridEmail {
  sender: string,
  recipient: string,
  subject: string,
  body: string
}
