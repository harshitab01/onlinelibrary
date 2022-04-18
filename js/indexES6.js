console.log("ESZ^");



class Book {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }
}



class Display {

    add(book) {
        // console.log("Adding to ui");


        let books = localStorage.getItem('books');
        let booksObj;
        if (books == null) {
            booksObj = [];
        }
        else {
            booksObj = JSON.parse(books);
        }
        booksObj.push(book);
        localStorage.setItem('books', JSON.stringify(booksObj));
        console.log(typeof booksObj);
    }


    static showBooks() {
        let books = localStorage.getItem('books');
        let booksObj;
        if (books == null) {
            booksObj = [];
        }
        else {
            booksObj = JSON.parse(books);
        }

        // console.log(Array.from(booksObj))
        let tableBody = document.getElementById('tableBody');
        tableBody.innerHTML = "";
        Array.from(booksObj).forEach(function (element, index) {
            let uiString = `
    <tr>
        <td>${element.name}</td>
        <td>${element.author}</td>
        <td>${element.type}</td>
        <td><a id=${index} onclick="deleteNode(this.id)" class="btn btn-outline-dark">Remove Book</a></td>
    </tr>
    `;
            tableBody.innerHTML += uiString;
        });
    }


    static showAlert(type, alert) {
        let message = document.getElementById('message');
        message.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
    <symbol id="success" fill="currentColor" viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
  </symbol>
  <symbol id="danger" fill="currentColor" viewBox="0 0 16 16">
  <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
</symbol>
</svg>

<div class="alert alert-${type} d-flex align-items-center" role="alert">
  <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#${type}"/></svg>
  <div>
    ${alert}
  </div>
  
    `;

        setTimeout(() => {
            message.innerHTML = '';
        }, 2000);//after 2 seconds this will bw implemented
    }



    validate(book) {
        if (book.name.length > 3 && book.author.length > 3) {
            return true;
        }
        else {
            return false;
        }
    }


    clear() {
        let libraryForm = document.getElementById('library-form');
        libraryForm.reset();

    }
}

Display.showBooks();



//Add submit event listener to form
let libraryForm = document.getElementById('library-form');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    e.preventDefault();//to prevent default behaviour of form
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;

    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');
    let type;
    if (fiction.checked) {
        type = fiction.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else if (cooking.checked) {
        type = cooking.value;
    }

    let book = new Book(name, author, type);
    console.log(book);

    //Display Object
    let display = new Display();
    if (display.validate(book)) {
        display.add(book);
        display.clear();
        Display.showAlert('success', 'Your Book has been added successfully');
        Display.showBooks();
    }
    else {
        //Show error to the user
        Display.showAlert('danger', 'Sorry your book cant be added');
    }





    // console.log("submit");
}



function deleteNode(index, name) {
    console.log('I am deleting', index);

    let books = localStorage.getItem('books');


    if (books == null) {
        booksObj = [];
    }
    else {
        booksObj = JSON.parse(books);
    }


    booksObj.splice(index, 1);//to delete specific elements from the array

    localStorage.setItem('books', JSON.stringify(booksObj));
    Display.showBooks();
    Display.showAlert('success', 'Your Book has been removed successfully');


}



