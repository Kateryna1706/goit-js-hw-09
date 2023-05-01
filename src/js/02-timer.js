import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  start: document.querySelector('[data-start]'),
  datetimePicker: document.querySelector('#datetime-picker'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let time;
let timer;

refs.start.setAttribute('disabled', '');

refs.start.addEventListener('click', onStart);

const calendar = flatpickr(refs.datetimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentTime = Date.now();
    if (selectedDates[0] < currentTime) {
      window.alert('Please choose a date in the future');
    } else {
      refs.start.removeAttribute('disabled');
    }
    console.log(selectedDates[0]);
  },
});

function onStart() {
  const startTime = Date.now();
  setInterval(() => {
    calendar.formatDate(calendar.selectedDates[0], 'U');
    console.log(calendar.selectedDates[0]);
    time = calendar.selectedDates[0] - startTime;
    // console.log(Number(time);
    timer = convertMs(time);
    // console.log(timer);
    updateClockFace(timer);
    
  }, 1000);
}

function updateClockFace({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);

  const hours = Math.floor((ms % day) / hour);

  const minutes = Math.floor(((ms % day) % hour) / minute);

  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
