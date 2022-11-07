const apiUrl = 'https://randomuser.me/api/?results=12&inc=picture,name,email,location,cell,dob&nat=us';
const gallery = document.getElementById('gallery');
let employees = [];

fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => data.results)
    .then(displayEmployees);

function displayEmployees(employeesData) {
    employees = employeesData;
    let galleryHTML = ``;
    employees.forEach((employee, index) => {
        galleryHTML += `<div class="card" data-index=${index}>
            <div class="card-img-container">
                <img class="card-img" src="${employee.picture.large}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
                <p class="card-text">${employee.email}</p>
                <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
            </div>
        </div>`;
    });
    gallery.insertAdjacentHTML('beforeend', galleryHTML);
}

gallery.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    const cardIndex = card.getAttribute('data-index');
    displayModal(cardIndex);
});

function displayModal(index) {
    const {name: {first, last}, dob: {date}, cell, email, location: {city, street, state, postcode}, picture} = employees[index];
    let birthday = new Date(date);
    birthday = `${birthday.getMonth()}/${birthday.getDay()}/${birthday.getFullYear()}`;
    if (document.getElementsByClassName('modal-container').length === 0) {
        let modalHTML = `<div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img id="img" class="modal-img" src="${picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${first} ${last}</h3>
                <p id="email" class="modal-text">${email}</p>
                <p id="city" class="modal-text cap">${city}</p>
                <hr>
                <p id="cell" class="modal-text">${cell}</p>
                <p id="address" class="modal-text">${street.number} ${street.name}, ${city}, ${state} ${postcode}</p>
                <p id="birthday" class="modal-text">Birthday: ${birthday}</p>
            </div>
        </div>
    </div>`;
        gallery.insertAdjacentHTML('afterend', modalHTML);
    } else {
        document.getElementById('img').src = picture.large;
        document.getElementById('name').innerHTML = `${first} ${last}`;
        document.getElementById('email').innerHTML = email;
        document.getElementById('city').innerHTML = city;
        document.getElementById('cell').innerHTML = cell;
        document.getElementById('address').innerHTML = `${street.number} ${street.name}, ${city}, ${state} ${postcode}`;
        document.getElementById('birthday').innerHTML = `Birthday: ${birthday}`;
    }
    const modalContainer = document.getElementsByClassName('modal-container')[0];
    if (modalContainer.style.display === 'none') {
        modalContainer.style.display = 'block';
    }
    const modalCloseBtn = document.querySelector('#modal-close-btn');
    modalCloseBtn.addEventListener('click', (e) => {
        modalContainer.style.display = 'none';
    });
}