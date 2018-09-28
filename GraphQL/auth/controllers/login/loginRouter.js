const router = require('express').Router();
const passport = require('passport');

//AUTH Login
router.get('/login/google',passport.authenticate('google',{
    scope: ['profile']
}));

router.get('/login/google/redirect', 
  passport.authenticate('google', { failureRedirect: '/login/error' }),(req, res)=> {
    try{
      console.log('success');
      res.redirect('/auth/profile')
    }catch(err){
      console.log(err);
    }
  });

router.get('/profile',(req,res)=>{
  if(req.user){
    res.json(req.user);
    res.send('you are logged in');
  }else{
    res.send("you are not logged in");
  }
})

router.get('/login/error',(req,res)=>{
  res.send('error');
})

router.get('/logout',(req,res)=>{
  req.logout();
  res.send('logeout');
})




module.exports = router;