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

function renderBookShelf(shelf, completion) {
    shelf.innerHTML = "";
    for (let book of bookData) {
        let row = document.createElement('article');
        if (book.isComplete === completion) {
            row.innerHTML += "<h3>" + book.title + "</h3>";
            row.innerHTML += "<p>Penulis: " + book.author + "</p>";
            row.innerHTML += "<p>Tahun: " + book.year + "</p>";
            row.innerHTML += "<div class='action' onclick='moveBookStatus(" + book.title + ")'><button>pindahkan</button><button>hapus</button></div>";
        }
        shelf.appendChild(row);
    }
}

window.addEventListener("load", function(){
    getBookList();

    classifyBookShelf();
});

function classifyBookShelf()
{
    const incompleteBookshelfList = document.querySelector("#incompleteBookshelfList");
    const completeBookshelfList = document.querySelector("#completeBookshelfList");

    renderBookShelf(incompleteBookshelfList, false);
    renderBookShelf(completeBookshelfList, true);
}

function moveBookStatus( title )
{
    // var index = bookData.findIndex( ( element, index ) => {
    //     if( element.title == title )
    //     {
    //         return true;
    //     }
    // });
    let index = bookData.findIndex(element => element.title == title);
    if (bookData[index].isComplete == true) {
        bookData[index].isComplete = false;
    } else if (bookData[index].isComplete == false) {
        bookData[index].isComplete = true;
    }
    
    classifyBookShelf();
}