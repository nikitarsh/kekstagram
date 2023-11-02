import { createImages } from './images.js';
import { debounce } from './util.js';

const PHOTOS_COUNT = 10;

const filters = document.querySelector('.img-filters');
const filtersForm = document.querySelector('.img-filters__form');
const filterButtons = document.querySelectorAll('.img-filters__button');
const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');


const sortRandomly = () => Math.random() - 0.5;

const sortDiscussed = (photoA, photoB) => photoB.comments.length - photoA.comments.length;

const getFilteredPhotos = (pictures, sortButton) => {

  if (sortButton === filterDefault) {
    return pictures;
  }

  if (sortButton === filterRandom) {
    return pictures.slice().sort(sortRandomly).slice(0, PHOTOS_COUNT);
  }

  if (sortButton === filterDiscussed) {
    return pictures.slice().sort(sortDiscussed);
  }
};

const debouncedCreateImages = debounce(createImages);

const setOnFilterClick = (evt, pictures) => {
  filterButtons.forEach((button) => button.classList.remove('img-filters__button--active'));

  const filterButton = evt.target;
  filterButton.classList.add('img-filters__button--active');

  debouncedCreateImages(getFilteredPhotos(pictures, filterButton));
};

const initFilters = (pictures) => {
  filters.classList.remove('img-filters--inactive');
  filtersForm.addEventListener('click', ((evt) => {
    setOnFilterClick(evt, pictures);
  }));
};

export { initFilters };
