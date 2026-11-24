import { createPhotos } from './data.js';
import { renderThumbnails } from './thumbnails.js';
import { initForm } from './form.js';

renderThumbnails(createPhotos());
initForm();
