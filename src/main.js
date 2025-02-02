import { searchImages } from './js/pixabay-api.js';
import {
  renderImages,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let currentQuery = '';
let currentPage = 1;
const perPage = 15;

document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.querySelector('.search-form');
  const searchInput = document.querySelector('.search-input');
  const loadMoreBtn = document.querySelector('.load-more');

  searchInput.addEventListener('focus', () => {
    searchInput.classList.add('pressed');
  });

  searchInput.addEventListener('blur', () => {
    searchInput.classList.remove('pressed');
  });

  searchForm.addEventListener('submit', async event => {
    event.preventDefault();

    const query = searchInput.value.trim();

    if (!query) {
      iziToast.warning({
        title: 'Warning',
        message: 'Please enter a search query',
      });
      return;
    }

    currentQuery = query;
    currentPage = 1;

    clearGallery();
    showLoader();
    loadMoreBtn.style.display = 'none';

    try {
      const images = await searchImages(query, currentPage, perPage);
      const hasImages = renderImages(images, currentPage, perPage);

      if (hasImages && images.hits.length === perPage) {
        loadMoreBtn.style.display = 'block';
      }
    } catch (error) {
      console.error('Search error:', error);
      iziToast.error({
        title: 'Error',
        message: 'Failed to fetch images',
      });
    } finally {
      hideLoader();
      searchInput.value = '';
      searchInput.classList.remove('pressed');
    }
  });

  loadMoreBtn.addEventListener('click', async () => {
    currentPage += 1;
    showLoader();

    try {
      const images = await searchImages(currentQuery, currentPage, perPage);
      const hasImages = renderImages(images, currentPage, perPage);

      if (hasImages && images.hits.length === perPage) {
        const galleryItem = document.querySelector('.gallery-item');
        if (galleryItem) {
          const cardHeight = galleryItem.getBoundingClientRect().height;
          window.scrollBy({
            top: cardHeight * 2,
            behavior: 'smooth',
          });
        }
      } else {
        loadMoreBtn.style.display = 'none';
      }
    } catch (error) {
      console.error('Load more error:', error);
      iziToast.error({
        title: 'Error',
        message: 'Failed to load more images',
      });
    } finally {
      hideLoader();
    }
  });
});
