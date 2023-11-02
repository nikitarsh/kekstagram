import { isEscapeKeydown } from './util.js';
import { initScale, resetScale} from './scale.js';
import { resetEffects } from './effects.js';
import { showSuccessMessage, showErrorMessage } from './messages.js';
import { sendData } from './api.js';

const MAX_NUMBER_OF_HASHTAGS = 5;
const MAX_NUMBER_OF_CHARACTERS = 140;
const VALID_CHARACTERS = /^#[a-zа-яё0-9]{1,19}$/i;

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};


const form = document.querySelector('.img-upload__form');
const hashtagInput = form.querySelector('.text__hashtags');
const textareaInput = form.querySelector('.text__description');
const submitButton = form.querySelector('.img-upload__submit');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadInput = document.querySelector('.img-upload__input');
const closeButton = document.querySelector('.img-upload__cancel');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent:'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error'
});

const normalizeTags = (tagString) => tagString
  .trim()
  .split(' ')
  .filter((tag) => Boolean(tag.length));

const checkHashtagCount = (value) => normalizeTags(value).length <= MAX_NUMBER_OF_HASHTAGS;
const checkTextareaLength = (value) => (value).length <= MAX_NUMBER_OF_CHARACTERS;
const checkHashtagSymbols = (value) => normalizeTags(value).every((tag) => VALID_CHARACTERS.test(tag));

const checkHashtagUniqueness = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

pristine.addValidator(
  hashtagInput,
  checkHashtagCount,
  `Максимальное количество хэш-тегов ${MAX_NUMBER_OF_HASHTAGS}`,
  true
);

pristine.addValidator(
  hashtagInput,
  checkHashtagUniqueness,
  'Хэш-теги не должны повторяться',
  true
);

pristine.addValidator(
  hashtagInput,
  checkHashtagSymbols,
  'Хэш-тег должен содержать от 1 до 19 букв или цифр после знака #',
  true
);

pristine.addValidator(
  textareaInput,
  checkTextareaLength,
  `Длина комментария не может составлять больше ${MAX_NUMBER_OF_CHARACTERS} символов`,
  true
);

const isTextFieldFocused = () =>
  document.activeElement === document.querySelector('.text__hashtags') ||
  document.activeElement === document.querySelector('.text__description');

function onDocumentKeydown (evt) {
  if(isEscapeKeydown(evt) && !isTextFieldFocused()) {
    closeEditingModal();
  }
}

function closeEditingModal() {
  form.reset();
  pristine.reset();
  resetScale();
  resetEffects();
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadInput.value = '';
}

const onCloseButtonClick = () => {
  closeEditingModal();
};

const openEditingModal = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
  initScale();
  resetEffects();
};

const onUploadInputChange = () => {
  openEditingModal();
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const sendingData = async (data) => {
  try {
    await sendData(data);
    closeEditingModal();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
};

uploadInput.addEventListener('change', onUploadInputChange);

form.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    blockSubmitButton();
    const formData = new FormData(form);
    await sendingData(formData);
    unblockSubmitButton();
  }
});

export { closeEditingModal, onDocumentKeydown };
