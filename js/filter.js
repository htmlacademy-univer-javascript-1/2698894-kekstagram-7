const RANDOM_PICTURES_COUNT = 10;

const FilterId = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const filtersContainer = document.querySelector('.img-filters');
const filtersForm = filtersContainer.querySelector('.img-filters__form');

let currentFilter = FilterId.DEFAULT;
let defaultPictures = [];

const sortByComments = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;

const sortRandomly = () => Math.random() - 0.5;

const getFilteredPictures = () => {
  switch (currentFilter) {
    case FilterId.RANDOM:
      return defaultPictures.slice().sort(sortRandomly).slice(0, RANDOM_PICTURES_COUNT);
    case FilterId.DISCUSSED:
      return defaultPictures.slice().sort(sortByComments);
    case FilterId.DEFAULT:
    default:
      return defaultPictures.slice();
  }
};

const initFilters = (pictures, cb) => {
  defaultPictures = pictures.slice();
  filtersContainer.classList.remove('img-filters--inactive');

  filtersForm.addEventListener('click', (evt) => {
    const button = evt.target.closest('.img-filters__button');
    if (!button || button.id === currentFilter) {
      return;
    }

    filtersForm.querySelector('.img-filters__button--active')
      .classList.remove('img-filters__button--active');
    button.classList.add('img-filters__button--active');

    currentFilter = button.id;
    cb(getFilteredPictures());
  });
};

export { initFilters };
