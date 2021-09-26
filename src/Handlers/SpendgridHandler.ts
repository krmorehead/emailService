import {StandardHandler} from "./StandardHandler";
import {i_email_params} from "../Services/Email.Service";
import {API_Request_Types} from "../Globals/global_interfaces";

export class SpendgridHandler extends StandardHandler{
  protected host = 'https://bw-interviews.herokuapp.com';
  protected path = '/spendgrid/send_email';
  protected method = API_Request_Types.Post;
}
