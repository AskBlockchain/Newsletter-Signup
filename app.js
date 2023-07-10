const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



app.get('/', function(req, res) {
  res.sendFile(__dirname + "/signup.html");

  app.post('/', function(req, res) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const https = require('https');


    const data = {
      members: [
        {
          email_address: email,
          status: "subscribed",
          merge_fields: {
            FNAME: firstName,
            LNAME: lastName
          }
        }
      ]
    };

    const jsonData = JSON.stringify(data);
    const url = "https://us9.api.mailchimp.com/3.0/lists/ba3364f02f";
    const options = {
      method: "POST",
      auth: "justkaz:52ad73bb0a7c8b31e6d3b3ef0cc0ece3"
    }

    const request = https.request(url, options, function(response) {
      response.on("data", function(data) {
        const statusCode = response.statusCode;
        if(statusCode === 200){
          res.sendFile(__dirname + "/success.html");
        }
        else {res.sendFile(__dirname + "/failure.html");}
        console.log(statusCode);
      })
    })

    request.write(jsonData);
    request.end();


    console.log(firstName, lastName, email);
  })

})

app.post("/success", function(req, res) {
  res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Server running on port 3000")
});


//apiKey "52ad73bb0a7c8b31e6d3b3ef0cc0ece3-us9"
//audiance list ID "ba3364f02f"

