import passport  from "passport";

export default function (app) {
app.get('/auth/google',passport.authenticate('google',{
  scope : ['profile' , 'email']
})
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.send('✅ Google login success');
  }
);

app.get('/api/logout' , (req,res,next) =>{
     req.logout(function (err){
      if (err) {return next(err);}
      res.send('Logged out successfully ');
     });

});


app.get('/api/current_user' , (req,res) =>{
  res.send(req.user);
});


}