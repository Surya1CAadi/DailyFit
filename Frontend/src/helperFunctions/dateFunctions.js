
export function convertTo12HourFormat(hour) {
  if (hour === 0) {
    return "12:00 AM";
  } else if (hour === 12) {
    return "12:00 PM";
  } else if (hour < 12) {
    return hour + ":00 AM";
  } else {
    return hour - 12 + ":00 PM";
  }
}

export function convertTo_yyyy_mm_dd(date){
  date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function convertToDMY(yyyy_mm_dd){
  // 2024-06-11 to 11/6/2024
  let parts = yyyy_mm_dd.split("-");
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

//yes week starts from thursday
export const weekDays = ['Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday'];

//returns D/M/Y
export const getIndianLocaleDate = (d) => {
  const options = {timeZone: 'Asia/Kolkata'};
  return new Date(d || new Date()).toLocaleDateString('en-IN', options);
}

export const formatTo_yyyy_mm_dd = (DsMsY) => {
  const parts = DsMsY.split('/');
  return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
}

export const getWeekNumber = (yyyy_mm_dd) => {
  function getWeeksPassed(startDate, endDate) {
    const millisecondsInWeek = 1000 * 60 * 60 * 24 * 7;
    const diffInMilliseconds = endDate - startDate;
    return Math.floor(diffInMilliseconds / millisecondsInWeek);
  }

  const startDate = new Date(0); // Unix epoch time (January 1, 1970)
  const endDate = new Date(yyyy_mm_dd); // Specify the end date in 'yyyy-mm-dd' format
  return getWeeksPassed(startDate, endDate);
}

//returns the next or current Date for input weekDay
export const getNextCurrentDate = (dayName) => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = new Date();
  const currentDay = today.getDay();
  const targetDay = daysOfWeek.indexOf(dayName);

  let daysToAdd = (targetDay - currentDay);
  daysToAdd = daysToAdd < 0 ? 7 + daysToAdd : daysToAdd;

  const nextDate = new Date(today);
  nextDate.setDate(today.getDate() + daysToAdd);

  return nextDate;
}

export const getDayOfWeek = (yyyy_MM_DD) => {
  const options = {timeZone: 'Asia/Kolkata'};
  const date = new Date(yyyy_MM_DD + 'T00:00:00');
  return date.toLocaleDateString('en-US', {weekday: 'long', timeZone: options.timeZone});
}

//for 'Sunday' return the current or next sunday
export const getCurrentNextDate = (weekDay) => {
  for (let i = 0; i < 7; i++) {
    const options = {timeZone: 'Asia/Kolkata'};
    const dateISO = new Date();
    dateISO.setDate(dateISO.getDate() + i);
    const dateIND = new Date(dateISO).toLocaleDateString('en-IN', options);
    const wd = this.getDayOfWeek(this.formatTo_yyyy_mm_dd(dateIND));
    if (wd === weekDay) return dateISO;
  }
}


