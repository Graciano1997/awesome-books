const authorInput=document.querySelector('.authorBook');
const titleInput=document.querySelector('.titleBook');
const btnAdd=document.querySelector('.btnAdd');
let bookArray=[];

function BookObject(author, title) {
    this.author = author;
    this.title = title;
}

function buildBookField(book){
    const div = document.createElement('div');
    const authorName = document.createElement('h3');
    authorName.textContent = book.author;
    const bookTitle = document.createElement('h2');
    bookTitle.textContent = book.title;
    const button = document.createElement('button');
    button.textContent = "remove";
    button.classList.add('remover');
    const hr = document.createElement('hr');
    div.append(bookTitle, authorName, button, hr);
    return div;
}

function fillBooksList() {    
    if(JSON.parse(localStorage.getItem('booksDb'))!==null){
        const dbBook=JSON.parse(localStorage.getItem('booksDb'));
        // dbBook.forEach((book) => {
        //     document.querySelector(".list").append(buildBookField(book));
        // });
        dbBook.map((book) => {
            document.querySelector(".list").append(buildBookField(book));
        });
    }else{
        document.querySelector('.title').innerHTML='Awasome Books is actually Empty';
    }
}

function addBook() {
    const book = new BookObject(authorInput.value, titleInput.value);

    bookArray.push(book);

   document.querySelector(".list").append(buildBookField(book));
   if(JSON.parse(localStorage.getItem('booksDb'))===null){
        localStorage.setItem("booksDb",JSON.stringify(bookArray));
      //  fillBooksList();
    }else{
     let oldList=JSON.parse(localStorage.getItem('booksDb'));
     bookArray=oldList.concat(bookArray);
     localStorage.setItem("booksDb",JSON.stringify(bookArray));
    }
}

if(JSON.parse(localStorage.getItem('booksDb'))===null){

}else{
    fillBooksList();

}
  

//  function removeAwasomeBook(book){
//      let bookArray=JSON.parse(localStorage.getItem('booksDb'));
//     // console.log(bookdb);

//     for (let i = 0; i < bookArray.length; i += 1) {
//         if (bookArray[i].author === book.author && bookArray[i].title === book.title) {
//              delete bookArray[i];
//              localStorage.setItem("booksDb",JSON.stringify(bookArray));
//             console.log(bookArray);
//             break;
//         }
//     }

// }

    // console.log(book.author);

    //  if(book in bookdb){

     
    //  }else{
    //   bookArray=oldList.concat(bookArray);
    //   localStorage.setItem("booksDb",JSON.stringify(bookArray));
    //  }
    //return bookToDel;
    // }


    document.querySelectorAll('.remover').forEach((btnRem)=>{
        btnRem.addEventListener('click',()=>{
            const authorName=btnRem.previousElementSibling.previousElementSibling.innerHTML;
            const bookTitle=btnRem.previousElementSibling.innerHTML;
            const book= new BookObject(authorName,bookTitle)
           // removeAwasomeBook(book);
            btnRem.parentNode.remove();
        });
    });
    
btnAdd.addEventListener("click",addBook);
