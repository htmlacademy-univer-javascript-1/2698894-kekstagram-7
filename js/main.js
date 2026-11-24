import { renderThumbnails } from './thumbnails.js';
import { initForm } from './form.js';
import { getData } from './api.js';
import { showAlert } from './message.js';
import { initFilters } from './filter.js';
import { debounce } from './util.js';

getData()
  .then((photos) => {
    renderThumbnails(photos);
    initFilters(photos, debounce(renderThumbnails));
  })
  .catch((err) => {
    showAlert(err.message);
  });

initForm();
