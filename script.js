// LIST ARRAY IS WHERE OUR DATA FOR THIS APPLICATION LIVES
var listArray = [{
        name: "Books to Read",
        items: [
            "Hitchhiker's Guide to Galaxy",
            "Walden",
            "The Elephant, the Tiger, and the Cell Phone"
        ]
    },
    {
        name: "Things to Do",
        items: [
            "Read",
            "Cry",
            "Give up"
        ]
    }
];
var selectedList = 0;
var listDiv = document.getElementById("lists");
var itemDiv = document.getElementById("list-items");
var addListButton = document.getElementById("add-list-button");
var addItemButton = document.getElementById("add-item-button");

//select a list

listDiv.addEventListener("click", function(e){
    selectedList = e.target.dataset.index;

    var listHTMLElements = listDiv.querySelectorAll("a");
    listHTMLElements.forEach(function(list, i) {
        list.classList.remove("active");
        if (selectedList == i) {
            list.classList.add("active");
        }
    });
    updateItemsForSelectedList();
});

// FUNCTIONS TO UPDATE THE HTML PAGE WITH RESPECT TO DATA
function updateLists() {
    while (listDiv.hasChildNodes()) {
        listDiv.removeChild(listDiv.lastChild);
    }

    listArray.forEach(function(list, i) {
        var aElement = document.createElement("a");
        aElement.classList.add("list-group-item");
        aElement.classList.add("list-group-item-action");
        aElement.classList.add("list");
		if (i == selectedList) {
			aElement.classList.add("active");
		}

        aElement.setAttribute("data-index", i);

        var textNode = document.createTextNode(list.name);
        aElement.appendChild(textNode);

        listDiv.appendChild(aElement);
    });
}

function updateItemsForSelectedList() {
    while (itemDiv.hasChildNodes()) {
        itemDiv.removeChild(itemDiv.lastChild);
    }

    var listItemArray = listArray[selectedList].items;
    listItemArray.forEach(function(item, i) {
		var aElement = document.createElement("a");
        aElement.classList.add("list-group-item");
        aElement.classList.add("list-group-item-action");
        aElement.classList.add("list");
		aElement.setAttribute("data-index", i);
		var textNode = document.createTextNode(item);
		aElement.appendChild(textNode);
		itemDiv.appendChild(aElement);
    });
}

updateLists();
updateItemsForSelectedList();

// ADDING TO LIST
addListButton.addEventListener("click", function(e) {
    e.preventDefault();
    var listName = document["add-list-form"]["list-name-input"].value;
    if (listName.length >= 3) {
        var newList = {
            name: listName,
            items: []
        };
        listArray.push(newList);
        updateLists();
    } else {
        alert("Please enter a valid list name: Atleast 3 characters");
    }
});
// ADDING TO LIST ITEMS
addItemButton.addEventListener("click", function(e) {
    e.preventDefault();
    var currentList = listArray[selectedList];
    var itemArray = currentList.items;
	var inputValue = document["add-item-form"]["item-name-input"].value;
	itemArray.push(inputValue);
	updateItemsForSelectedList();
});

// POP-UP HANDLING CODE
var buttonsArray = document.querySelectorAll(".popup-button");
buttonsArray = Array.from(buttonsArray);

buttonsArray.forEach(function(button) {
    button.addEventListener("click", function() {
        var popup = document.getElementById(this.dataset.popupid);
        popup.style.display = "flex";
    });
});

var closeButton = document.querySelectorAll(".close");
closeButton.forEach(function(button, i) {
    button.addEventListener("click", closePopups);
});

function closePopups() {
    var popupsArray = Array.from(document.querySelectorAll(".popup"));
    popupsArray.forEach(function(popup) {
        popup.style.display = "none";
    });
}

