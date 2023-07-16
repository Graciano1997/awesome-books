export const bookLayout = (bookCurrent) => {
    const div = document.createElement('div');
    div.classList.add('card-book');
    const divDescr = document.createElement('div');
    divDescr.classList.add('bookDescription');
    const authorName = document.createElement('h2');
    authorName.textContent = bookCurrent.author;
    authorName.classList.add('autor');
    const bookTitle = document.createElement('h3');
    bookTitle.classList.add('title');
    bookTitle.textContent = bookCurrent.title;
    const span = document.createElement('span');
    span.classList.add('spanSpace');
    span.textContent = 'by';
    divDescr.append(bookTitle, span, authorName);
    const button = document.createElement('button');
    button.classList.add('remove-button');
    button.textContent = 'remove';
    button.classList.add('remover');
    const hr = document.createElement('hr');
    div.append(divDescr, button, hr);
    return div;
}