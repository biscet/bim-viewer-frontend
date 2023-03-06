import { isEmpty } from 'src/lib/lodash';

export const redirectSign = (url = '') => {
  if (!isEmpty(url)) window.location.href = url;
};
