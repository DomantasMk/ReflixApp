var admin = require("firebase-admin");

var serviceAccount = require("../config/reflix-3111f-firebase-adminsdk-c84xo-f624ea936d.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://reflix-3111f.firebaseio.com",
});

module.exports = { admin };
