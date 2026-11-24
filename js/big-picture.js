import { isEscapeKey } from './util.js';

const COMMENTS_STEP = 5;

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImage = bigPictureElement.querySelector('.big-picture__img img');
const likesCount = bigPictureElement.querySelector('.likes-count');
const socialCaption = bigPictureElement.querySelector('.social__caption');
const commentsList = bigPictureElement.querySelector('.social__comments');
const commentCountBlock = bigPictureElement.querySelector('.social__comment-count');
const commentsLoader = bigPictureElement.querySelector('.comments-loader');
const cancelButton = bigPictureElement.querySelector('.big-picture__cancel');

let currentComments = [];
let shownCommentsCount = 0;

const createComment = ({ avatar, name, message }) => {
  const comment = document.createElement('li');
  comment.classList.add('social__comment');

  const image = document.createElement('img');
  image.classList.add('social__picture');
  image.src = avatar;
  image.alt = name;
  image.width = 35;
  image.height = 35;

  const text = document.createElement('p');
  text.classList.add('social__text');
  text.textContent = message;

  comment.append(image, text);
  return comment;
};

const renderNextComments = () => {
  const nextComments = currentComments.slice(shownCommentsCount, shownCommentsCount + COMMENTS_STEP);
  const fragment = document.createDocumentFragment();

  nextComments.forEach((comment) => {
    fragment.append(createComment(comment));
  });

  commentsList.append(fragment);
  shownCommentsCount += nextComments.length;

  commentCountBlock.innerHTML = `${shownCommentsCount} из <span class="comments-count">${currentComments.length}</span> комментариев`;

  if (shownCommentsCount >= currentComments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

const onCommentsLoaderClick = () => {
  renderNextComments();
};

const closeBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  shownCommentsCount = 0;
  currentComments = [];
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

cancelButton.addEventListener('click', () => {
  closeBigPicture();
});

const showBigPicture = ({ url, description, likes, comments }) => {
  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  bigPictureImage.src = url;
  bigPictureImage.alt = description;
  likesCount.textContent = likes;
  socialCaption.textContent = description;

  currentComments = comments;
  shownCommentsCount = 0;
  commentsList.innerHTML = '';

  commentCountBlock.classList.remove('hidden');
  renderNextComments();

  commentsLoader.addEventListener('click', onCommentsLoaderClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

export { showBigPicture };
