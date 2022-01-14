const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require('cors');
const users = require("./routes/api/users");

const app = express();

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

app.use(cors());

app.use(bodyParser.json());

const db = require("./config/keys").url;

mongoose.connect(db,{useNewUrlParser:true,useFindAndModify:false}
)
.then(() => console.log("MongoDB successfully connnected"))
.catch(err => console.log(err));

app.use(passport.initialize());

require("./config/passport")(passport);

app.use('/public', express.static('public'));




const port = process.env.PORT || 5000;

const server = app.listen(port, () => console.log('Server up and running on port' + port + '!'));

const io = require('socket.io').listen(server);

// Assign socket object to every request
app.use(function(req, res, next) {
    req.io = io;
    next();
});

app.use("/api/users", users);
