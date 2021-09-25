import {i_email_params} from "../Services/Email.Service";
import {i_integration_config} from "../../configuration/configuration";
import {secrets} from "../../secrets";
import * as http from 'http';
import {API_Request_Types} from "../Globals/global_interfaces";

export class StandardHandler {
  protected params: i_integration_config;
  protected host: string;
  protected path: string = '/';
  protected method: API_Request_Types;

  constructor(params: i_integration_config) {
    this.params = params;
  }

  async execute(params: i_email_params): Promise<void> {
    const options = {
      host: this.host,
      path: this.path,
      method: this.method,
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': this.apiKey
      }
    }
    await http.request(options);
  }

  get apiKey(): string {
    // @ts-ignore
    return secrets[this.params.api_ref];
  }
}
