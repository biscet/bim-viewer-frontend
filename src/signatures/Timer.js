export const timerSign = (value = 60000) => new Promise((resolve) => {
  setTimeout(() => resolve(), value);
});
