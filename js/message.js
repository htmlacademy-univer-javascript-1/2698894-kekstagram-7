import { isEscapeKey } from './util.js';

const ALERT_SHOW_TIME = 5000;

const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const showMessage = (template, closeButtonClass) => {
  const messageElement = template.cloneNode(true);
  document.body.append(messageElement);

  const closeButton = messageElement.querySelector(closeButtonClass);

  const closeMessage = () => {
    messageElement.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
  };

  function onDocumentKeydown(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      evt.stopPropagation();
      closeMessage();
    }
  }

  const onOverlayClick = (evt) => {
    if (evt.target === messageElement) {
      closeMessage();
    }
  };

  closeButton.addEventListener('click', closeMessage);
  messageElement.addEventListener('click', onOverlayClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const showSuccessMessage = () => {
  showMessage(successTemplate, '.success__button');
};

const showErrorMessage = () => {
  showMessage(errorTemplate, '.error__button');
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'fixed';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = '#ff4d4d';
  alertContainer.style.color = '#ffffff';
  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export { showSuccessMessage, showErrorMessage, showAlert };
