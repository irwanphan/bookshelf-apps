const storageKey = "bookEntry";
const submitButton = document.getElementById("bookSubmit");

function checkForStorage() {
    return typeof(Storage) !== "undefined"
}
function getBookList() {
    if(checkForStorage()){
        if (localStorage.getItem(storageKey) === null) {
            bookData = [];
        } else {
            bookData = JSON.parse(localStorage.getItem(storageKey));
        }
    } else {
        alert("The browser does not support Web Storage")
    }
}

function addNewBook() {
    const inputBookTitle = document.getElementById("inputBookTitle").value;
    const inputBookAuthor = document.getElementById("inputBookAuthor").value;
    const inputBookYear = document.getElementById("inputBookYear").value;
    const inputBookIsComplete = document.getElementById("inputBookIsComplete").checked;
    const newBookData = {
        title: inputBookTitle,
        author: inputBookAuthor,
        year: inputBookYear,
        isComplete: inputBookIsComplete,
    }
    bookData.unshift(newBookData); 
    localStorage.setItem(storageKey, JSON.stringify(bookData))
}
submitButton.addEventListener('click', function() {
    getBookList();
    addNewBook();
});

function renderBookShelf(shelf, bookData, completion) {
    shelf.innerHTML = "";
    for (let book of bookData) {
        if (book.isComplete === completion) {
            let row = document.createElement('article');
            row.innerHTML += "<div class='bookie'></div>";
            row.innerHTML += "<h3>" + book.title + "</h3>";
            row.innerHTML += "<p>Penulis: " + book.author + "</p>";
            row.innerHTML += "<p>Tahun: " + book.year + "</p>";
            row.innerHTML += "<div class='action'><button onclick='moveBook(" + book.title + ")'>pindahkan</button><button  onclick='removeBook(" + book.title + ")'>hapus</button></div>";
            shelf.appendChild(row);
        }
    }
}
function sortBookList(bookData) {
    const incompleteBookshelfList = document.querySelector("#incompleteBookshelfList");
    const completeBookshelfList = document.querySelector("#completeBookshelfList");

    renderBookShelf(incompleteBookshelfList, bookData, false);
    renderBookShelf(completeBookshelfList, bookData, true);
}

window.addEventListener("load", function() {
    getBookList();
    sortBookList(bookData);
});

function moveBook(title) {
    let index = bookData.findIndex(element => element.title == title);
    if (bookData[index].isComplete == true) {
        bookData[index].isComplete = false;
    } else if (bookData[index].isComplete == false) {
        bookData[index].isComplete = true;
    }
    localStorage.setItem(storageKey, JSON.stringify(bookData));

    sortBookList(bookData);
}

function removeBook(title) {
    var confirmRemoveBook = confirm("Do you want to remove this book?");
    if(confirmRemoveBook) {
        let index = bookData.findIndex(element => element.title == title);
        bookData.splice(index, 1);
        localStorage.setItem(storageKey, JSON.stringify(bookData));
    
        sortBookList(bookData);
    }
}

function searchBook()
{
    let searchPhrase = document.getElementById("searchBookTitle").value;
    let searchResult = [];

    for (let book of bookData) {
        if (book.title.includes(searchPhrase)) {
            searchResult.unshift(book)
        }
    }
    sortBookList(searchResult);
}

function checkIsComplete() {
    const inputBookIsComplete = document.getElementById("inputBookIsComplete").checked;
    const addToShelf = document.querySelector("#bookSubmit span")
    if (inputBookIsComplete === true) {
        addToShelf.innerHTML = "Selesai dibaca"
    } else {
        addToShelf.innerHTML = "Belum selesai dibaca"
    }
}