const EFFECTS = {
  none: {
    name: 'none',
    min: 1,
    max: 100,
    step: 1,
    start: 100,
  },
  chrome: {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  sepia: {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  marvin: {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  phobos: {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  heat: {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  }
};

const DEFAULT_EFFECT = EFFECTS.none;

const uploadForm = document.querySelector('.img-upload__form');
const uploadPreview = uploadForm.querySelector('.img-upload__preview img');
const filterSlider = uploadForm.querySelector('.effect-level__slider');
const filterLevelValue = uploadForm.querySelector('.effect-level__value');
const filterLevel = uploadForm.querySelector('.effect-level');
const filterForm = document.querySelector('.effects');

let currentEffect = DEFAULT_EFFECT;

noUiSlider.create((filterSlider), {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  step: DEFAULT_EFFECT.step,
  start: DEFAULT_EFFECT.max,
  connect: 'lower',
});

const updateSlider = () => {
  filterSlider.classList.remove('hidden');
  filterLevel.classList.remove('hidden');
  filterSlider.noUiSlider.updateOptions({
    range: {
      min: currentEffect.min,
      max: currentEffect.max,
    },
    step: currentEffect.step,
    start: currentEffect.max,
  });

  if (currentEffect === DEFAULT_EFFECT) {
    filterSlider.classList.add('hidden');
    filterLevel.classList.add('hidden');
  }
};

const onFiltersChange = (evt) => {
  if (evt.target.type === 'radio') {
    currentEffect = EFFECTS[evt.target.value];
    updateSlider();
  }
};

const onFiltersUpdate = () => {
  uploadPreview.style.filter = 'none';
  uploadPreview.className = '';
  filterLevelValue.value = '';
  if (currentEffect === DEFAULT_EFFECT) {
    return;
  }
  const sliderValue = filterSlider.noUiSlider.get();
  uploadPreview.style.filter = `${currentEffect.style}(${sliderValue}${currentEffect.unit})`;
  uploadPreview.classList.add(`effects__preview--${currentEffect.name}`);
  filterLevelValue.value = sliderValue;
};

filterForm.addEventListener('change', onFiltersChange);
filterSlider.noUiSlider.on('update', onFiltersUpdate);

const resetEffects = () => {
  currentEffect = DEFAULT_EFFECT;
  updateSlider();
};

export { resetEffects };
