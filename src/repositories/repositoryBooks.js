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
  getAllBooksOfUser: async (userId) => {
    try {
      const snapshot = await booksCollection.where('userId', '==', userId).get();

      const books = [];
      snapshot.forEach((childSnapshot) => {
        const book = childSnapshot.data(); 
        book.id = childSnapshot.id; 
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
  insertBook: async (author, title, userId) => {
    try {
      const newBook = await booksCollection.add({
        author,
        title,
        userId
      })
      return newBook.id
    } catch (error) {
      console.error(error);
      return null
    }
  },
  editBook: async (id, author, title) => {
    try {
      
      const bookRef  = booksCollection.doc(id);

      const bookDoc  = await bookRef.get();

      if (!bookDoc.exists) { 
        console.log('Book not found');
        return null
      }
      await bookRef.update({
        author,
        title
      });
      const updatedBookDoc = await bookRef.get();
      const updatedBook = updatedBookDoc.data();
  
      return updatedBook;
    } catch (error) {
      console.error(error);
      return null
    }
  },
  deleteBook: async (id) => {
    try {
      const bookRef = booksCollection.doc(id);
      const bookDoc  = await bookRef.get();
      if (!bookDoc.exists) { 
        console.log('Book not found');
        return null
      }
      await bookRef.delete();
      return({ message: 'Book deleted successfully' });
    } catch (error) {
      console.error(error);
      return null
    }
  }
}
module.exports = repositoryBooks