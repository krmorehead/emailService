import {IIntegrationConfig} from "../../configuration/configuration";
import {SpendgridHandler} from "../Handlers/SpendgridHandler";
import {SnailgunHandler} from "../Handlers/SnailgunHandler";

export class EmailIntegrationFactory {
  public static getIntegrationHandler(config: IIntegrationConfig) {
    const integration = config.slug;
    switch (integration) {
      case 'spendgrid':
        return new SpendgridHandler(config);
      case 'snailgun':
        return new SnailgunHandler(config);
      default:
        throw new Error(`${config.slug} is not a supported email integration type`);
    }
  }
}
