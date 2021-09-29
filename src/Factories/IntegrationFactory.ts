import {globalConfiguration, IIntegrationConfig} from "../../configuration/configuration";

export class IntegrationFactory {
  public static getIntegrations(type: string): IIntegrationConfig[] {
    return globalConfiguration.integrations[type];
  }
}
