import * as variable from './variable.js';
import { bookLayout } from './bookLayoutContainer.js';
import { BooksLibrary } from './bookLibrary.js';

const libraryController = new BooksLibrary();

const displayBook = () => {
  if (JSON.parse(localStorage.getItem('booksDb')) !== null) {
    const dbBook = libraryController.bookArray;
    dbBook.forEach((book) => {
      document.querySelector('.list-display').append(bookLayout(book));
    });
  }

  document.querySelectorAll('.card-book').forEach((card, index) => {
    if (index % 2 === 1) {
      card.classList.add('alt');
    }
  });
}

const setBook = (book) => {
  if (book.author !== '' && book.title !== '') {
    libraryController.bookArray.push(book);
    localStorage.setItem('booksDb', JSON.stringify(libraryController.bookArray));
  }
  window.location.reload();
}

const deleteBook = (book) => {
  for (let i = 0; i < libraryController.bookArray.length; i += 1) {
    if (libraryController.bookArray[i].title === book.title && libraryController.bookArray[i].author === book.author) {
      libraryController.bookArray.splice(i, 1);
      localStorage.setItem('booksDb', JSON.stringify(libraryController.bookArray));
      break;
    }
  }
}

const deleteBookListener = () => {
  document.querySelectorAll('.remover').forEach((btnRem) => {
    btnRem.addEventListener('click', () => {
      const bookTitle = btnRem.previousElementSibling.querySelector('.title').innerHTML;
      const authorName = btnRem.previousElementSibling.querySelector('.autor').innerHTML;
      const bookToDel = {
        author: authorName,
        title: bookTitle,
      };
      deleteBook(bookToDel);
      btnRem.parentNode.remove();
    });
  });
}

const addBookListener = () => {
  variable.btnAdd.addEventListener('click', () => {
    const book = {
      author: variable.authorInput.value,
      title: variable.titleInput.value,
    };
    setBook(book);
    variable.authorInput.value = '';
    variable.titleInput.value = '';
  });
}

export { addBookListener, deleteBookListener, deleteBook, setBook, displayBook }
