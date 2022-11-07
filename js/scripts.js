const apiUrl = 'https://randomuser.me/api/?results=12&inc=picture,name,email,location,cell,dob&nat=us';

fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => data.results)
    .then(displayEmployees);

function displayEmployees(employees) {
    const gallery = document.getElementById('gallery');
    let galleryHTML = ``;
    console.log(employees);
    employees.forEach(employee => {
        galleryHTML += `<div class="card">
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