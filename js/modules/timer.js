function timerModal(id, deadline){
  // Timer

  function getTimeRemain(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date());
    let days, hours, minutes, seconds;
    if (t < 0) {
      days = hours = minutes = seconds = 0;
    } else {
      days = Math.floor(t / 1000 / 60 / 60 / 24),
      hours = Math.floor((t / 1000 / 60 / 60) % 24),
      minutes = Math.floor((t / 1000 / 60) % 60),
      seconds = Math.floor((t / 1000) % 60);
    }
    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }
  function setTimeClock(selector, endtime) {
    const clock = document.querySelector(selector),
          days = clock.querySelector("#days"),
          hours = clock.querySelector("#hours"),
          minutes = clock.querySelector("#minutes"),
          seconds = clock.querySelector("#seconds"),
          timerId = setInterval(updateTimeClock, 1000);

    updateTimeClock();

    function updateTimeClock() {
      const t = getTimeRemain(endtime);

      function getZero(num) {
        return num < 10 ? `0${num}` : num;
      }

      (days.textContent = getZero(t.days)),
        (hours.textContent = getZero(t.hours)),
        (minutes.textContent = getZero(t.minutes)),
        (seconds.textContent = getZero(t.seconds));

      if (endtime == t.total) clearInterval(timerId);
    }
  }
  setTimeClock(id, deadline);
}

export default timerModal;