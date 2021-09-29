import {APIRequestTypes} from "../src/Globals/globalInterfaces";

export const globalConfiguration: IGlobalConfig = {
  integrations: {
    email: [
      {
        slug: 'spendgrid',
        type: APIRequestTypes.Post,
        apiRef: 'spendgridApiKey'
      },
      {
        slug: 'snailgun',
        type: APIRequestTypes.Post,
        apiRef: 'snailgunApiKey'
      }]
 }
}

export interface IGlobalConfig {
  integrations: IIntegrationMap
};

export interface IIntegrationMap {
  [slug: string]: IIntegrationConfig[]
}

export interface IIntegrationConfig {
  slug: string,
  type: APIRequestTypes,
  apiRef: string,
  checkInterval?: number
}
