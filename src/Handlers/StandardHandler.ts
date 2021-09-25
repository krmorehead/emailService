import {i_email_params} from "../Services/Email.Service";
import {i_integration_config} from "../../configuration/configuration";
import {secrets} from "../../secrets";

export class StandardHandler {
  protected params: i_integration_config;
  constructor(params: i_integration_config) {
    this.params = params;
  }

  async execute(params: i_email_params): Promise<void> {
    console.log(this.apiKey);
  }

  get apiKey(): string {
    // @ts-ignore
    return secrets[this.params.api_ref];
  }
}
