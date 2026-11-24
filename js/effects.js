const EFFECTS = {
  none: {
    min: 0,
    max: 100,
    step: 1,
    unit: '',
    filter: '',
  },
  chrome: {
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
    filter: 'grayscale',
  },
  sepia: {
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
    filter: 'sepia',
  },
  marvin: {
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
    filter: 'invert',
  },
  phobos: {
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
    filter: 'blur',
  },
  heat: {
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
    filter: 'brightness',
  },
};

const DEFAULT_EFFECT = EFFECTS.none;

const previewImage = document.querySelector('.img-upload__preview img');
const effectLevelContainer = document.querySelector('.img-upload__effect-level');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');

let currentEffect = DEFAULT_EFFECT;

noUiSlider.create(effectLevelSlider, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  start: DEFAULT_EFFECT.max,
  step: DEFAULT_EFFECT.step,
  connect: 'lower',
});

const isDefaultEffect = () => currentEffect === DEFAULT_EFFECT;

const updateSlider = () => {
  if (isDefaultEffect()) {
    effectLevelContainer.classList.add('hidden');
    previewImage.style.filter = '';
    effectLevelValue.value = '';
    return;
  }

  effectLevelContainer.classList.remove('hidden');
  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: currentEffect.min,
      max: currentEffect.max,
    },
    start: currentEffect.max,
    step: currentEffect.step,
  });
};

const onEffectsListChange = (evt) => {
  const effectRadio = evt.target.closest('.effects__radio');
  if (!effectRadio) {
    return;
  }

  currentEffect = EFFECTS[effectRadio.value];
  updateSlider();
};

const onSliderUpdate = () => {
  if (isDefaultEffect()) {
    return;
  }

  const sliderValue = effectLevelSlider.noUiSlider.get();
  effectLevelValue.value = sliderValue;
  previewImage.style.filter = `${currentEffect.filter}(${sliderValue}${currentEffect.unit})`;
};

const resetEffects = () => {
  currentEffect = DEFAULT_EFFECT;
  document.querySelector('#effect-none').checked = true;
  updateSlider();
};

effectLevelContainer.classList.add('hidden');
effectsList.addEventListener('change', onEffectsListChange);
effectLevelSlider.noUiSlider.on('update', onSliderUpdate);

export { resetEffects };
