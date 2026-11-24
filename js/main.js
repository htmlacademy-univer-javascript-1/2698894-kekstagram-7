import { renderThumbnails } from './thumbnails.js';
import { initForm } from './form.js';
import { getData } from './api.js';
import { showAlert } from './message.js';

getData()
  .then((photos) => {
    renderThumbnails(photos);
  })
  .catch((err) => {
    showAlert(err.message);
  });

initForm();
