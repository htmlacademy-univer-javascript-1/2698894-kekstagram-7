import { showBigPicture } from './big-picture.js';

const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const container = document.querySelector('.pictures');

const createThumbnail = (picture) => {
  const { url, description, likes, comments } = picture;
  const pictureElement = pictureTemplate.cloneNode(true);
  const image = pictureElement.querySelector('.picture__img');

  image.src = url;
  image.alt = description;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;

  pictureElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    showBigPicture(picture);
  });

  return pictureElement;
};

const renderThumbnails = (pictures) => {
  container.querySelectorAll('.picture').forEach((element) => element.remove());
  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    fragment.append(createThumbnail(picture));
  });

  container.append(fragment);
};

export { renderThumbnails };
