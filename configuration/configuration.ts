import {API_Request_Types} from "../src/Globals/global_interfaces";

export const global_configuration: i_global_config = {
  integrations: {
    email: [{
      slug: 'spendgrid',
      type: API_Request_Types.Post,
      api_ref: 'spendgrid_api_key'
    },
    {
      slug: 'snailgun',
      type: API_Request_Types.Post,
      api_ref: 'snailgun_api_key'
    }]
 }
}

export interface i_global_config {
  integrations: i_integration_map
};

export interface i_integration_map {
  [slug: string]: i_integration_config[]
}

export interface i_integration_config {
  slug: string,
  type: API_Request_Types,
  api_ref: string
}
