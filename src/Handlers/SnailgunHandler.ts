import {StandardHandler} from "./StandardHandler";
import {i_email_params} from "../Services/Email.Service";

export class SnailgunHandler extends StandardHandler{
  async execute(params: i_email_params) {
    return super.execute(params);
  }
}
