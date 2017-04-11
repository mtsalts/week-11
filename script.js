// LIST ARRAY IS WHERE OUR DATA FOR THIS APPLICATION LIVES
var listArray = [
  { name: "Books to Read",
    items: [
      "Hitchhiker's Guide to Galaxy",
      "Walden",
      "The Elephant, the Tiger, and the Cell Phone"
    ]
  },
  { name: "Things to Do",
    items: [
      "Read",
      "Cry"
    ]
  }
];

var selectedList = 0;
var listDiv = document.getElementById("lists");
var itemDiv = document.getElementById("list-items");
var addListButton = document.getElementById("add-list-button");
var addItemButton = document.getElementById("add-item-button");

// FUNCTIONS TO UPDATE THE HTML PAGE WITH RESPECT TO DATA
function updateLists(){
	while (listDiv.hasChildNodes()){ //while loop will keep going as long as they have HTML elements
		listDiv.removeChild(listDiv.lastChild);
	}
	function addHTMLForList(list,index){ //function constantly called with forEach loop
	var aElement = document.createElement("a");
	aElement.classList.add("list-group-item");
	aElement.classList.add("list-group");
	aElement.classList.add("list-group-item-action");
	
	aElement.setAttribute("data-index", index); //index is tracking the number of the element
	aElement.setAttribute("data-list-name", list.name);
	
	var textNode = document.createTextNode(list.name); //giving user ability to name list. This is how data is structured above
	aElement.appendChild(textNode);
	
	listDiv.appendChild(aElement); //append child adds additional HTML element to another parent HTML element
	}
	listArray.forEach(addHTMLForList);
}

updateLists();

function updateItems(){
	while (itemDiv.hasChildNodes()){ //while loop will keep going as long as they have HTML elements
		itemDiv.removeChild(itemDiv.lastChild);
	}
	function addHTMLForList(list,index){ //function constantly called with forEach loop
	var aElement = document.createElement("a");
	aElement.classList.add("list-group-item");
	aElement.classList.add("list-group");
	aElement.classList.add("list-group-item-action");
	
	aElement.setAttribute("data-index", index); //index is tracking the number of the element
	aElement.setAttribute("data-list-name", list.items);
	
	var textNode = document.createTextNode(list.items); //giving user ability to name list. This is how data is structured above
	aElement.appendChild(textNode);
	
	itemDiv.appendChild(aElement); //append child adds additional HTML element to another parent HTML element
	}
	listArray.forEach(addHTMLForList);
}

updateItems();

// ADDING TO LIST
addListButton.addEventListener("click", function (e){ //button is a submit button, if form action is not defined, it will refresh page
	e.preventDefault(); //prevents default behavior described above
	 
	var input = document["add-list-form"]["list-name-input"]; //allows us to access value without calling element by ID
//	console.log(input.value);
	var newListName = input.value;
	if (newListName.length > 2){
		var newList = { name: newListName, //var newList is the list element, we want to add this to the array
					   items: []};
		listArray.push(newList); //adding list element to the array
		updateLists(); //call the same function again to populate the list array
		closePopups();
		
	}else {
		alert("List Name Not Valid!");
	}
});

addItemButton.addEventListener("click", function (e){ //button is a submit button, if form action is not defined, it will refresh page
	e.preventDefault(); //prevents default behavior described above
	 
	var input = document["add-item-form"]["list-item-input"]; //allows us to access value without calling element by ID
//	console.log(input.value);
	var newItemName = input.value;
	if (newItemName.length > 2){
		var newListItem = { items: [newItemName]}; //var newList is the list element, we want to add this to the array
		listArray.push(newListItem); //adding list element to the array
		updateItems(); //call the same function again to populate the list array
		closePopups();
		
	} else {
		alert("List Name Not Valid!");
	}
});

// ADDING TO LIST ITEMS



// POP-UP HANDLING CODE
var buttonsArray = document.querySelectorAll(".popup-button");
// querySelectorAll returns a DOMTokenList and not an Array (which includes methods like forEach)
buttonsArray = Array.from(buttonsArray); // Conevrting DOMTokenList to an Array

buttonsArray.forEach(function(button) {
  button.addEventListener("click", function() {
    var popup = document.getElementById(this.dataset.popupid); 
    // The data attributes can be accessed by .dataset variable which is part of the DOMElement (check HTML for buttonsArray)
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
