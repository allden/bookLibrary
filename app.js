// variables
let title = document.getElementById('title');
let author = document.getElementById('author');
let numOfPages = document.getElementById('pages');
let readStatus = document.getElementById('read');
let content = document.getElementById('content');
let button = document.querySelector('.btn');
let myLibrary = [];
getLib();
render(myLibrary);
setEvents();
// events
function setEvents() {
    button.addEventListener('click', addToLibrary);
    let removeBtn = document.querySelectorAll('.delete');
    for(i = 0; i < removeBtn.length; i++) {
        removeBtn[i].addEventListener('click', remove);
    }
    let toggleBtn = document.querySelectorAll('.toggle');
    for(i = 0; i < toggleBtn.length; i++) {
        toggleBtn[i].addEventListener('click', changeStatus);
    }
}
// functions
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// as long as the value isn't empty, create a new book object and push it into the array
function addToLibrary() {
    if(title.value.trim() !== '' && author.value.trim() !== '' && numOfPages.value.trim() !== '') {
        let book = new Book(title.value, author.value, numOfPages.value, readStatus.value)
        myLibrary.push(book);
        render(book);
        clear();
        setEvents();
        showAlert('Book added successfully.', 'success');
        setLib();
    } else {
        showAlert('Please enter a value.', 'fail');
    }
}

function remove(e) {
    // navigate to parent, get the first child and get the text content, then check if the current iteration title is equal to the textContent,
    // if so, delete the row and the current iteration
    for(i = 0; i < myLibrary.length; i++) {
        if(myLibrary[i].title === e.target.parentElement.childNodes[1].textContent) {
            e.target.parentElement.remove();
            myLibrary.splice(i, 1);
            showAlert('Book removed successfully.', 'success');
            setLib();
        }
    }
}

// if the title is the same as the text content of the selected element and depending on whether the value
// is true or false, change the value in myLibrary and in the DOM on click
function changeStatus(e) {
    for(i = 0; i < myLibrary.length; i++) {
        if(myLibrary[i].title === e.target.parentElement.childNodes[1].textContent && myLibrary[i].read === 'false') {
            myLibrary[i].read = 'true';
            e.target.parentElement.childNodes[7].textContent = 'Read';
            console.log(e.target.parentElement.childNodes[7].textContent);
        } else if(myLibrary[i].title === e.target.parentElement.childNodes[1].textContent && myLibrary[i].read === 'true'){
            myLibrary[i].read = 'false';
            e.target.parentElement.childNodes[7].textContent = 'Not Read';
            console.log(e.target.parentElement.childNodes[7].textContent);
        };
    }
    setLib();
}

// iterate over the myLibrary array and for each object, add the title, author, pages and read variables to the tbody's innerHTML
function render(book) {
    content.innerHTML = '';
    let val;
    for(i = 0; i < myLibrary.length; i++) {
        if(myLibrary[i].read === 'true') {
            val = 'Read';
        } else {
            val = 'Not Read';
        }
        content.innerHTML += `
        <tr>
        <td>${myLibrary[i].title}</td>
        <td>${myLibrary[i].author}</td>
        <td>${myLibrary[i].pages}</td>
        <td class="toggle">${val}</td>
        <td class="delete">X</td>
        </tr>
        `;  
    }
}

// create a div element, append a text node with the msg parameter, add the class for coloration and the base alert class
// and insert it inside the container before the first row
function showAlert(msg, className) {
    let alert = document.createElement('div');
    alert.appendChild(document.createTextNode(msg));
    alert.classList.add(className, 'alert');
    let container = document.querySelector('.container');
    let firstRow = document.querySelector('.row');
    container.insertBefore(alert, firstRow);
    setTimeout(hideAlert, 2500);
}

function hideAlert() {
    document.querySelector('.alert').remove();
}

function clear() {
    title.value = '';
    author.value = '';
    numOfPages.value = '';
}

function setLib() {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

function getLib() {
    if(localStorage.getItem('myLibrary')) {
        storedLibrary = localStorage.getItem('myLibrary');
        myLibrary = JSON.parse(storedLibrary);
    } else {
        localStorage.setItem('myLibrary', '');
    }
}

function localLibraryClear() {
    localStorage.clear();
}

// because if i were to assign this at the start it wouldn't apply to any buttons because they don't exist yet,
// on calling addToLibrary i get all the existing buttons and assign the click event
