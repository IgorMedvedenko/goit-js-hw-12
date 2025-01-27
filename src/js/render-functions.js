import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let lightbox;

export function clearGallery() {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';
}

export function renderImages(images) {
  const gallery = document.querySelector('.gallery');

  if (images.length === 0) {
    iziToast.error({
      title: 'Error',
      message:
        'Sorry, there are no images matching your search query. Please try again!',
    });
    return;
  }

  const imageMarkup = images
    .map(
      image => `
    <a href="${image.largeImageURL}" class="gallery-link">
      <div class="gallery-item">
        <img src="${image.webformatURL}" alt="${image.tags}" />
        <div class="image-info">
          <p>Likes: ${image.likes}</p>
          <p>Views: ${image.views}</p>
          <p>Comments: ${image.comments}</p>
          <p>Downloads: ${image.downloads}</p>
        </div>
      </div>
    </a>
  `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', imageMarkup);

  if (lightbox) {
    lightbox.destroy();
  }
  lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
}

export function showLoader() {
  const loader = document.querySelector('.loader');
  loader.style.display = 'block';
}

export function hideLoader() {
  const loader = document.querySelector('.loader');
  loader.style.display = 'none';
}
