import { isEscapeKey } from './util.js';
import { resetScale } from './scale.js';
import { resetEffects } from './effects.js';
import { sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './message.js';

const MAX_HASHTAGS_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;
const VALID_HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...',
};

const form = document.querySelector('.img-upload__form');
const overlay = form.querySelector('.img-upload__overlay');
const fileField = form.querySelector('.img-upload__input');
const cancelButton = form.querySelector('.img-upload__cancel');
const hashtagsField = form.querySelector('.text__hashtags');
const commentField = form.querySelector('.text__description');
const submitButton = form.querySelector('.img-upload__submit');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const normalizeTags = (tagString) => tagString.trim().split(/\s+/).filter((tag) => Boolean(tag.length));

const validateHashtagsCount = (value) => normalizeTags(value).length <= MAX_HASHTAGS_COUNT;

const validateHashtagsUnique = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateHashtagsFormat = (value) => {
  const tags = normalizeTags(value);
  return tags.every((tag) => VALID_HASHTAG_REGEX.test(tag));
};

const validateCommentLength = (value) => value.length <= MAX_COMMENT_LENGTH;

pristine.addValidator(
  hashtagsField,
  validateHashtagsCount,
  'Нельзя указать больше пяти хэш-тегов',
  3,
  true
);

pristine.addValidator(
  hashtagsField,
  validateHashtagsUnique,
  'Один и тот же хэш-тег не может быть использован дважды',
  2,
  true
);

pristine.addValidator(
  hashtagsField,
  validateHashtagsFormat,
  'Введён невалидный хэш-тег',
  1,
  true
);

pristine.addValidator(
  commentField,
  validateCommentLength,
  'Длина комментария не может составлять больше 140 символов'
);

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const openForm = () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  resetScale();
  resetEffects();
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeForm = () => {
  form.reset();
  pristine.reset();
  resetScale();
  resetEffects();
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const isErrorMessageShown = () => Boolean(document.querySelector('.error'));

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !isErrorMessageShown()) {
    evt.preventDefault();
    closeForm();
  }
}

const onFieldKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

hashtagsField.addEventListener('keydown', onFieldKeydown);
commentField.addEventListener('keydown', onFieldKeydown);

fileField.addEventListener('change', () => {
  openForm();
});

cancelButton.addEventListener('click', () => {
  closeForm();
});

const onFormSubmit = (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();

  if (isValid) {
    blockSubmitButton();
    sendData(new FormData(evt.target))
      .then(() => {
        closeForm();
        showSuccessMessage();
      })
      .catch(() => {
        showErrorMessage();
      })
      .finally(unblockSubmitButton);
  }
};

const initForm = () => {
  form.addEventListener('submit', onFormSubmit);
};

export { initForm, closeForm };
