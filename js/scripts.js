const apiUrl = 'https://randomuser.me/api/?results=12&inc=picture,name,email,location';

fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => data.results);