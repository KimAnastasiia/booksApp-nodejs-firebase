const admin = require('firebase-admin')
const serviceAccount = require('./books-store-dc964-firebase-adminsdk-c6r98-b08f5da542.json');
const { getStorage } = require('firebase-admin/storage');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:'https://books-store-dc964-default-rtdb.firebaseio.com/',
  projectId: 'books-store-dc964',
  storageBucket: 'gs://books-store-dc964.appspot.com'
})
const storage = admin.storage();
const bucket = getStorage().bucket();
const firestore = admin.firestore();
module.exports = {firestore, bucket, storage}