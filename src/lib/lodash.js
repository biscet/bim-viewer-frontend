export const isString = (str) => (str && typeof str.valueOf() === 'string');

export const isObject = (value) => {
  const type = typeof value;
  return !!value && (type === 'object' || type === 'function');
};

export const isArray = (value) => !!value && value.constructor === Array;

// Проверяет, является ли значение пустым объектом или коллекцией.
export const isEmpty = (obj) => [Object, Array].includes((obj || {}).constructor)
    && Object.entries((obj || {})).length === 0;

/* если установлен флаг true, то даже при наличия свойства если значения будет isEmpty,
то то вернется значение по дефолту value */
export const get = (object, path, value, check = false) => {
  const pathArray = Array.isArray(path) ? path : path.split('.').filter((key) => key);
  const pathArrayFlat = pathArray.flatMap((part) => (typeof part === 'string' ? part.split('.') : part));
  const checkValue = pathArrayFlat.reduce((obj, key) => obj && obj[key], object);
  return checkValue === undefined ? value : (!check && !isEmpty(checkValue) ? checkValue : value);
};

/* Проверяет, является ли ключ прямым свойством объекта.
Ключ может быть путем к значению, разделенному знаком.
has(object, 'a') => true || false */
export const has = (obj, key) => {
  const keyParts = key.split('.');
  return !!obj && (
    keyParts.length > 1
      ? has(obj[key.split('.')[0]], keyParts.slice(1).join('.'))
      : hasOwnProperty.call(obj, key)
  );
};

/* Создает объект, состоящий из предиката свойств объекта, который возвращает true для.
 console.log(pickBy({ 'a': 1, 'b': null, 'c': 3, 'd': false, 'e': undefined })) => {a: 1, c: 3} */
export const pickBy = (object) => {
  const obj = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const key in object) {
    if (object[key]) {
      obj[key] = object[key];
    }
  }
  return obj;
};

// Сравнивает два объекта, учитывая вложенность
export const isEqual = (object1, object2) => {
  const props1 = Object.getOwnPropertyNames(object1);
  const props2 = Object.getOwnPropertyNames(object2);

  if (props1.length !== props2.length) {
    return false;
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const prop of props1) {
    const bothAreObjects = typeof (object1[prop]) === 'object' && typeof (object2[prop]) === 'object';

    if ((!bothAreObjects && (object1[prop] !== object2[prop]))
        || (bothAreObjects && !isEqual(object1[prop], object2[prop]))) {
      return false;
    }
  }

  return true;
};

/* Пересечение массивов
 const arrayA = [1, 2, 3, 4, 5]; const arrayB = [2, 3];
 intersection(arrayA, arrayB); // [2, 3] */
export const intersection = (a, b) => a.filter((value) => b.includes(value));

// random массива
export const random = (items) => items[Math.floor(Math.random() * items.length)];

export const getDefault = (value, valueDefault = '-') => (!isEmpty(value) ? value : valueDefault);

export const getObjDefault = (obj, key, valueDefault = '-') => getDefault(get(obj, key, ''), valueDefault);

export const getNameForTab = (tabs, url) => {
  let tabName = String;

  tabs.forEach((tab) => {
    const path = tab.path.split('/');
    const [name] = path;

    if (url.search(path[0]) !== -1) {
      tabName = name;
    }
  });

  return tabName;
};
