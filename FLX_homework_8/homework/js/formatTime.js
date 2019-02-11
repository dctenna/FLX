function formatTime(minutesTotal) {
  let hours = 0;
  let days = 0;
  let minutes = minutesTotal;

  if (minutesTotal >= 60) {
    minutes = minutesTotal % 60;
    hours = (minutesTotal - minutesTotal % 60) / 60;

    if (minutesTotal >= 1440) {
      let hoursTotal = (minutesTotal - minutesTotal % 60) / 60;
      hours = hoursTotal % 24;
      days = (hoursTotal - hoursTotal % 24) / 24;
    }
  }
  return days + ' day(s) ' + hours + ' hour(s) ' + minutes + ' minute(s).';
}

formatTime(120);