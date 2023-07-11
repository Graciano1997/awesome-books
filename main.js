const authorInput = document.querySelector('#authorBook');
const titleInput = document.querySelector('#titleBook');
const btnAdd = document.querySelector('.btnAdd');
let bookArray = [];

function BookObject(author, title) {
    this.author = author;
    this.title = title;
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

    } else {
        document.querySelector('.title').innerHTML = 'Awasome Books is actually Empty';
    }
}

function addBook() {

    const book = new BookObject(authorInput.value, titleInput.value);

    bookArray.push(book);

    document.querySelector('.list').append(buildBookField(book));

    if (JSON.parse(localStorage.getItem('booksDb')) === null) {
        localStorage.setItem('booksDb', JSON.stringify(bookArray));
    } else {
        let oldList = JSON.parse(localStorage.getItem('booksDb'));
        localStorage.clear();
        let currentBookArray = oldList.concat(bookArray);
        let mySet = new Set(currentBookArray);
        const arrayDB = Array(...mySet);
        localStorage.setItem('booksDb', JSON.stringify(arrayDB));
    }
    authorInput.value = '';
    titleInput.value = '';
}

if (JSON.parse(localStorage.getItem('booksDb')) === null) {
    document.querySelector('.title').innerHTML = 'You do not have any book yet';
} else {
    fillBooksList();

}


function removeAwasomeBook(book) {
    let bookArray = JSON.parse(localStorage.getItem('booksDb'));
    let currentArray = [];

    for (let i = 0; i < bookArray.length; i += 1) {
        if (bookArray[i].title === book.title && bookArray[i].author === book.author) {
            bookArray.splice(i, 1);
            currentArray = bookArray;
            localStorage.clear();
            localStorage.setItem('booksDb', JSON.stringify(currentArray));
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
