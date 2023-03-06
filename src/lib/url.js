import { get, isEmpty } from './lodash';

export const paramsToObject = (str) => {
  const pairs = str.slice(1).split('&');
  const items = pairs.reduce((obj, item) => {
    if (item !== '') {
      const pair = item.split('=');
      if (pair.length === 2) {
        // eslint-disable-next-line no-param-reassign
        obj[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
      }
    }
    return obj;
  }, {});
  return items;
};

export const decodeUrl = (str) => decodeURI(str).replace(/\+/g, ' ');

export const getLastPath = (path = '') => {
  const url = isEmpty(path) ? get(window, 'location.pathname', '') : path;
  const baseUrl = url.slice(-1) === '/' ? url.slice(0, Math.max(0, url.length - 1)) : url;
  const arrPath = baseUrl.split('/');
  return (arrPath.length > 0) ? arrPath[arrPath.length - 1] : '';
};

export const isCurrentPath = (path, value = '') => {
  const arrPath = path.split('/');
  return arrPath.some((item) => item === value);
};

export const getSrc = (url) => url; // .replace(':443', '').replace('http', 'https')
