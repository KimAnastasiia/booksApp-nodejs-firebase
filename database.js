const admin = require('firebase-admin')
const serviceAccount = require('./books-store-dc964-firebase-adminsdk-c6r98-b08f5da542.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:'https://books-store-dc964-default-rtdb.firebaseio.com/',
  projectId: 'books-store-dc964',
})
const firestore = admin.firestore();
module.exports = {firestore}