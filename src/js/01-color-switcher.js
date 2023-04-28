const refs = {
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
  body: document.body,
};

let timerId;

refs.start.addEventListener('click', onStart);
refs.stop.addEventListener('click', onStop);

function onStart() {
  timerId = setInterval(
    () => (refs.body.style.backgroundColor = getRandomHexColor()),
    1000
  );
  refs.start.setAttribute('disabled', '');
}

function onStop() {
  clearInterval(timerId);
  refs.start.removeAttribute('disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
