import {expressjwt as jwt} from "express-jwt";
import jwks from 'jwks-rsa';
import dotenv from "dotenv";

dotenv.config();

import {auth, requiredScopes } from 'express-oauth2-jwt-bearer';

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
export const authCheck = auth({
  audience: 'This is a unique identifier',
  issuerBaseURL: `https://dev-80n1i28isf7wne1s.us.auth0.com/`,
});

export const checkScopes = requiredScopes('update:price');

//  export const authCheck = jwt({
//   secret: jwks.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: process.env.JWKURI,
//   }),
//   audience: process.env.AUDIENCE,
//   issuer: process.env.ISSUER,
//   algorithms: ['RS256'],
  
// });



