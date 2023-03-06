import { format } from 'date-fns';

import { isEmpty } from 'src/lib/lodash';

export const formatISODate = (dateString) => {
  if (isEmpty(dateString)) return '';

  const date = new Date(dateString);
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    weekday: 'short',
    // year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return new Intl.DateTimeFormat('ru-RU', options).format(date);
};

export const getLastYear = () => {
  const date = new Date();
  return date.getFullYear();
};

const unitDay = {
  zero: 'дней',
  one: 'день',
  two: 'дня',
};

export const getUnitDay = (val) => {
  const lastNum = Number.parseInt(`${val}`.slice(-1), 10);
  let unit = 'one';
  if ([0, 5, 6, 7, 8, 9].includes(lastNum) || (val > 9 && val < 21)) {
    unit = 'zero';
  } else if ([2, 3, 4].includes(lastNum)) {
    unit = 'two';
  }
  return unitDay[unit];
};

export const getDateInterval = (val) => {
  const date = new Date();
  date.setDate(date.getDate() + val);
  return date.toLocaleDateString('ru-RU');
};

export const handlerDelayRun = (fn, time) => setTimeout(fn, time);

export const isValidСomparisonDate = (dateMin, dateMax) => {
  const arrDateMin = dateMin.split('.');
  const min = new Date(`${arrDateMin[2]}-${arrDateMin[1]}-${arrDateMin[0]}`);
  const arrDateMax = dateMax.split('.');
  const max = new Date(`${arrDateMax[2]}-${arrDateMax[1]}-${arrDateMax[0]}`);

  return max.getTime() > min.getTime();
};

export const isValidBeforeTodayDate = (date, numDay = 0) => {
  const arrDate = date.split('.');
  const validDate = new Date(`${arrDate[2]}-${arrDate[1]}-${arrDate[0]}`);
  const now = new Date();

  const value = isEmpty(numDay) ? validDate.getTime()
    : validDate.getTime() + (numDay * (1440 * 60000)); // кол-во дней * кол-во минут * кол-во силлискекунд в минуте
  return !(now.getTime() > value);
};

export const isValidPassportDate = (date, birthDate) => {
  const arrDate = date.split('.');
  const passportDate = `${arrDate[2]}-${arrDate[1]}-${arrDate[0]}`;
  const now = new Date();
  // дата рождения
  const objBirthDate = new Date(birthDate);
  // кол-во лет
  const diff = new Date(now.getTime() - objBirthDate.getTime());
  const age = diff.getUTCFullYear() - 1970;
  // дата выдачи
  const objPassportDate = new Date(passportDate);
  // если меньше 14 нах
  if (age < 14) {
    return false;
  }

  now.setFullYear(now.getFullYear());
  // если дата выдачи больше завтрашнего дня
  if (objPassportDate.getTime() >= now.getTime()) {
    return false;
  }
  objBirthDate.setFullYear((objBirthDate.getFullYear() + 14));
  // если < 20 лет и дата выдачи больше или равна даты рождения + 14 лет
  if (age < 20 && objPassportDate.getTime() >= objBirthDate.getTime()) {
    return true;
  }
  objBirthDate.setFullYear((objBirthDate.getFullYear() + 6));
  // если < 45 лет и дата выдачи больше или равна даты рождения + 20 лет
  if (age < 45 && objPassportDate.getTime() >= objBirthDate.getTime()) {
    return true;
  }
  objBirthDate.setFullYear((objBirthDate.getFullYear() + 25));
  // если Ю= 45 лет и дата выдачи больше или равна даты рождения + 45 лет
  if (age >= 45 && objPassportDate.getTime() >= objBirthDate.getTime()) {
    return true;
  }
  return false;
};

export const isValidBirthDate = (date) => {
  // дата рождения
  const arrDate = date.split('.');
  const birthDate = `${arrDate[2]}-${arrDate[1]}-${arrDate[0]}`;
  const objBirthDate = new Date(birthDate);

  const min = new Date(1920, 0, 1);
  // const max = new Date((getLastYear() - 18), 0, 1);
  const max = new Date();
  max.setFullYear((max.getFullYear() - 18));

  // если дата выдачи больше завтрашнего дня
  if (objBirthDate.getTime() < min.getTime()) {
    return false;
  }

  // если < 20 лет и дата выдачи больше или равна даты рождения + 14 лет
  if (objBirthDate.getTime() > max.getTime()) {
    return false;
  }

  return true;
};

export const isValidDateCard = (value) => {
  const [month, year] = value.split('/');
  const yearCard = Number.parseInt(`20${year}`, 10);
  const monthCard = Number.parseInt(month.replace(/^0+/, ''), 10);

  const max = new Date();
  const currentYear = max.getFullYear();
  const currentMonth = max.getMonth() + 1;

  return (currentYear < yearCard)
    || (currentYear === yearCard && currentMonth < monthCard);
};

export const getCurrentTime = () => {
  const date = new Date();
  // return date.toLocaleDateString('ru-RU');
  return date.toLocaleTimeString('ru-RU');
};

export const getDateReverse = (date) => {
  if (isEmpty(date)) {
    return date;
  }
  const arrDate = date.split('-');
  return `${arrDate[2]}.${arrDate[1]}.${arrDate[0]}`;
};

export const getDateFormatNormal = (val) => {
  if (isEmpty(val)) {
    return val;
  }

  const date = format(new Date(val), 'yyyy-MM-dd');
  return `${date}`;
};
