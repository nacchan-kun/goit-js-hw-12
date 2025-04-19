// webformatURL — посилання на маленьке зображення для списку карток у галереї
// largeImageURL — посилання на велике зображення для модального вікна
// tags — рядок з описом зображення. Підійде для атрибута alt
// likes — кількість вподобайок
// views — кількість переглядів
// comments — кількість коментарів
// downloads — кількість завантажень

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const loader = document.querySelector('.loader');

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export const createGalleryCardTemplate = cardsArr =>
  cardsArr
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
<li class="gallery-card">
  <a href="${largeImageURL}">
    <div class="card-top-part">
      <img class="card-img" src="${webformatURL}" alt="${tags}" loading="lazy"/>
    </div>
    <ul class="card-bottom-part">
      <li class="card-bottom-wrapper">
        <h3 class="card-bottom-titles">Likes</h3>
        <p class="card-bottom-numbers">${likes}</p>
      </li>
      <li class="card-bottom-wrapper">
        <h3 class="card-bottom-titles">Views</h3>
        <p class="card-bottom-numbers">${views}</p>
      </li>
      <li class="card-bottom-wrapper">
        <h3 class="card-bottom-titles">Comments</h3>
        <p class="card-bottom-numbers">${comments}</p>
      </li>
      <li class="card-bottom-wrapper">
        <h3 class="card-bottom-titles">Downloads</h3>
        <p class="card-bottom-numbers">${downloads}</p>
      </li>
    </ul>
  </a>
</li>
`
    )
    .join('');

// ✅ Render cards to DOM in one operation
export const renderGallery = cardsArr => {
  const markup = createGalleryCardTemplate(cardsArr);
  galleryContainer.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh(); // ✅ update SimpleLightbox
};

// ✅ Clear the gallery
export const clearGallery = () => {
  galleryContainer.innerHTML = '';
};

// ✅ Show loader
export const showLoader = () => {
  loader.classList.remove('is-hidden');
};

// ✅ Hide loader
export const hideLoader = () => {
  loader.classList.add('is-hidden');
};

// ✅ Show "Load more" button
export const showLoadMoreBtn = () => {
  loadMoreBtn.classList.remove('is-hidden');
};

// ✅ Hide "Load more" button
export const hideLoadMoreBtn = () => {
  loadMoreBtn.classList.add('is-hidden');
};
