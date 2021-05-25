const storageKey = "bookEntry";
const submitButton = document.getElementById("bookSubmit") 

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
    const inputBookIsComplete = document.getElementById("inputBookIsComplete").value;
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

function renderBookShelf(shelf) {
    shelf.innerHTML = "";

    for (let book of bookData) {
        let row = document.createElement('article');
        row.innerHTML += "<h3>" + book.title + "</h3>";
        row.innerHTML += "<p>Penulis: " + book.author + "</p>";
        row.innerHTML += "<p>Tahun: " + book.year + "</p>";
        row.innerHTML += "<div>" + book.isComplate + "</div>";

        shelf.appendChild(row);
    }
}

window.addEventListener("load", function(){
    getBookList();

    const incompleteBookshelfList = document.querySelector("#incompleteBookshelfList");

    renderBookShelf(incompleteBookshelfList);
});