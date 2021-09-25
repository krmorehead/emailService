import {global_configuration, i_integration_config} from "../../configuration/configuration";

export class IntegrationFactory {
  public static getIntegrations(type: string): i_integration_config[] {
    return global_configuration.integrations[type];
  }
}
