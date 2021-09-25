const express = require( "express" );
const app = express();
const port = 8080;
const bodyParser = require('body-parser');
import { i_email_params } from "./Services/Email.Service";
import {EmailController} from "./Controllers/EmailController";

app.use(bodyParser());

app.post( "/email", async( req: any, res: any ) => {
  const body: i_email_params = req.body;
  try {
    await EmailController.sendEmail(body);
    res.send('email successfully sent');
  } catch(e) {
    console.log(e);
    res.send(JSON.stringify(e));
  }
} );

// start the Express server
app.listen( port, () => {
  console.log( `server started at http://localhost:${ port }` );
} );
