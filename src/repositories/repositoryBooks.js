const admin = require('../../database');
const booksRef = admin.database().ref('/books');
repositoryBooks = {
    getAllBooks: async () => {
        try {

            //const userRef = await admin.firestore().collection('books').add({ titulo: "Mi libro"});
            const snapshot = await booksRef.once('value')
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
    },
    getBookById: async (id) => {
      try {
          const snapshot  = await booksRef.child(id).once('value')
          const book  = snapshot.val()
          if (book) {
            return(book)
          }
        } catch (error) {
          console.error(error);
          return null
        }
  }
}
module.exports = repositoryBooks