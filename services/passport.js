import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import keys from '../config/keys.js';
import mongoose from 'mongoose';
import passport from "passport";

const User = mongoose.model('users'); 

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
    User.findById(id)
    .then(user => {
      done(null,user);
    });
});

passport.use(new GoogleStrategy({
     clientID : keys.googleClientID,
     clientSecret : keys.googleClientSecret,
     callbackURL : 'http://localhost:5000/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({googleID : profile.id})
  .then((existingUser) => {
    if(existingUser)
    {
       return done(null, existingUser);
    }
    else{
      new User({googleID : profile.id }).save()
      .then(user => done(null,user));
    }
  })
 

 
})
);


 