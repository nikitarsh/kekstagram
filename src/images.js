const picturesTemplate = document.querySelector('#picture')
  .content.querySelector('.picture');

const container = document.querySelector('.pictures');

const createImages = (pictures) => {
  document.querySelectorAll('.picture').forEach((thumbnail) => thumbnail.remove());
  const fragment = document.createDocumentFragment();

  pictures.forEach(({url, likes, description, comments, id}) => {
    const picture = picturesTemplate.cloneNode(true);

    picture.querySelector('.picture__img').src = url;
    picture.querySelector('.picture__img').alt = description;
    picture.querySelector('.picture__likes').textContent = likes;
    picture.querySelector('.picture__comments').textContent = comments.length;
    picture.dataset.id = id;

    fragment.append(picture);
  });

  container.append(fragment);
};

export { createImages };
