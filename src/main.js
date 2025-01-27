import { searchImages } from './js/pixabay-api.js';
import {
  renderImages,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';

document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.querySelector('.search-form');
  const searchInput = document.querySelector('.search-input');

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
      return;
    }

    clearGallery();
    showLoader();

    try {
      const images = await searchImages(query);
      renderImages(images);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      hideLoader();
      searchInput.value = '';
      searchInput.classList.remove('pressed');
    }
  });
});
