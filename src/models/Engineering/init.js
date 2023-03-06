import { sample } from 'effector';
import { debounce } from 'patronum/debounce';
// import { pending } from 'patronum/pending';
import { isEmpty } from 'src/lib/lodash';
import {
  // события
  setBucketsFn, setViewBucketFn, setMenuBucketFn,
  resetMenuBucketFn, setMenuItemFn, resetMenuItemFn,
  resetViewBucketFn, setModalBucketFn,
  deleteBucketFn, deleteObjectFn, setMenuItemDeleteFn,
  resendGetBucketsFn, setBucketDetailFn, setUploadFileFn,
  resetUploadFileFn, postModelFn, setUploadBucketIdFn,
  postTranslateFn, setOpenAccordionFn, getItemsFn,
  // хранилища
  $buckets, $viewBucket, $menuBucket, $menuItem,
  $modalBucket, $uploadBucketId,
  $menuItemDelete, $menuBucketDetail, $uploadFile,
  $loaderCreateBucket, $loaderResend, $loaderUpload,
  $openedAccordions,
  // эффекты
  getBucketsFx, postBucketFx, deleteBucketFx, getBucketsSecondFx,
  deleteObjectFx, postModelFx, postTranslateFx,
  // формы
  engineeringForm,
} from './index';

/// ///////////////////////////////////////////////////////////
// ================== БЛОК ОБРАБОТКИ ХРАНИЛИЩ ============== //
/// ///////////////////////////////////////////////////////////

$openedAccordions.on(setOpenAccordionFn, (store, id) => {
  const enableAccordion = store.find((accordion) => accordion === id);
  const accorions = store;

  return isEmpty(enableAccordion) ? [...accorions, id] : accorions.filter((accordion) => accordion !== id);
});

$buckets.on(setBucketsFn, (_, buckets) => buckets);

$uploadBucketId
  .on(setUploadBucketIdFn, (_, id) => id)
  .reset(resetUploadFileFn);

$uploadFile
  .on(setUploadFileFn, (_, file) => file)
  .reset(resetUploadFileFn);

$modalBucket.on(setModalBucketFn, (_, modal) => modal);

$menuItemDelete.on(setMenuItemDeleteFn, (_, detail) => detail);

$menuBucketDetail.on(setBucketDetailFn, (_, detail) => detail);

$menuItem
  .on(setMenuItemFn, (_, item) => item)
  .reset(resetMenuItemFn);

$menuBucket
  .on(setMenuBucketFn, (_, bucket) => bucket)
  .reset(resetMenuBucketFn);

$viewBucket
  .on(setViewBucketFn, (_, item) => `urn:${item}`)
  .reset(resetViewBucketFn);

/// ///////////////////////////////////////////////////////////
// ===================== БЛОК ОПЕРАТОРОВ =================== //
/// ///////////////////////////////////////////////////////////

sample({
  clock: getItemsFn,
  target: [
    getBucketsFx,
  ],
});

sample({
  clock: [getBucketsFx.doneData, getBucketsSecondFx.doneData],
  fn: (items) => items.data,
  target: setBucketsFn,
});

sample({
  clock: postTranslateFn,
  fn: (id) => {
    const fields = {
      objectName: id,
    };

    return fields;
  },
  target: postTranslateFx,
});

sample({
  clock: postModelFn,
  source: [$uploadBucketId, $uploadFile],
  fn: ([id, file]) => {
    const formData = new FormData();

    formData.append('fileToUpload', file);
    formData.append('bucketKey', id);

    return ({
      data: formData,
    });
  },
  target: postModelFx,
});

sample({
  clock: setModalBucketFn,
  filter: (modal) => isEmpty(modal),
  target: [
    engineeringForm.resetValues, engineeringForm.resetErrors,
    resetUploadFileFn,
  ],
});

sample({
  clock: deleteBucketFn,
  fn: (id) => {
    const fields = {
      bucketKey: id,
    };

    return fields;
  },
  target: deleteBucketFx,
});

sample({
  clock: engineeringForm.formValidated,
  fn: (formData) => {
    const fields = {
      bucketKey: formData.bucketKey,
      policyKey: formData.policyKey.value,
    };

    return fields;
  },
  target: postBucketFx,
});

sample({
  clock: [postBucketFx, postModelFx.doneData],
  fn: () => '',
  target: setModalBucketFn,
});

sample({
  clock: deleteObjectFn,
  fn: (data) => data,
  target: deleteObjectFx,
});

sample({
  clock: [deleteBucketFx.doneData,
    deleteObjectFx.doneData, postModelFx.doneData,
    postTranslateFx.doneData, postBucketFx.doneData],
  target: resendGetBucketsFn,
});

sample({
  source: debounce({
    source: resendGetBucketsFn,
    timeout: 50,
  }),
  target: getBucketsSecondFx,
});

// лоадеры
sample({
  clock: [resendGetBucketsFn, deleteObjectFn, deleteBucketFn],
  fn: () => true,
  target: $loaderResend,
});

sample({
  clock: postBucketFx,
  fn: () => true,
  target: [$loaderCreateBucket, $loaderResend],
});

sample({
  clock: postModelFn,
  fn: () => true,
  target: $loaderUpload,
});

sample({
  clock: setBucketsFn,
  fn: () => false,
  target: [$loaderCreateBucket, $loaderResend, $loaderUpload],
});
