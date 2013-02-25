var express = require('express');
var request = require('request');

var stripeApiKey = process.env.stripeSecret;
var stripe = require('stripe')(stripeApiKey);

app = express.createServer();

app.use("/", express.static(__dirname+ '/public') );

app.use("/letter", function(req, res){
  var options = {
    url: "https://www.geteasypost.com/api/postage/rates",
    auth: {username: "cueqNZUb3ldeWTNX7MU3Mel8UXtaAMUi", password: ""},
    method: "POST",
    form:{"to[zip]":req.query["toZip"],
          "from[zip]":req.query["fromZip"],
          "parcel[predefined_package]": "Letter",
          "parcel[weight]":1.0}

  }
  request(options, function (error, response, body) {
    //console.log("Response:", response);
    console.log("Body:", body);
    res.send(body);
  });
  
});
  
app.use("/pay", function(req, res) {
  console.log(req.query);
  stripe.charges.create({
    card : req.query["stripeToken"],
    amount : req.query["amount"], 
    currency : "usd",
    description : "snailitExample"
  }, function (err, customer) {
    if (err) {
      console.log("Error MEssage HEre");
      var msg = customer.error.message || "unknown";
      res.send("Error while processing your payment: " + msg);
    }
    else {
      var id = customer.id;
      console.log('Success! Customer with Stripe ID ' + id + ' just signed up!');
      // save this customer to your database here!
      res.send('ok');
    }
  });
});

app.listen(process.env.PORT);

console.log("Listening on port: ", process.env.PORT)