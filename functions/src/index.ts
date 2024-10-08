/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// import {onRequest} from "firebase-functions/v2/https";
// import * as logger from "firebase-functions/logger";


const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.assignUserRole = functions.auth.user().onCreate((user:any) => {
  // Asigna un rol por defecto al nuevo usuario, por ejemplo, 'viewer'
  return admin.auth().setCustomUserClaims(user.uid, { role: 'viewer' });
});


// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
