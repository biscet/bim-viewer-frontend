export const NOT_FOUND_PAGE_REDIRECT_MS = 500;

export const API_LINK = 'https://bim-viewer-api.onrender.com/';

export const styles = {
  input: { width: '100%' },
};

export const options = [
  { value: 'transient', label: 'Переходные' },
  { value: 'temporary', label: 'Временные' },
  { value: 'persistent', label: 'Постоянные' },
];

export const MODAL_TYPES = {
  upload: 'uploadModel',
  detail: 'bucketDetail',
  create: 'createBucket',
};
