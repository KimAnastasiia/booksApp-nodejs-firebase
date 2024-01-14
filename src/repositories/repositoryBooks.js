const { firestore } = require('../../database');
const booksCollection = firestore.collection('/books');
repositoryBooks = {

  getAllBooks: async () => {
    try {
      const snapshot = await booksCollection.get()
      // Convert the snapshot to an array of books
      const books = [];
      snapshot.forEach((childSnapshot) => {
        const book = childSnapshot.data(); // Use data() to get the document data
        book.id = childSnapshot.id; // Use id to get the document ID
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
      const bookDoc  = await booksCollection.doc(id).get('value')
      if (bookDoc.exists) {
        const book = bookDoc.data();
        return book;
      } else {
        console.log('Book not found');
        return null;
      }
    } catch (error) {
      console.error(error);
      return null
    }
  },
  insertBook: async (author, title) => {
    try {
      const snapshot = await booksCollection.push({
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
      
      const bookRef  = booksCollection.child(id);

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
      const bookRef = booksCollection.child(id);
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