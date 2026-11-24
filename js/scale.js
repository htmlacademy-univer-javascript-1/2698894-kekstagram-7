const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const scaleSmallerButton = document.querySelector('.scale__control--smaller');
const scaleBiggerButton = document.querySelector('.scale__control--bigger');
const scaleValueInput = document.querySelector('.scale__control--value');
const previewImage = document.querySelector('.img-upload__preview img');

const scaleImage = (value) => {
  scaleValueInput.value = `${value}%`;
  previewImage.style.transform = `scale(${value / 100})`;
};

const onSmallerButtonClick = () => {
  const currentValue = parseInt(scaleValueInput.value, 10);
  const newValue = currentValue - SCALE_STEP;
  if (newValue >= MIN_SCALE) {
    scaleImage(newValue);
  }
};

const onBiggerButtonClick = () => {
  const currentValue = parseInt(scaleValueInput.value, 10);
  const newValue = currentValue + SCALE_STEP;
  if (newValue <= MAX_SCALE) {
    scaleImage(newValue);
  }
};

const resetScale = () => {
  scaleImage(DEFAULT_SCALE);
};

scaleSmallerButton.addEventListener('click', onSmallerButtonClick);
scaleBiggerButton.addEventListener('click', onBiggerButtonClick);

export { resetScale };
