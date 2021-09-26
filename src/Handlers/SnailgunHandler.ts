import {StandardHandler} from "./StandardHandler";
import {i_email_params} from "../Services/Email.Service";
import {API_Request_Types} from "../Globals/global_interfaces";
import http from "http";
import {i_integration_config} from "../../configuration/configuration";

export class SnailgunHandler extends StandardHandler{
  protected host = 'https://bw-interviews.herokuapp.com';
  protected path = '/snailgun/emails';
  protected method = API_Request_Types.Post;
  protected requestId: string;
  protected checkInterval: number;

  public constructor(params: i_integration_config) {
    super(params);
    this.checkInterval = params.checkInterval || 100;
  }

  async execute(params: i_email_params) {
    const initializeRequest: i_snailgun_response = await super.execute(params);
    console.log(initializeRequest)
    this.requestId = initializeRequest.id;
    if (!this.requestId) {
      throw new Error ('Failed to Enqueue email with snailgun');
    }
    return this.resolveRequest()
  }

  async resolveRequest(): Promise<any> {
    return new Promise((resolve, reject) => {
      const interval = setInterval(async () => {
        const status = await (this.checkStatus.bind(this.requestId)).status;
        console.log(`checking, ${status}`)

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

  async checkStatus(requestId: string): Promise<any> {
    const options = {
      // TODO - overloading host, not intedned use
      host: `https://bw-interviews.herokuapp.com/snailgun/emails/${requestId}`,
      method: API_Request_Types.Get,
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': this.apiKey
      }
    }
    return this.executeHTTPRequest(options);
  }
}

export interface i_snailgun_response {
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
