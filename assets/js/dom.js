const BOOK_ID = "bookId";
const UNCOMPLETED_BOOKS = "belumSelesai";
const COMPLETED_BOOKS = "selesaiBaca";

function createBook(judul, penulis, tahun, isRead, search = false) {

    const judulWrapper = document.createElement("h2");
    judulWrapper.innerText = judul;

    const penulisWrapper = document.createElement("p");
	const penulisBuku = document.createElement("span");
	penulisBuku.innerText = penulis;
	penulisWrapper.innerText = "Author : ";
	penulisWrapper.append(penulisBuku);

	const tahunWrapper = document.createElement("p");
	const tahunBuku = document.createElement("span");
	tahunBuku.innerText = tahun;
	tahunWrapper.innerText = "Tahun : ";
	tahunWrapper.append(tahunBuku);

	const textContainer = document.createElement("div");
	textContainer.classList.add("inner");
	textContainer.append(judulWrapper, penulisWrapper, tahunWrapper);

    const container = document.createElement("div");
    container.classList.add("item");
    container.append(textContainer);

    if (isRead) {
        if (search) {
			const statusWrapper = document.createElement("p");
            const statusBuku = document.createElement("span");
			statusBuku.classList.add('status');
			statusBuku.innerText = "Selesai Dibaca";
            statusWrapper.innerText = "Status : ";
            statusWrapper.append(statusBuku);
			textContainer.append(judulWrapper, penulisWrapper, tahunWrapper, statusWrapper);
		} else {
            container.append(
                createUndoButton(),
                createTrashButton()
                );
            }
        } else {
            if (search) {
                const statusWrapper = document.createElement("p");
                const statusBuku = document.createElement("span");
                statusBuku.classList.add('status');
                statusBuku.innerText = "Belum Selesai Dibaca";
                statusWrapper.innerText = "Status : ";
                statusWrapper.append(statusBuku);
                textContainer.append(judulWrapper, penulisWrapper, tahunWrapper, statusWrapper);
            }else{			
                container.append(
                    createCheckButton(),
                    createTrashButton()
                );
            }
        }

    return container;
}

function createUndoButton() {
    return createButton("undo-button", function (event) {
        undoBooksCompleted(event.target.parentElement);
    });
}

function createTrashButton() {
    return createButton("trash-button", function (event) {
        if (confirm('Anda Yakin Akan Menghapus?')) {
            removeBooks(event.target.parentElement);
        }
    });
}

function createCheckButton() {
    return createButton("check-button", function (event) {
        addBooksCompleted(event.target.parentElement);
    });
}

function createButton(buttonTypeClass, eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function (event) {
        eventListener(event);
        event.stopPropagation();
    });
    return button;
}

function addBooks() {
    const bookCompleted = document.getElementById(COMPLETED_BOOKS);
    const bookUncompleted = document.getElementById(UNCOMPLETED_BOOKS);
    const judul = document.getElementById("judul").value;
    const penulis = document.getElementById("penulis").value;
    const tahun = document.getElementById("tahun").value;
    const isRead = document.getElementById("isRead");

    const book = createBook(judul, penulis, tahun, isRead.checked);
    const bookObject = composeBookObject(judul, penulis, tahun, isRead.checked);
    
    book[BOOK_ID] = bookObject.id;
    books.push(bookObject);

    if (isRead.checked) {
        bookCompleted.append(book);
    } else {
        bookUncompleted.append(book);
    }

    updateDataToStorage();
}

function addBooksCompleted(booksElement) {
    const bookCompleted = document.getElementById(COMPLETED_BOOKS);
    const judul = booksElement.querySelector(".inner > h2").innerText;
	const penulis = booksElement.querySelector(".inner > p:nth-child(even) > span").innerText;
	const tahun = booksElement.querySelector(".inner > p:nth-child(odd) > span").innerText;

    const newBooks = createBook(judul, penulis, tahun, true);

    const book = findBooks(booksElement[BOOK_ID]);
    book.isRead = true;
    newBooks[BOOK_ID] = book.id;

    bookCompleted.append(newBooks);
    booksElement.remove();

    updateDataToStorage();
}

function removeBooks(booksElement) {

    const indexOfBooks = findBooksIndex(booksElement[BOOK_ID]);
    books.splice(indexOfBooks, 1);

    booksElement.remove();

    updateDataToStorage();
}

function undoBooksCompleted(booksElement) {
    const bookUncompleted = document.getElementById(UNCOMPLETED_BOOKS);
    const judul = booksElement.querySelector(".inner > h2").innerText;
	const penulis = booksElement.querySelector(".inner > p:nth-child(even) > span").innerText;
	const tahun = booksElement.querySelector(".inner > p:nth-child(odd) > span").innerText;
    
    const newBooks = createBook(judul, penulis, tahun, false);

    const book = findBooks(booksElement[BOOK_ID]);
    book.isRead = false;
    newBooks[BOOK_ID] = book.id;

    bookUncompleted.append(newBooks);
    booksElement.remove();
    
    updateDataToStorage();
}

function refreshDataFromBookshelf() {
    const bookUncompleted = document.getElementById(UNCOMPLETED_BOOKS);
    let bookCompleted = document.getElementById(COMPLETED_BOOKS);

    for(list of books){
        const newBooks = createBook(list.judul, list.penulis, list.tahun, list.isRead);
        newBooks[BOOK_ID] = list.id;

        if (list.isRead) {
            bookCompleted.append(newBooks);
        } else {
            bookUncompleted.append(newBooks);
        }
    }
}

function searchList(booksItems) {
	const result = document.getElementById("result");
	let items = [];
	
    for(item of books){
		if (item.judul.toLowerCase() == booksItems.toLowerCase() || item.penulis.toLowerCase() == booksItems.toLowerCase() || item.tahun.toLowerCase() == booksItems.toLowerCase()) {
			const bookItem = createBook(item.judul, item.penulis, item.tahun, item.isRead, true);
			bookItem[BOOK_ID] = item.id;
			items.push(bookItem);
		}
	}

	if (items.length) { 
        return items;
    }
}

function searchEmpty() {
	const searchForm = document.getElementById("search");
	const result = document.getElementById("result");
	
    searchForm.value = "";
	result.style.display = "none";

	while (result.firstChild) {
		result.removeChild(result.lastChild);
	}
}