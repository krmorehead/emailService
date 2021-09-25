const express = require( "express" );
const app = express();
const port = 8080;
const bodyParser = require('body-parser');
import { i_email_params } from "./Services/Email.Service";
import {EmailController} from "./Controllers/EmailController";

app.use(bodyParser());

app.post( "/email", async( req: any, res: any ) => {
  const body: i_email_params = req.body;
  const result = await EmailController.sendEmail(body);
  res.send(JSON.stringify(result));
} );

// start the Express server
app.listen( port, () => {
  console.log( `server started at http://localhost:${ port }` );
} );
