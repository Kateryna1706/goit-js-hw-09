refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
};

let position = 0;

refs.form.addEventListener('submit', onSubmit);

function onSubmit() {
  const timerId = setTimeout(() => {
    position += 1;
    if (position > refs.amount.value) {
      clearTimeout(timerId);
    }
    createPromise(position, refs.delay.value)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }, refs.delay.value);
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve({position, delay});
    } else {
      reject({position, delay});
    }
  });
}