const STORAGE_KEY = "BOOKSHELF";
let books = [];

function isStorageExist() {
    if(typeof(Storage) === undefined){
        alert("Browser kamu tidak mendukung local storage");
        return false;
    } 
    
    return true;
}

function saveData() {
    const parsed = JSON.stringify(books);
    
    localStorage.setItem(STORAGE_KEY, parsed);
    
    document.dispatchEvent(new Event("ondatasaved"));
}

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    
    let data = JSON.parse(serializedData);
    
    if(data !== null)
        books = data;

    document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage() {
    if(isStorageExist())
        saveData();
}

function composeBookObject(judul, penulis, tahun, isRead) {
    return {
        id: +new Date(),
        judul,
        penulis,
        tahun,
        isRead
    };
}

function findBooks(bookId) {

    for(list of books) {
        if(list.id === bookId)
            return list;
    }

    return null;
}

function findBooksIndex(bookId) {
    
    let index = 0;
    for (list of books) {
        if(list.id === bookId)
            return index;

        index++;
    }

    return -1;
}