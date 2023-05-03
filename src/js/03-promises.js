const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
};

refs.form.addEventListener('submit', onSubmit);

let position = 0;
let delay = 0;
let step = 0;
let amount = 0;

function onSubmit(event) {
  event.preventDefault();
  delay = Number(refs.delay.value);
  step = Number(refs.step.value);
  amount = Number(refs.amount.value);
  const timerId = setInterval(() => {
    if (position === amount) {
      clearInterval(timerId);
      return;
    }
    position += 1;
    createPromise(position, delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }, delay);
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });
}
