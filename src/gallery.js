import { openBigImage } from './big-image.js';
import { createImages } from './images.js';

const container = document.querySelector('.pictures');

const initGallery = (pictures) => {
  container.addEventListener('click', (evt) => {
    const photo = evt.target.closest('[data-id]');
    if (!photo) {
      return;
    }

    evt.preventDefault();
    const picture = pictures.find((item) => item.id === +photo.dataset.id);
    openBigImage(picture);
  });
  createImages(pictures, container);
};

export { initGallery };
