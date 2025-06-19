import express from "express";
import session from "express-session";
import passport from "passport";
import mongoose from "mongoose";
import "./models/user.js";
import keys from "./config/keys.js";
import "./services/passport.js";

import authroutes from "./routes/authroutes.js";
const app = express();



mongoose.connect(keys.mongoURI);


app.use(session({
  secret: keys.cookieKey,
  resave: false,
  saveUninitialized: false,
     cookieSession :{
    maxAge : 30 * 24  * 60 * 60 * 1000,
    keys:[keys.cookieKey]
   }
}));

app.use(passport.initialize());
app.use(passport.session());

authroutes(app);


const PORT = process.env.PORT||5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});