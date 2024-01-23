const admin = require('firebase-admin')
const serviceAccount = require('./books-store-cf637-firebase-adminsdk-tt2hn-b7c28b3c9e.json');
const { getStorage } = require('firebase-admin/storage');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:'https://books-store-cf637-default-rtdb.firebaseio.com/',
  projectId: 'books-store-cf637',
  storageBucket: 'gs://books-store-cf637.appspot.com'
})
const storage = admin.storage();
const bucket = getStorage().bucket();
const firestore = admin.firestore();
const auth=admin.auth()
module.exports = {firestore, bucket, storage, auth}