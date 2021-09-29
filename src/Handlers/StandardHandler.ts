import {IIntegrationConfig} from "../../configuration/configuration";
import * as https from 'https';
import {APIRequestTypes} from "../Globals/globalInterfaces";

export class StandardHandler {
  protected params: IIntegrationConfig;
  protected host: string;
  protected path: string = '/';
  protected method: APIRequestTypes;

  constructor(params: IIntegrationConfig) {
    this.params = params;
  }

  async execute(params: any): Promise<any> {
    let data = '';
    if (params) {
      data = JSON.stringify(params);
    }
    const options = {
      host: this.host,
      path: this.path,
      method: this.method,
      body: data,
      headers: {
        'Content-Type': 'application/json',
        'Content-length': data.length,
        'X-Api-Key': this.apiKey
      }
    }
    const response = await this.executeHTTPRequest(options, params);
    return response;
  }

  get apiKey(): string {
    // @ts-ignore
    return process.env[this.params.apiRef];
  }

  protected async executeHTTPRequest(options: any, params: any): Promise<any> {
    return new Promise ((resolve, reject) => {
      const data = JSON.stringify(params)

      const req = https.request(options, res => {
        let body: any = [];

        res.on('data', d => {
          body.push(d)
        })

        res.on('error',(e) => {
          reject(e);
        })

        res.on('end',() => {
          try {
            body = JSON.parse(Buffer.concat(body).toString());
          } catch(e) {
            reject(e);
          }
          resolve(body);
        })
      })
      // req.on('error', reject)
      req.write(data)
      req.end()
    });
  }
}
