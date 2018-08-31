import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

import * as express from 'express';
import * as cors from 'cors';

const app = express();

const validateFirebaseIdToken = (req, res, next) => {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
      res.status(403).send('Unauthorized');
      return;
    }
  
    let idToken;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      // Read the ID Token from the Authorization header.
      idToken = req.headers.authorization.split('Bearer ')[1];
    } 
    else {
      // No cookie
      res.status(403).send('Unauthorized');
      return;
    }

    admin.auth().verifyIdToken(idToken).then((decodedIdToken) => {
      req.user = decodedIdToken;
      return next();
    }).catch((error) => {
      console.error('Error while verifying Firebase ID token:', error);
      res.status(403).send('Unauthorized');
    });
  };

  app.use(cors());
  app.use(validateFirebaseIdToken);

  app.get('*', (req, res) =>{
      res.json({message:`hello, ${(<any>req).user.name}`});
  });

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
exports.app = functions.https.onRequest(app);


