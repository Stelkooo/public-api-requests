const apiUrl = 'https://randomuser.me/api/?results=12&inc=picture,name,email,location,cell,dob&nat=us';
const gallery = document.getElementById('gallery');
let employees = [];
createModal();
const modalContainer = document.querySelector('.modal-container');
/**
 * fetches 12 random users from the randomuser api with the following info:
 * - picture
 * - name
 * - email
 * - location
 * - cell
 * - dob
 * once it gets the result, it calls the displayEmployees func
 */
fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => data.results)
    .then(displayEmployees);
/**
 * displays the random employees on the screen
 * @param {array} employeesData 
 * once the api fetches 12 random users
 * it displays them on the screen in a grid fashion
 * a card is created for each employee
 */
function displayEmployees(employeesData) {
    employees = employeesData;
    let galleryHTML = ``;
    employees.forEach((employee, index) => {
        galleryHTML += `<div class="card" data-index="${index}" data-first="${employee.name.first.toLowerCase()}" data-last="${employee.name.last.toLowerCase()}">
            <div class="card-img-container">
                <img class="card-img" src="${employee.picture.large}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
                <p class="card-text">${employee.email}</p>
                <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
            </div>
        </div>`;
    });
    gallery.insertAdjacentHTML('beforeend', galleryHTML);
}
/**
 * if one of the cards gets clicked
 * it calls the displayModal func if its index
 */
gallery.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    const cardIndex = card.getAttribute('data-index');
    changeModal(cardIndex);
    displayModal();
});
/**
 * creates a modal and adds it after the gallery div
 */
function createModal() {
    let modalHTML = `<div class="modal-container" style="display: none" data-index="">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img id="img" class="modal-img" src="" alt="profile picture">
                <h3 id="name" class="modal-name cap"></h3>
                <p id="email" class="modal-text"></p>
                <p id="city" class="modal-text cap"></p>
                <hr>
                <p id="cell" class="modal-text"></p>
                <p id="address" class="modal-text"></p>
                <p id="birthday" class="modal-text">Birthday: </p>
            </div>
        </div>
        <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
    </div>`;
    gallery.insertAdjacentHTML('afterend', modalHTML);
}
/**
 * changes which employee is displayed on the modal
 * @param {number} index 
 */
function changeModal(index) {
    const {name: {first, last}, dob: {date}, cell, email, location: {city, street, state, postcode}, picture} = employees[index];
    let birthday = new Date(date);
    console.log(birthday);
    modalContainer.setAttribute('data-index', index);
    birthday = `${birthday.getMonth() + 1}/${birthday.getDate()}/${birthday.getFullYear()}`;
    document.getElementById('img').src = picture.large;
    document.getElementById('name').innerHTML = `${first} ${last}`;
    document.getElementById('email').innerHTML = email;
    document.getElementById('city').innerHTML = city;
    document.getElementById('cell').innerHTML = cell;
    document.getElementById('address').innerHTML = `${street.number} ${street.name}, ${city}, ${state} ${postcode}`;
    document.getElementById('birthday').innerHTML = `Birthday: ${birthday}`;
}
/**
 * adds function to the modal close button
 * allows users to close down the modal
 */
const modalCloseBtn = document.querySelector('#modal-close-btn');
    modalCloseBtn.addEventListener('click', (e) => {
        modalContainer.style.display = 'none';
});
/**
 * displays the modal on the screen
 */
function displayModal() {
    modalContainer.style.display = "block";
}
/**
 * adds function to the prev and next buttons on the modal
 * allows users to flick between employees
 * without needing to close the employee and then select another one
 */
const modalPrev = document.getElementById('modal-prev');
modalPrev.addEventListener('click', () => {
    const modalIndex = parseInt(modalContainer.getAttribute('data-index'));
    if (modalIndex === 0) {
        changeModal(11);
        displayModal();
    } else {
        changeModal(modalIndex - 1);
        displayModal();
    }
});
const modalNext = document.getElementById('modal-next');
modalNext.addEventListener('click', () => {
    const modalIndex = parseInt(modalContainer.getAttribute('data-index'));
    if (modalIndex === 11) {
        changeModal(0);
        displayModal();
    } else {
        changeModal(modalIndex + 1);
        displayModal();
    }
});
/**
 * search function
 * allows users to filter out specific employees
 * by typing the search input box and click on the the submit button
 */
document.getElementById('search-submit').addEventListener('click', () => {
    let searchInput = document.getElementById('search-input').value;
    const cards = document.getElementsByClassName('card');
    for (const card of cards) {
        const firstName = card.getAttribute('data-first');
        const lastName = card.getAttribute('data-last');
        if (firstName.includes(searchInput) || lastName.includes(searchInput)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    }
});