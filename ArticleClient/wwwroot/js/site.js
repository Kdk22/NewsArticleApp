// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
const uri = 'https://localhost:5001/api/NewsArticle/';
let articles = [];
let imageFile = "";

$(window).load(function () {
    getItems()
});


function getItems() {
    $.ajax({
        type: 'GET',
        url: 'https://localhost:5001/api/NewsArticle/',
        beforeSend: function () {
            //Show(); // Show loader icon  
        },
        success: function (data) {
            console.log('success', data);
            _displayItems(data);
        },
        complete: function () {
            //Hide(); // Hide loader icon  
        },
        failure: function (jqXHR, textStatus, errorThrown) {
            alert("HTTP Status: " + jqXHR.status + "; Error Text: " + jqXHR.responseText); // Display error message  
        }  
    });
};


const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    debugger
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});



async function postItem() {
   
    //var image = $('#previewImg').attr('src');
    var token = document.querySelector('input[name="__RequestVerificationToken"]').getAttribute("value");
    debugger
    var image = imageFile;
    const result = await toBase64(image).catch(e => Error(e));
    //var base64ImageContent = image.replace(/^data:image\/(png|jpg);base64,/, "");
    var blob = base64ToBlob(base64ImageContent, 'image/png');
    const addTitleTextbox = document.getElementById('name-input');
    const addDescriptionTextbox = document.getElementById('description-input');
    debugger
    //var formData = {};
    //formData.append('imageurl', image.name);
    //formData.append('name', addTitleTextbox)
    //formData.append('description', addDescriptionTextbox)

    const item = {
        name: addTitleTextbox.value.trim(),
        description: addDescriptionTextbox.value.trim(),
        imageURL: result,
        userId: "1"
    };
    debugger

    $.ajax({
        type: "POST",
        url: 'https://localhost:5001/api/NewsArticle/',
        cache: false,
        data: JSON.stringify(item),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
        },
       
        success: function (data, status, jqXHR) {
            if (jqXHR.status == "204") {

            }
            //alert("success");
            console.log('success', data);
            _displayItems(data);
        },
        complete: function () {
            //alert("asdfs");
            //Hide(); // Hide loader icon  
        },
        failure: function (jqXHR, textStatus, errorThrown) {
            alert("HTTP Status: " + jqXHR.status + "; Error Text: " + jqXHR.responseText); // Display error message  
        }  
        });
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
    fetch(`${uri}${id}`, {
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
    const name = (itemCount === 1) ? 'Article' : 'Articles';

    document.getElementById('counter').innerHTML = `${itemCount} ${name}`;
    debugger;
}
function previewFile(input) {
    var file = $("input[type=file]").get(0).files[0];

    if (file) {
        var reader = new FileReader();
        imageFile = file;

        reader.onload = function () {
            $("#previewImg").attr("src", reader.result);
        }

        reader.readAsDataURL(file);
    }
}

function format(input) {
    var date = new Date(input);
    return [
        ("0" + date.getDate()).slice(-2),
        ("0" + (date.getMonth() + 1)).slice(-2),
        date.getFullYear()
    ].join('/');
}

function _displayItems(data) {
    const tBody = document.getElementById('all-blogs');
    debugger;
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

        var x = document.createElement("IMG");
        x.setAttribute("src", item.imageURL);
        x.setAttribute("width", "304");
        x.setAttribute("height", "228");
        x.setAttribute("alt", "Image");
        tBody.appendChild(x);

        const l1 = document.createElement("div")
        const textNode1 = document.createTextNode(item.name)
        l1.appendChild(textNode1);
        tBody.appendChild(l1);

        const l2 = document.createElement("div")
        const textNode2 = document.createTextNode(item.description)
        l2.appendChild(textNode2);
        tBody.appendChild(l2);

       

        const l3 = document.createElement("div")
        const textNode3 = document.createTextNode(format(item.datePublished))
        l3.appendChild(textNode3);
        tBody.appendChild(l3);



        //const l4 = document.createElement("li")
        //const textNode4 = document.createTextNode(item.imageURL)
        //l4.appendChild(textNode4);
        //tBody.appendChild(l4);
        let sp2 = document.createElement("span");
     
        tBody.appendChild(sp2)

        let btnEdit = document.createElement("button");
        btnEdit.innerHTML = "Delete";
        sp2.appendChild(btnEdit);
        btnEdit.onclick = function () {

        };

        let btnDelete = document.createElement("button");
        btnDelete.innerHTML = "Edit";
        sp2.appendChild(btnDelete);
        btnEdit.onclick = function () {
            if (confirm("Do you want to Delete !")) {
                deleteItem(item.id);

            } else {
                txt = "You pressed Cancel!";
            }
        };


        

        let l5 = document.createElement("div")
        let sp1 = document.createElement("span")
        l5.appendChild(sp1);

    
  

        
    });

    articles = data;
}