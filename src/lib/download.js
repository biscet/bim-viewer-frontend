export const downloadFileByLink = (link) => {
  const downloadObj = document.createElement('a');
  downloadObj.href = `${link}?1`;

  document.body.append(downloadObj);
  downloadObj.click();
  downloadObj.remove();
};

export const openFile = ({ data, type }) => {
  const url = window.URL.createObjectURL(new Blob([data], { type }));
  window.open(url);
};
