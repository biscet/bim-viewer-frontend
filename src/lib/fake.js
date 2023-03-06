const getRandom = (min = 1, max = 10) => Math.floor(Math.random() * (max - min + 1)) + min;

export const getHash = () => {
  let str = '';
  while (str.length < 24) {
    str += `${getRandom()}`;
  }
  return str;
};
