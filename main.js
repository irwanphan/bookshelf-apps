const storageKey = "bookEntry";
const submitButton = document.getElementById("bookSubmit");

var selectedId = "";

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

    if (selectedId == ""){
        const { length } = bookData;
        const id = length + 1;
        const newBookData = {
            id: id,
            title: inputBookTitle,
            author: inputBookAuthor,
            year: inputBookYear,
            isComplete: inputBookIsComplete,
        }
        bookData.unshift(newBookData); 
        localStorage.setItem(storageKey, JSON.stringify(bookData));
    } else {
        let selectedIndex = bookData.findIndex(element => element.id == selectedId);
        bookData[selectedIndex].title = inputBookTitle;
        bookData[selectedIndex].author = inputBookAuthor;
        bookData[selectedIndex].year = inputBookYear;
        bookData[selectedIndex].isComplete = inputBookIsComplete;
        localStorage.setItem(storageKey, JSON.stringify(bookData));
    }

    reset();
}
submitButton.addEventListener('click', function() {
    addNewBook();
    getBookList();

    sortBookList(bookData)
});

function renderBookShelf(shelf, bookData, completion) {
    shelf.innerHTML = "";
    for (let book of bookData) {
        if (book.isComplete === completion) {
            let row = document.createElement('article');
            row.innerHTML += `
                <div class="bookie"></div>
                <div class="book-info">
                    <h3>${ book.title }</h3>
                    <p>Penulis: ${book.author}</p>
                    <p>Tahun: ${book.year}</p>
                    <div class="action">
                        <button class="blue" onclick="editBook(${book.id})">edit</button>
                        <button class="blue" onclick="moveBook(${book.id})">pindahkan</button>
                        <button class="pink" onclick="removeBook(${book.id})">hapus</button>
                    </div>
                </div>`;
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

function moveBook(id) {
    let index = bookData.findIndex(element => element.id == id);
    if (bookData[index].isComplete == true) {
        bookData[index].isComplete = false;
    } else if (bookData[index].isComplete == false) {
        bookData[index].isComplete = true;
    }
    localStorage.setItem(storageKey, JSON.stringify(bookData));

    sortBookList(bookData);
}

function removeBook( id ) {
    var confirmRemoveBook = confirm("Do you want to remove this book?");
    if(confirmRemoveBook) {
        let index = bookData.findIndex(element => element.id == id);
        bookData.splice(index, 1);
        localStorage.setItem(storageKey, JSON.stringify(bookData));
    
        sortBookList(bookData);
    }
}

function searchBook() {
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

function editBook(id) {
    let index = bookData.findIndex(element => element.id == id);
    document.getElementById("inputBookTitle").value = bookData[index].title;
    document.getElementById("inputBookAuthor").value = bookData[index].author;
    document.getElementById("inputBookYear").value = bookData[index].year;
    document.getElementById("inputBookIsComplete").checked = bookData[index].isComplete;
    selectedId = id;
}

function reset() {
    document.getElementById("inputBookTitle").value = "";
    document.getElementById("inputBookAuthor").value = "";
    document.getElementById("inputBookYear").value = "2021";
    document.getElementById("inputBookIsComplete").checked = false;
    selectedId = "";
}