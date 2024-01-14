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

      return (books);

    } catch (error) {
      console.error(error);
      return null
    }
  },
  getBookById: async (id) => {
    try {
      const snapshot = await booksRef.child(id).once('value')
      const book = snapshot.val()
      if (book) {
        return (book)
      }
    } catch (error) {
      console.error(error);
      return null
    }
  },
  insertBook: async (author, title) => {
    try {
      const snapshot = await booksRef.push({
        author,
        title
      })
      return snapshot.key
    } catch (error) {
      console.error(error);
      return null
    }
  },
  editBook: async (id, author, title) => {
    try {
      
      const bookRef  = booksRef.child(id);

      const book = await bookRef.once('value');

      if (!book.exists()) { 
        console.log('Book not found');
        return null
      }
      await bookRef.update({
        author,
        title
      });
      const updatedBookSnapshotAfterUpdate = await bookRef.once('value');
      const updatedBook = updatedBookSnapshotAfterUpdate.val();
      return updatedBook;
    } catch (error) {
      console.error(error);
      return null
    }
  },
  deleteBook: async (id) => {
    try {
      const bookRef = booksRef.child(id);
      const snapshot = await bookRef.once('value');
      if (!snapshot.exists()) { 
        console.log('Book not found');
        return null
      }
      await bookRef.remove();
      return({ message: 'Book deleted successfully' });
    } catch (error) {
      console.error(error);
      return null
    }
  }
}
module.exports = repositoryBooks