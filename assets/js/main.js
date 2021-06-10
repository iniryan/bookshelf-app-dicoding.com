const open = document.getElementById("open-modal");
const modal_container = document.getElementById("modal-container");
const close = document.getElementById("close-modal");

open.addEventListener("click", () => {
    modal_container.classList.add("show");
    open.classList.add("btn-show");
});

close.addEventListener("click", () => {
    modal_container.classList.remove("show");
    open.classList.remove("btn-show");
});

document.addEventListener("DOMContentLoaded", function () {

    const submitForm = document.getElementById("add-book");
    const search = document.getElementById("search-btn");

    submitForm.addEventListener("submit", function (event) {
        event.preventDefault();
        modal_container.classList.remove("show");
        open.classList.remove("btn-show");
        addBooks();
        this.reset();
    });

    search.addEventListener("click", function (events) {
		const searchForm = document.getElementById("search").value;
		const result = document.getElementById("result");
		const items = searchList(searchForm);

		searchEmpty();
	
        result.style.display = "flex";
        result.style.background = "#ffffff";
        result.style.width = "100%";
        result.style.margin = "16px";
        result.style.padding = "16px";
        result.style.textAlign = "left";
        result.style.color = "#26664a";
        
		if (typeof(items) == "object") {
			for(item of items){
				result.append(item);
			}
		} else { 
            result.style.justifyContent = "center";
            result.style.alignItems = "center";
            result.style.textAlign = "center";
            result.innerText = "Data tidak ditemukan.";
        }
	});
    
    if(isStorageExist()){
        loadDataFromStorage();
    }
});

document.addEventListener("ondatasaved", () => {
    searchEmpty();
});

document.addEventListener("ondataloaded", () => {
    searchEmpty();
    refreshDataFromBookshelf();
});