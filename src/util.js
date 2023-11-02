const TIMEOUT = 500;

const isEscapeKeydown = (evt) => evt.key === 'Escape';


const showAllert = (message) => {
  const messageAlert = document.createElement('div');
  messageAlert.style.position = 'absolute';
  messageAlert.style.zIndex = '100';
  messageAlert.style.left = 0;
  messageAlert.style.top = 0;
  messageAlert.style.right = 0;
  messageAlert.style.textAlign = 'center';
  messageAlert.style.fontSize = '26px';
  messageAlert.style.backgroundColor = 'red';

  messageAlert.textContent = message;

  document.body.append(messageAlert);
  setTimeout(() => {
    messageAlert.remove();
  }, TIMEOUT);
};

const debounce = (callback, timeoutDelay = TIMEOUT) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};


export { isEscapeKeydown , showAllert , debounce, };
