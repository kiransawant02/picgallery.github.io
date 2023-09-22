const categoryInput = document.getElementById('category');
const searchButton = document.getElementById('search');
const gallery = document.getElementById('gallery');
const accessKey = 'ObA0DSVpTcNwB9RGrMJHSxLMNBN8Gcgt8rgC3mmzwRE';

searchButton.addEventListener('click', () => {
    const category = categoryInput.value.trim();
    if (category === '') {
        alert('Please enter a category');
        return;
    }

    fetch(`https://api.unsplash.com/search/photos?query=${category}&client_id=${accessKey}&per_page=9`)
        .then((response) => response.json())
        .then((data) => {
            gallery.innerHTML = '';

            data.results.forEach((photo) => {
                const picture = document.createElement('div');
                picture.classList.add('picture');
                picture.innerHTML = `
                    <img src="${photo.urls.regular}" alt="${photo.alt_description}">
                    <p>Author: <a href="${photo.user.links.html}">${photo.user.name}</a></p>
                    <p>Description: ${photo.alt_description || 'N/A'}</p>
                `;
                gallery.appendChild(picture);
            });
        })
        .catch((error) => console.error('Error fetching data:', error));
});
