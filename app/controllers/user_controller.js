import jwt from 'jwt-simple';
import config from '../config.js';
import User from '../models/user_model';

export const signin = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
};

export const signup = (req, res, next) => {
  const thisEmail = req.body.email;
  const password = req.body.password;

  if (!thisEmail || !password) {
    return res.status(422).send('You must provide email and password');
  }

  // TODO:
  // here you should do a mongo query to find if a user already exists with this email.
  // if user exists then return an error. If not, use the User model to create a new user.
  // Save the new User object
  // this is similar to how you created a Post
  // and then return a token same as you did in in signin
  User.findOne({ email: thisEmail })
  .then(response => {
    if (response === null) {
      // create User
      const user = new User();
      user.email = thisEmail;
      user.password = password;
      user.save()
      .then(result => {
        console.log('had success saving!');
        res.json({ result });
      })
      .catch(error => {
        console.log('had error saving!');
        res.json({ error });
      });
    } else {
      // error message for preexisting user
      console.log('User already exists with this email!');
      res.send('Error');
    }
  })
  .catch(error => {
    console.log('Find failed');
    res.json({ error });
  });
};

// encodes a new token for a user object
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}
