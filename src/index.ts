import * as fs from "fs";

const express = require( "express" );
const app = express();
const bodyParser = require('body-parser');
import { IEmailParams } from "./Services/Email.Service";
import { EmailController } from "./Controllers/EmailController";
import { InitializeEnv } from "./Globals/initializeEnv";

InitializeEnv.initializeEnv('.env.json') // TODO - dot-env is preferred

const port = process.env.port || 8080;
app.use(bodyParser());

app.post( "/email", async( req: any, res: any ) => {
  const body: IEmailParams = req.body;
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
