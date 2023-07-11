const authorInput = document.querySelector('#authorBook');
const titleInput = document.querySelector('#titleBook');
const btnAdd = document.querySelector('.btnAdd');
let bookArray;
if (JSON.parse(localStorage.getItem('booksDb')) !== null) {
    bookArray = JSON.parse(localStorage.getItem('booksDb'));
} else {
    bookArray = [];
}

class BookObject {
    constructor(author, title) {
        this.author = author;
        this.title = title;
    }
}

function buildBookField(book) {
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

function fillBooksList() {
    if (JSON.parse(localStorage.getItem('booksDb')) !== null) {
        const dbBook = JSON.parse(localStorage.getItem('booksDb'));
        dbBook.forEach((book) => {
            document.querySelector(".list").append(buildBookField(book));
        });
    }
}

function addBook() {
    if (authorInput.value !== '' && titleInput.value !== '') {

        const book = new BookObject(authorInput.value, titleInput.value);
        bookArray.push(book);
        localStorage.setItem('booksDb', JSON.stringify(bookArray));
        document.querySelector('.list').append(buildBookField(book));
        authorInput.value = '';
        titleInput.value = '';
        location.reload();
    }
}


if (JSON.parse(localStorage.getItem('booksDb')) !== null) {
    fillBooksList();
}


function removeAwasomeBook(book) {

    for (let i = 0; i < bookArray.length; i += 1) {
        if (bookArray[i].title === book.title && bookArray[i].author === book.author) {
            bookArray.splice(i, 1);
            localStorage.setItem('booksDb', JSON.stringify(bookArray));
        }
    }
}


document.querySelectorAll('.remover').forEach((btnRem) => {
    btnRem.addEventListener('click', () => {
        const authorName = btnRem.previousElementSibling.previousElementSibling.innerHTML;
        const bookTitle = btnRem.previousElementSibling.innerHTML;
        const currentBook = new BookObject(authorName, bookTitle)
        removeAwasomeBook(currentBook);
        btnRem.parentNode.remove();
    });
});

btnAdd.addEventListener('click', addBook);
