const MONTHS_LONG = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const MONTHS_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const WEEKDAYS_SHORT = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];

export { MONTHS_LONG, MONTHS_SHORT, WEEKDAYS_SHORT };

export function mondayDow(date) {
  return (date.getDay() + 6) % 7;
}

export function buildMonthGrid(year, month) {
  const first = new Date(year, month, 1);
  const startDow = mondayDow(first);
  const rows = [];
  for (let r = 0; r < 6; r++) {
    const days = [];
    for (let c = 0; c < 7; c++) {
      const cellIdx = r * 7 + c;
      const cellDate = new Date(year, month, cellIdx - startDow + 1);
      const inMonth = cellDate.getMonth() === month;
      days.push({ cellDate, inMonth });
    }
    rows.push(days);
  }
  return rows;
}

export function formatMonthYear(year, month) {
  return `${MONTHS_LONG[month]} ${year}`;
}

export function formatDayShort(date) {
  return `${date.getDate()} ${MONTHS_SHORT[date.getMonth()]}`;
}

export function sameDay(a, b) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

export function dateDiffDays(a, b) {
  return Math.round((a - b) / 86400000);
}

export function dateKey(d) {
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}
