import passport from 'passport';
import GithubStrategy from 'passport-github2';
import userModel from '../daos/mongodb/models/Users.models.js';

const initializePassport = () => {
    passport.use(
        'github', 
        new GithubStrategy({
          clientID: 'Iv1.a11aada5b2fc7e6a', 
          clienteSecret: '0e5441987d32cec42e3e0670516bba6975c39259',
          callbackURL: 'http://localhost:8080/api/session/githubcallback'
    }, async (accessToken, refreshToken, profile, done) => {
        let user = await userModel.fingOne({email: profile._json.email});
        if (!user) {
            let newUser = {
                first_name:profile.username,
                last_name:'test lastname' ,
                email:profile.profileUrl,
                age: 25,
                password: '1234'
            }
            const result = await userModel.create(newUser);
            done(null, result);
        } else {
            done(null,false)
        }
      }
    )
  );
  passport.serializeUser((user,done)=> {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await userModel.findById(id);
    done(null, user);
  });
};

export { initializePassport };