import {StandardHandler} from "./StandardHandler";
import {IEmailParams} from "../Services/Email.Service";
import {APIRequestTypes} from "../Globals/globalInterfaces";
import {IIntegrationConfig} from "../../configuration/configuration";

export class SnailgunHandler extends StandardHandler {
  protected host = 'bw-interviews.herokuapp.com';
  protected path = '/snailgun/emails';
  protected method = APIRequestTypes.Post;
  protected requestId: string;
  protected checkInterval: number;

  public constructor(params: IIntegrationConfig) {
    super(params);
    this.checkInterval = params.checkInterval || 100;
  }

  async execute(params: IEmailParams) {
    const transformedParams = this.transformParams(params);
    const initializeRequest: ISnailgunResponse = await super.execute(transformedParams);
    this.requestId = initializeRequest.id;
    if (!this.requestId) {
      throw new Error ('Failed to Enqueue email with snailgun');
    }
    return this.resolveRequest()
  }

  async resolveRequest(): Promise<any> {
    return new Promise((resolve, reject) => {
      const interval = setInterval(async () => {
        const result = await this.checkStatus(this.requestId);
        const status = result.status;

        if (status === 'sent') {
          resolve(status);
          clearInterval(interval);
        }

        if (status === 'failed') {
          reject(status);
          clearInterval(interval);
        }
      }, this.checkInterval);
    });
  }

  public transformParams(params: IEmailParams): ISnailgunEmail {
    return  {
      from_email: params.from,
      from_name: params.from_name,
      to_email: params.to,
      to_name: params.to_name,
      subject: params.subject,
      body: params.body
    }
  }

  async checkStatus(requestId: string): Promise<any> {
    const options = {
      host: this.host,
      path: `${this.path}/${requestId}`,
      method: APIRequestTypes.Get,
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': this.apiKey
      }
    }
    const result = await this.executeHTTPRequest(options, {});
    return result;
  }
}

export interface ISnailgunResponse {
  id: string,
  from_email: string,
  from_name: string,
  to_email: string,
  to_name: string,
  subject: string,
  body: string,
  status: string,
  created_at: string
}

export interface ISnailgunEmail {
  from_email: string,
  from_name: string,
  to_email: string,
  to_name: string
  subject: string
  body: string
}
