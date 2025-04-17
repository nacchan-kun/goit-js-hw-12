// webformatURL — посилання на маленьке зображення для списку карток у галереї
// largeImageURL — посилання на велике зображення для модального вікна
// tags — рядок з описом зображення. Підійде для атрибута alt
// likes — кількість вподобайок
// views — кількість переглядів
// comments — кількість коментарів
// downloads — кількість завантажень

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
      <img class="card-img" src="${webformatURL}" alt="${tags}" />
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