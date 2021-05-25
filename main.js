const storageKey = "bookEntry";

function checkForStorage() {
    return typeof(Storage) !== "undefined"
}

const submitButton = document.getElementById("bookSubmit") 

submitButton.addEventListener('click', function() {
    if(checkForStorage()){
        if (localStorage.getItem(storageKey) === null) {
            bookData = [];
        } else {
            bookData = JSON.parse(localStorage.getItem(storageKey));
        }
        
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
});

function getBookList() {
    if (checkForStorage()) {
        return JSON.parse(localStorage.getItem(storageKey)) || [];
    } else {
        return [];
    }
}

window.addEventListener("load", function(){
    if (checkForStorage) {
        if (localStorage.getItem(storageKey) !== null){
            const bookData = getBookList();
            const incompleteBookshelfList = document.querySelector("#incompleteBookshelfList");
    
            incompleteBookshelfList.innerHTML = "";
        
            for (let book of bookData) {
                let row = document.createElement('article');
                row.innerHTML += "<h3>" + book.title + "</h3>";
                row.innerHTML += "<p>Penulis: " + book.author + "</p>";
                row.innerHTML += "<p>Tahun: " + book.year + "</p>";
                row.innerHTML += "<div>" + book.isComplate + "</div>";
        
                incompleteBookshelfList.appendChild(row);
            }
        }
    }else{
        alert("Browser yang Anda gunakan tidak mendukung Web Storage")
    }
});