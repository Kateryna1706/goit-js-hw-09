const refs = {
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
  body: document.body,
};

let timerId;
refs.stop.setAttribute('disabled', '');

refs.start.addEventListener('click', onStart);
refs.stop.addEventListener('click', onStop);

function onStart() {
  timerId = setInterval(
    () => (refs.body.style.backgroundColor = getRandomHexColor()),
    1000
  );
  refs.start.setAttribute('disabled', '');
  refs.stop.removeAttribute('disabled');
}

function onStop() {
  clearInterval(timerId);
  refs.start.removeAttribute('disabled');
  refs.stop.setAttribute('disabled', '');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
