// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
const uri = 'https://localhost:5001/api/NewsArticle/';
let articles = [];

function getItems() {
    alert("blaa");
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayItems(data))
        .catch(error => console.error('Unable to get items.', error));
}

function addItem() {
    const addTitleTextbox = document.getElementById('add-title');
    const addDescriptionTextbox = document.getElementById('add-description');
    const addImageTextbox = document.getElementById('add-image');

    const item = {
        name: addTitleTextbox.value.trim(),
        description: addDescriptionTextbox.value.trim(),
        imageURL: addImageTextbox.value.trim()
    };

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .then(() => {
            getItems();
            addTitleTextbox.value = '';
            addDescriptionTextbox.value = '';
            addImageTextbox.value = '';
        })
        .catch(error => console.error('Unable to add item.', error));
}

function deleteItem(id) {
    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to delete item.', error));
}

function displayEditForm(id) {
    const item = todos.find(item => item.id === id);

    document.getElementById('edit-title').value = item.name;
    document.getElementById('edit-id').value = item.id;
    document.getElementById('edit-image').value = item.imageURL;
    document.getElementById('editForm').style.display = 'block';
}

function updateItem() {
    const itemId = document.getElementById('edit-id').value;
    const item = {
        id: parseInt(itemId, 10),
        name: document.getElementById('add-title').value.trim(),
        description: document.getElementById('add-description').value.trim(),
        imageURL: document.getElementById('add-image').value.trim()

    };

    fetch(`${uri}/${itemId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to update item.', error));

    closeInput();

    return false;
}

function closeInput() {
    document.getElementById('editForm').style.display = 'none';
}

function _displayCount(itemCount) {
    const name = (itemCount === 1) ? 'to-do' : 'to-dos';

    document.getElementById('counter').innerText = `${itemCount} ${name}`;
}

function _displayItems(data) {
    const tBody = document.getElementById('all-blogs');
    tBody.innerHTML = '';

    _displayCount(data.length);

    const button = document.createElement('button');

    data.forEach(item => {
        //let isCompleteCheckbox = document.createElement('input');
        //isCompleteCheckbox.type = 'checkbox';
        //isCompleteCheckbox.disabled = true;
        //isCompleteCheckbox.checked = item.isComplete;

        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayEditForm(${item.id})`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deleteItem(${item.id})`);



        const l1 = tBody.createElement("li")
        const textNode1 = document.createTextNode(item.name)
        l1.appendChild(textNode1);
        tBody.appendChild(l1);

        const l2 = tBody.createElement("li")
        const textNode2 = document.createTextNode(item.description)
        l1.appendChild(textNode2);
        tBody.appendChild(l1);

        const l3 = tBody.createElement("li")
        const textNode3 = document.createTextNode(item.datePublished)
        l3.appendChild(textNode3);
        tBody.appendChild(l3);

        const l4 = tBody.createElement("li")
        const textNode4 = document.createTextNode(item.imageURL)
        l4.appendChild(textNode4);
        tBody.appendChild(l4);

        let l5 = tBody.createElement("li")
        l5.appendChild(editButton);

        let td4 = tBody.createElement("li");
        td4.appendChild(deleteButton);
    });

    articles = data;
}