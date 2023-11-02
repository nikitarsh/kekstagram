import { isEscapeKeydown } from './util.js';

const COMMENTS_PER_PAGE = 5;

const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const commentsCount = document.querySelector('.comments-count');
const socialComment = bigPicture.querySelector('.big-picture__social').querySelector('.social__comment');

const commentsCurrentCount = document.querySelector('.comments-current-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentsList = bigPicture.querySelector('.social__comments');


let commentsShown = 0;
let comments = [];

const createComment = ({avatar, message, name}) => {
  const comment = socialComment.cloneNode(true);

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const renderComments = () => {
  commentsShown += COMMENTS_PER_PAGE;
  if (commentsShown >= comments.length) {
    commentsLoader.classList.add('hidden');
    commentsShown = comments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShown; i++) {
    const comment = createComment(comments[i]);
    fragment.append(comment);
  }

  commentsList.textContent = '';
  commentsList.append(fragment);
  commentsCurrentCount.textContent = commentsShown;
  commentsCount.textContent = comments.length;
};
const onMoreButtonClick = () => renderComments(comments);


const hideBigImage = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsShown = 0;
};

function onDocumentKeydown(evt) {
  if (isEscapeKeydown) {
    evt.preventDefault();
    hideBigImage();
  }
}

const onCloseButtonClick = () => {
  hideBigImage();
};

const renderImageDetails = ({url, likes, description}) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.big-picture__img img').alt = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;
};

const openBigImage = (data) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  commentsLoader.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  renderImageDetails(data);
  comments = data.comments;
  if (comments.length > 0) {
    renderComments(comments);
  }
};

closeButton.addEventListener('click', onCloseButtonClick);

commentsLoader.addEventListener('click', onMoreButtonClick);

export { openBigImage, hideBigImage };
