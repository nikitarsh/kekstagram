const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileUpload = document.querySelector('.img-upload__input[type=file]');
const uploadPreview = document.querySelector('.img-upload__preview img');
const effectsPreviews = document.querySelectorAll('.effects__preview');

const isValidFileName = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((it) => fileName.endsWith(it));
};

const setPreviewPictureListener = () => {
  fileUpload.addEventListener ('change', () => {
    const file = fileUpload.files[0];

    if (file && isValidFileName) {
      uploadPreview.src = URL.createObjectURL(file);
      effectsPreviews.forEach((preview) => {
        preview.style.backgroundImage = `url('${uploadPreview.src}')`;
      });
    }
  });
};

export { setPreviewPictureListener };
