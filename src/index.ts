import {EmailService} from "./Services/Email.Service";

const express = require( "express" );
const app = express();
const port = 8080;
const bodyParser = require('body-parser');

app.use(bodyParser());

app.post( "/email", ( req: any, res: any ) => {
  const body = req.body;
  EmailService.validatePostParams(body);
  res.send( "Hello world!" );
} );

// start the Express server
app.listen( port, () => {
  console.log( `server started at http://localhost:${ port }` );
} );
