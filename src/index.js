var express = require("express");
var app = express();
var port = 8080;
var bodyParser = require('body-parser');
app.use(bodyParser());
app.post("/email", async(req, any, res, any), {
    const: body, i_email_params:  = req.body,
    const: result = await, EmailController: .sendEmail(body),
    res: .send(result)
});
// start the Express server
app.listen(port, function () {
    console.log("server started at http://localhost:" + port);
});
