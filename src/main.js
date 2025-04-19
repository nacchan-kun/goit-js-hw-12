import iziToast from 'izitoast';
// import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
// import "simplelightbox/dist/simple-lightbox.min.css";

import bellIcon from './img/izi-toast-svg/bell-icon.svg';
import successIcon from '/img/izi-toast-svg/success-icon.svg';
import infoIcon from '/img/izi-toast-svg/info-icon.svg';
import errorIcon from '/img/izi-toast-svg/error-icon.svg';

import { fetchPhotos } from './js/pixabay-api';
import { createGalleryCardTemplate } from './js/render-functions';

const formEl = document.querySelector('.js-form');
const inputEl = document.querySelector('.js-form-input');
const galleryEl = document.querySelector('.gallery');
const loaderEl = document.querySelector('.loader');
const loadMoreBtnEl = document.querySelector('.load-more');

const scrollBtnEl = document.querySelector('.scroll-to-top-btn');

let searchedQuery;
let searchedPage;
const searchedPerPage = 15;
let totalPages;

const simplelightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

iziToast.show({
  message: `Hello, user! Hope you're having a great day! 😊`,
  messageSize: '16',
  messageColor: '#ffffff',
  backgroundColor: '#0099ff',
  position: 'topRight',
  maxWidth: '432',
  closeOnClick: true,
  timeout: 3500,
  close: false,
  iconUrl: bellIcon,
});

const onFormSubmit = async event => {
  try {
    event.preventDefault();

    searchedQuery = inputEl.value.trim();
    searchedPage = 1;

    event.target.reset();

    if (!searchedQuery) {
      iziToast.error({
        message: `Search query can't be empty`,
        messageSize: '16',
        messageColor: '#ffffff',
        backgroundColor: '#ef4040',
        position: 'topRight',
        closeOnClick: true,
        timeout: 3500,
        close: false,
        iconUrl: errorIcon,
      });
      return;
    }

    galleryEl.innerHTML = '';
    loaderEl.classList.remove('hidden');
    loadMoreBtnEl.classList.add('hidden');

    const {
      data: { hits, totalHits },
    } = await fetchPhotos(searchedQuery, searchedPage, searchedPerPage);

    if (totalHits === 0) {
      iziToast.error({
        message: `Sorry, there are no images matching your search query. Please try again!`,
        messageSize: '16',
        messageColor: '#ffffff',
        backgroundColor: '#ef4040',
        position: 'topRight',
        maxWidth: '432',
        closeOnClick: true,
        timeout: 3500,
        close: false,
        iconUrl: errorIcon,
      });
      loaderEl.classList.add('hidden');
      return;
    }

    totalPages = Math.ceil(totalHits / searchedPerPage);

    // console.log(hits); // Масив обєктів зображень
    // console.log(totalHits); // Кількість знайдених зображень (не приходить більше ніж 500)
    // console.log(totalPages); // Максимальна кількість сторінок за пошуковим запитом

    loaderEl.classList.add('hidden');

    galleryEl.innerHTML = createGalleryCardTemplate(hits);

    simplelightbox.refresh();

    iziToast.success({
      message: `Here are the images you searched for.`,
      messageSize: '16',
      messageColor: '#ffffff',
      backgroundColor: '#59a10d',
      position: 'topRight',
      maxWidth: '432',
      closeOnClick: true,
      timeout: 3500,
      close: false,
      iconUrl: successIcon,
    });

    if (totalPages > 1) {
      loadMoreBtnEl.classList.remove('hidden');
    }
  } catch (error) {
    iziToast.error({
      message: `Something went wrong :${error}`,
      messageSize: '16',
      messageColor: '#ffffff',
      backgroundColor: '#ef4040',
      position: 'topRight',
      maxWidth: '432',
      closeOnClick: true,
      timeout: 3500,
      close: false,
      iconUrl: errorIcon,
    });
    // console.log(error);
  }
};

const onLoadMoreBtnClick = async () => {
  try {
    searchedPage++;

    loaderEl.classList.remove('hidden');
    loadMoreBtnEl.classList.add('hidden');

    const {
      data: { hits },
    } = await fetchPhotos(searchedQuery, searchedPage, searchedPerPage);

    loadMoreBtnEl.classList.remove('hidden');
    loaderEl.classList.add('hidden');

    galleryEl.insertAdjacentHTML('beforeend', createGalleryCardTemplate(hits));
    simplelightbox.refresh();
    iziToast.success({
      message: `Here are more of these images.`,
      messageSize: '16',
      messageColor: '#ffffff',
      backgroundColor: '#59a10d',
      position: 'topRight',
      maxWidth: '432',
      closeOnClick: true,
      timeout: 3500,
      close: false,
      iconUrl: successIcon,
    });

    const galleryCardEl = document.querySelector('.gallery-card');
    const galleryCardElHeight = galleryCardEl.getBoundingClientRect().height;
    window.scrollBy({
      top: galleryCardElHeight * 3, // Прокрутка вниз на три висоти карточки
      behavior: 'smooth',
    });

    if (searchedPage === totalPages) {
      iziToast.info({
        message: `We're sorry, but you've reached the end of search results.`,
        messageSize: '16',
        messageColor: '#ffffff',
        backgroundColor: '#ffa000',
        position: 'topRight',
        maxWidth: '432',
        closeOnClick: true,
        timeout: 3500,
        close: false,
        iconUrl: infoIcon,
      });

      loadMoreBtnEl.classList.add('hidden');
    }
  } catch (error) {
    iziToast.error({
      message: `Something went wrong :${error}`,
      messageSize: '16',
      messageColor: '#ffffff',
      backgroundColor: '#ef4040',
      position: 'topRight',
      maxWidth: '432',
      closeOnClick: true,
      timeout: 3500,
      close: false,
      iconUrl: errorIcon,
    });
    // console.log(error);
  }
};

formEl.addEventListener('submit', onFormSubmit);

loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollBtnEl.style.opacity = '1'; // Плавно з'являється
    scrollBtnEl.style.pointerEvents = 'auto'; // Робимо активною
  } else {
    scrollBtnEl.style.opacity = '0'; // Плавно зникає
    scrollBtnEl.style.pointerEvents = 'none'; // Блокуємо натискання
  }
});

scrollBtnEl.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

