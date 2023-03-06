import { combine, createDomain } from 'effector';
import { createForm } from 'effector-forms';
import { persist } from 'effector-storage/local';
import { pending } from 'patronum/pending';
import { rules } from 'src/lib/rules';
import {
  getBucketsSign,
  postBucketSign,
  deleteBucketSign,
  deleteObjectSign,
  postModelSign,
  postTranslationSign,
} from 'src/api/signatures/Engineering';

export const engineeringDomain = createDomain('Engineering');

/// ///////////////////////////////////////////////////////////
// ================== СЛОВАРИ / КОНСТАНТЫ ================== //
/// ///////////////////////////////////////////////////////////

/// ///////////////////////////////////////////////////////////
// ===================== ЮНИТЫ СОБЫТИЙ ===================== //
/// ///////////////////////////////////////////////////////////

export const setBucketsFn = engineeringDomain.createEvent('setBucketsFn');

export const setViewBucketFn = engineeringDomain.createEvent('setViewBucketFn');
export const resetViewBucketFn = engineeringDomain.createEvent('resetViewBucketFn');

export const setMenuBucketFn = engineeringDomain.createEvent('setMenuBucketFn');
export const setMenuItemFn = engineeringDomain.createEvent('setMenuItemFn');
export const setMenuItemDeleteFn = engineeringDomain.createEvent('setMenuItemDeleteFn');
export const resetMenuBucketFn = engineeringDomain.createEvent('resetMenusBucketFn');
export const resetMenuItemFn = engineeringDomain.createEvent('resetMenuItemFn');
export const setBucketDetailFn = engineeringDomain.createEvent('setBucketDetailFn');

export const setModalBucketFn = engineeringDomain.createEvent('setModalBucketFn');

export const setUploadFileFn = engineeringDomain.createEvent('setUploadFileFn');
export const resetUploadFileFn = engineeringDomain.createEvent('resetUploadFileFn');
export const setUploadBucketIdFn = engineeringDomain.createEvent('setUploadBucketIdFn');

export const deleteBucketFn = engineeringDomain.createEvent('deleteBucketFn');
export const deleteObjectFn = engineeringDomain.createEvent('deleteObjectFn');

export const resendGetBucketsFn = engineeringDomain.createEvent('resendGetBucketsFn');

export const postModelFn = engineeringDomain.createEvent('postModelFn');

export const postTranslateFn = engineeringDomain.createEvent('postTranslateFn');

export const setOpenAccordionFn = engineeringDomain.createEvent('setOpenAccordionFn');

export const getItemsFn = engineeringDomain.createEvent('getItemsFn');

/// ///////////////////////////////////////////////////////////
// ===================== ЮНИТЫ ХРАНИЛИЦ ==================== //
/// ///////////////////////////////////////////////////////////

export const $buckets = engineeringDomain.createStore([]);

export const $viewBucket = engineeringDomain.createStore('');

export const $menuBucket = engineeringDomain.createStore('');
export const $menuItem = engineeringDomain.createStore('');
export const $menuItemDelete = engineeringDomain.createStore({});
export const $menuBucketDetail = engineeringDomain.createStore({});

export const $uploadBucketId = engineeringDomain.createStore('');
export const $uploadFile = engineeringDomain.createStore({});

export const $modalBucket = engineeringDomain.createStore('');

export const $loaderCreateBucket = engineeringDomain.createStore(false);
export const $loaderResend = engineeringDomain.createStore(false);
export const $loaderUpload = engineeringDomain.createStore(false);

export const $openedAccordions = engineeringDomain.createStore([], { name: 'openedAccordions' });

/// ///////////////////////////////////////////////////////////
// ===================== ЮНИТЫ ЭФФЕКТОВ ==================== //
/// ///////////////////////////////////////////////////////////

export const getBucketsFx = engineeringDomain.createEffect(getBucketsSign);
export const getBucketsSecondFx = engineeringDomain.createEffect(getBucketsSign);

export const postBucketFx = engineeringDomain.createEffect(postBucketSign);

export const deleteBucketFx = engineeringDomain.createEffect(deleteBucketSign);
export const deleteObjectFx = engineeringDomain.createEffect(deleteObjectSign);

export const postModelFx = engineeringDomain.createEffect(postModelSign);

export const postTranslateFx = engineeringDomain.createEffect(postTranslationSign);

/// ///////////////////////////////////////////////////////////
// ==== ЮНИТЫ ХРАНИЛИЩ ПРИЗВОДНЫЕ от ХРАНИЛИЩ, ЭФФЕКТОВ ==== //
/// ///////////////////////////////////////////////////////////

persist({ store: $openedAccordions, name: 'openedAccordions' });

export const $loadersCombineData = combine($loaderCreateBucket, $loaderResend, $loaderUpload);

export const $isLoadingPage = pending({
  effects: [getBucketsFx],
});

/// ///////////////////////////////////////////////////////////
// ==== ЮНИТЫ ЭФФЕКТОВ ПРИЗВОДНЫЕ от ХРАНИЛИЩ, ЭФФЕКТОВ ==== //
/// ///////////////////////////////////////////////////////////

// тут создаются эффекты через attach

/// ///////////////////////////////////////////////////////////
// ====================== ЮНИТЫ ФОРМ ======================= //
/// ///////////////////////////////////////////////////////////

export const engineeringForm = createForm({
  fields: {
    bucketKey: {
      rules: [rules.required(), rules.maxLength(30)],
      init: '',
      validateOn: [],
    },
    policyKey: {
      rules: [rules.required()],
      init: { value: 'temporary', label: 'Временные' },
      validateOn: [],
    },
  },
  validateOn: ['submit'],
  domain: engineeringDomain,
});

/// ///////////////////////////////////////////////////////////
//  ЮНИТЫ ХРАНИЛИЩ ПРИЗВОДНЫЕ от ФОРМ + (ХРАНИЛИЩ, ЭФФЕКТОВ) //
/// ///////////////////////////////////////////////////////////

/// ///////////////////////////////////////////////////////////
// ========================= ФАБРИКИ ======================= //
/// ///////////////////////////////////////////////////////////

// тут создаем различные фабрики и хранилища с использованием фабрик
