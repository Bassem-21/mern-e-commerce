import jwt from 'jsonwebtoken';


export default function signToken  (user) {
  let token = jwt.sign({ ...user.toObject(), password: '' }, process.env.TOKEN_KEY );

  return token;
}



