import { onDocumentKeydown } from './form.js';
import { isEscapeKeydown } from './util.js';

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successModal = successTemplate.cloneNode(true);
const errorModal = errorTemplate.cloneNode(true);

const onSuccessCloseButtonClick = () => {
  closeSuccessMessage();
};

const onErrorCloseButtonClick = () => {
  closeErrorMessage();
};

const onSuccessDocumentClick = (evt) => {
  evt.preventDefault();

  if (!evt.target.closest('.success__inner')) {
    closeSuccessMessage();
  }
};

const onErrorDocumentClick = (evt) => {
  evt.preventDefault();

  if (!evt.target.closest('.error__inner')) {
    closeErrorMessage();
  }
};

function isEscPress(evt, cb) {
  if (isEscapeKeydown) {
    evt.preventDefault();
    cb();
  }
}


const onErrorDocumentKeydown = (evt) => isEscPress(evt, closeErrorMessage);
const onSuccessDocumentKeydown = (evt) => isEscPress(evt, closeSuccessMessage);


const showSuccessMessage = () => {
  document.body.append(successModal);

  successModal.querySelector('.success__button').addEventListener('click', onSuccessCloseButtonClick);
  document.addEventListener('click', onSuccessDocumentClick);
  document.addEventListener('keydown', onSuccessDocumentKeydown);
};

function closeSuccessMessage() {
  document.body.querySelector('.success').remove();

  document.removeEventListener('click', onSuccessDocumentClick);
  document.removeEventListener('keydown', onSuccessDocumentKeydown);
}

const showErrorMessage = () => {
  document.body.append(errorModal);

  errorModal.querySelector('.error__button').addEventListener('click', onErrorCloseButtonClick);
  document.addEventListener('click', onErrorDocumentClick);
  document.addEventListener('keydown', onErrorDocumentKeydown);
  document.removeEventListener('keydown', onDocumentKeydown);
};

function closeErrorMessage() {
  document.body.querySelector('.error').remove();

  document.removeEventListener('click', onErrorDocumentClick);
  document.removeEventListener('keydown', onErrorDocumentKeydown);
  document.addEventListener('keydown', onDocumentKeydown);
}

export{ showErrorMessage,showSuccessMessage };
