import {expressjwt as jwt} from "express-jwt";
import jwks from 'jwks-rsa';
import dotenv from "dotenv";
dotenv.config();

 export const authCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: process.env.JWKURI,
  }),
  audience: process.env.AUDIENCE,
  issuer: process.env.ISSUER,
  algorithms: ['RS256'],
});



