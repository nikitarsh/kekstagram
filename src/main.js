import { createImages } from './images.js';
import { getData } from './api.js';
import { showAllert } from './util.js';
import { closeEditingModal } from './form.js';
import { initFilters } from './filters.js';
import { setPreviewPictureListener } from './upload.js';
import { initGallery } from './gallery.js';

setPreviewPictureListener();
closeEditingModal();

try {
  const data = await getData();
  createImages(data);
  initFilters(data);
  initGallery(data);
} catch (err) {
  showAllert(err.message);
}
