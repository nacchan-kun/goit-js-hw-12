// webformatURL — посилання на маленьке зображення для списку карток у галереї
// largeImageURL — посилання на велике зображення для модального вікна
// tags — рядок з описом зображення. Підійде для атрибута alt
// likes — кількість вподобайок
// views — кількість переглядів
// comments — кількість коментарів
// downloads — кількість завантажень

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// Create gallery card markup
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
      <img class="card-img" src="${webformatURL}" alt="${tags}" loading="lazy" />
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

// Lightbox instance (singleton)
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

// Render gallery cards to DOM
export function renderGallery(cards) {
  const gallery = document.querySelector('.gallery');
  const markup = createGalleryCardTemplate(cards);
  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh(); // Re-initialize for new elements
}

// Clear gallery
export function clearGallery() {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';
}

// Toggle loader visibility
export function toggleLoader(show) {
  const loader = document.querySelector('.loader');
  loader.classList.toggle('hidden', !show);
}

// Toggle "Load more" button visibility
export function toggleLoadMoreBtn(show) {
  const loadMoreBtn = document.querySelector('.load-more');
  loadMoreBtn.classList.toggle('hidden', !show);
}