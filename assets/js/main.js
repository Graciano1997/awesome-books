const btnAdd = document.querySelector('#add');
const authorInput = document.querySelector('#authorBook');
const titleInput = document.querySelector('#titleBook');
const $listLink = document.querySelector('#list');
const $contactLink = document.querySelector('#contact');
const $addLink = document.querySelector('#add-new');
const $h1 = document.querySelector('#h1');
const $date = document.getElementById('date');

class BooksLibrary {
    bookArray = (JSON.parse(localStorage.getItem('booksDb'))!==null)?(JSON.parse(localStorage.getItem('booksDb'))):([]);
    
    #libraryLayout(book) {
        const div = document.createElement('div');
        const authorName = document.createElement('h2');
        authorName.textContent = book.author;
        const bookTitle = document.createElement('h3');
        bookTitle.textContent = book.title;
        const button = document.createElement('button');
        button.textContent = "remove";
        button.classList.add('remover');
        const hr = document.createElement('hr');
        div.append(authorName, bookTitle, button, hr);
        return div;
    }

    displayBook() {
        if (JSON.parse(localStorage.getItem('booksDb')) !== null) {
            const dbBook = JSON.parse(localStorage.getItem('booksDb'));
            dbBook.forEach((book) => {
                document.querySelector(".list").append(this.#libraryLayout(book));
            });
        }
    }

    setBook(book) {
        if (book.author !== '' && book.title !== '') {
            this.bookArray.push(book);
            localStorage.setItem('booksDb', JSON.stringify(this.bookArray));
            location.reload();
        }
    }


    deleteBook(book) {

        for (let i = 0; i < this.bookArray.length; i += 1) {
            if (this.bookArray[i].title === book.title && this.bookArray[i].author === book.author) {
                this.bookArray.splice(i, 1);
                localStorage.setItem('booksDb', JSON.stringify(this.bookArray));
            }
        }
    }

    showDate() {
        const date = new Date();
        const options = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: true,
        };
        this.date = date.toLocaleString('en-US', options);
        return this.date;
      }
}


class Book {
    constructor(author, title) {
        this.author = author;
        this.title = title;
    }
}

const libraryController = new BooksLibrary();


btnAdd.addEventListener('click', () => {
     e.preventDefault();
    const book = new Book(authorInput.value, titleInput.value);
    libraryController.setBook(book);
});



libraryController.displayBook();
setInterval(() => {
    $date.textContent = libraryController.showDate();
  }, 1000);
  

document.querySelectorAll('.remover').forEach((btnRem) => {
    btnRem.addEventListener('click', () => {
        const authorName = btnRem.previousElementSibling.previousElementSibling.innerHTML;
        const bookTitle = btnRem.previousElementSibling.innerHTML;
        const book = new Book(authorName, bookTitle);
        libraryController.deleteBook(book);
        btnRem.parentNode.remove();
    });
});

$addLink.addEventListener('click', () => {
    document.querySelector('.div-remove').classList.add('hide');
    document.querySelector('.form').classList.remove('hide');
    document.querySelector('.section-contact-info').classList.add('hide');
    $h1.textContent = 'Add a new book';
    $addLink.style.color = 'blue';
    $listLink.style.color = 'black';
    $contactLink.style.color = 'black';
  });
  
  $listLink.addEventListener('click', () => {
    document.querySelector('.div-remove').classList.remove('hide');
    document.querySelector('.form').classList.add('hide');
    document.querySelector('.section-contact-info').classList.add('hide');
    $h1.textContent = 'All awesome books';
    $listLink.style.color = 'blue';
    $addLink.style.color = 'black';
    $contactLink.style.color = 'black';
  });
  
  $contactLink.addEventListener('click', () => {
    document.querySelector('.div-remove').classList.add('hide');
    document.querySelector('.form').classList.add('hide');
    document.querySelector('.section-contact-info').classList.remove('hide');
    $h1.textContent = 'Contact information';
    $contactLink.style.color = 'blue';
    $addLink.style.color = 'black';
    $listLink.style.color = 'black';
  });
  
 