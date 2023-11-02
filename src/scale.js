const ImageScale = {
  MIN: 25,
  MAX: 100,
  DEFAULT: 100,
  STEP: 25
};

const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');
const scaleInput = document.querySelector('.scale__control--value');
const photoPreview = document.querySelector('.img-upload__preview img');

const setScale = (value) => {
  scaleInput.value = `${value}%`;
  photoPreview.style.transform = `scale(${value / 100})`;
};

const onDecreaseButtonClick = () => {
  const currentValue = parseInt (scaleInput.value, 10);
  const newValue = Math.max(currentValue - ImageScale.STEP, ImageScale.MIN);
  setScale(newValue);
};

const onIncreaseButtonClick = () => {
  const currentValue = parseInt (scaleInput.value, 10);
  const newValue = Math.min(currentValue + ImageScale.STEP, ImageScale.MAX);
  setScale(newValue);
};

const resetScale = () => {
  setScale(ImageScale.DEFAULT);
};

const initScale = () => {
  smallerButton.addEventListener('click', onDecreaseButtonClick);
  biggerButton.addEventListener('click', onIncreaseButtonClick);
};

export { initScale, resetScale };
