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
        div.classList.add('card-book');
        
        const divDescr = document.createElement('div');
        divDescr.classList.add('bookDescription');   
        
        const authorName = document.createElement('h2');
        authorName.textContent = book.author;
        authorName.classList.add('autor');
        const bookTitle = document.createElement('h3');
        bookTitle.classList.add('title')
        bookTitle.textContent = book.title;
        const span = document.createElement('span');
        span.classList.add('spanSpace')
        span.textContent='By';
        divDescr.append(bookTitle,span,authorName)
        const button = document.createElement('button');
        button.classList.add('remove-button');
        button.textContent = "remove";
        button.classList.add('remover');
        const hr = document.createElement('hr');
        div.append(divDescr, button, hr);
        return div;
    }

    displayBook() {
        if (JSON.parse(localStorage.getItem('booksDb')) !== null) {
            const dbBook = JSON.parse(localStorage.getItem('booksDb'));
            dbBook.forEach((book) => {
                document.querySelector(".list-display").append(this.#libraryLayout(book));
            });
        }
        
document.querySelectorAll('.card-book').forEach((card,index) => {
    if(index%2==1){
        card.classList.add('alt');
    }
});
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
                break;
            }
        }
        // this.displayBook();
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
    const book = new Book(authorInput.value, titleInput.value);
    libraryController.setBook(book);
});

libraryController.displayBook();



setInterval(() => {
    $date.textContent = libraryController.showDate();
  }, 1000);
  

document.querySelectorAll('.remover').forEach((btnRem) => {
    btnRem.addEventListener('click', () => {        
        const  bookTitle=btnRem.previousElementSibling.querySelector('.title').innerHTML;
        const  authorName =btnRem.previousElementSibling.querySelector('.autor').innerHTML;
        const book = new Book(authorName, bookTitle);
        console.log(book);
        libraryController.deleteBook(book);
        btnRem.parentNode.remove();
    });
});

$addLink.addEventListener('click', () => {
    document.querySelector('.list-display').classList.add('hide');
    document.querySelector('.form').classList.remove('hide');
    document.querySelector('.section-contact-info').classList.add('hide');
    $h1.textContent = 'Add a new book';
    $addLink.style.color = 'blue';
    $listLink.style.color = 'black';
    $contactLink.style.color = 'black';
  });
  
  $listLink.addEventListener('click', () => {
    document.querySelector('.list-display').classList.remove('hide');
    document.querySelector('.form').classList.add('hide');
    document.querySelector('.section-contact-info').classList.add('hide');
    $h1.textContent = 'All awesome books';
    $listLink.style.color = 'blue';
    $addLink.style.color = 'black';
    $contactLink.style.color = 'black';
  });
  
  $contactLink.addEventListener('click', () => {
    document.querySelector('.list-display').classList.add('hide');
    document.querySelector('.form').classList.add('hide');
    document.querySelector('.section-contact-info').classList.remove('hide');
    $h1.textContent = 'Contact information';
    $contactLink.style.color = 'blue';
    $addLink.style.color = 'black';
    $listLink.style.color = 'black';
  });
  
 