import { storage } from 'src/lib/storage';
import { getLang } from 'src/lib/lang';
import { LANG } from 'src/dict/config';

export const getLangSign = () => getLang();

export const changeLangSign = (lang) => {
  storage.set(LANG, lang);
  return lang;
};
