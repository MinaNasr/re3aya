const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys");
const User = require('../../models/user-model');



passport.serializeUser((user,done)=>{
    done(null,user.id);
})

passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
        done(null,user);
    })
})

passport.use(
    new GoogleStrategy({
        clientID:keys.google.clientID,
        clientSecret:keys.google.clientSecret,
        callbackURL:'http://localhost:9000/auth/login/google/redirect',
        profileFields: ['id', 'displayName', 'photos', 'email']
        
    },
    (accessToken,refreshToken,profile,done) => {
        console.log('passport callback fired');
       User.findOne({googleId: profile.id}).then((currentUser)=>{
            if(currentUser){
                console.log('user already exist'); 
                done(null,currentUser);
            }else{     
                new User({
                    username: profile.displayName,
                    googleId: profile.id,
                    gender: profile.gender,
                    image: profile._json.image.url
                }).save().then((newuser)=>{
                    console.log('user: ' + profile.displayName + ' saved to database');
                    done(null,newuser);
                });
            }
       })
       
    })
)