const admin = require('../../database');

repositoryBooks = {
    getAllBooks: async () => {
        try {

            //const userRef = await admin.firestore().collection('books').add({ titulo: "Mi libro"});
            const snapshot = await admin.database().ref('/books').once('value')
            // Convert the snapshot to an array of books
            const books = [];
            snapshot.forEach((childSnapshot) => {
              const book = childSnapshot.val();
              book.id = childSnapshot.key;
              books.push(book);
            });
        
            return(books);
        
          } catch (error) {
            console.error(error);
            return null
          }
    }
}
module.exports = repositoryBooks