import React, { useEffect } from 'react';
import { useUnit } from 'effector-react';
import {
  setMenuBucketFn, resetMenuBucketFn, resetMenuItemFn,
  setMenuItemFn, deleteBucketFn, $menuBucket,
  deleteObjectFn, $menuItemDelete, setModalBucketFn,
  setUploadBucketIdFn, postTranslateFn,
} from 'src/models/Engineering';
import { MODAL_TYPES } from 'src/config/constants';

export const showMenuBucket = (bucket, event) => {
  event.preventDefault();

  const ctxMenu = document.getElementById('ctxMenuBucket');

  ctxMenu.style.display = 'flex';
  ctxMenu.style.left = `${event.pageX - 110}px`;
  ctxMenu.style.top = `${event.pageY - 10}px`;

  setMenuBucketFn(bucket);

  return false;
};

export const hideMenuBucket = () => {
  const ctxMenu = document.getElementById('ctxMenuBucket');

  ctxMenu.style.display = '';
  ctxMenu.style.left = '';
  ctxMenu.style.top = '';

  resetMenuBucketFn();
};

export const showMenuItem = (item, event) => {
  event.preventDefault();

  const ctxMenu = document.getElementById('ctxMenuItem');

  ctxMenu.style.display = 'flex';
  ctxMenu.style.left = `${event.pageX - 110}px`;
  ctxMenu.style.top = `${event.pageY - 10}px`;

  setMenuItemFn(item);

  return false;
};

export const hideMenuItem = () => {
  const ctxMenu = document.getElementById('ctxMenuItem');

  ctxMenu.style.display = '';
  ctxMenu.style.left = '';
  ctxMenu.style.top = '';

  resetMenuItemFn();
};

const onWindowClickMenuListener = (event) => {
  const ctxMenu = document.getElementById('ctxMenuBucket');
  const ctxMenuItem = document.getElementById('ctxMenuItem');

  if (ctxMenu && event.target !== ctxMenu && !ctxMenu.contains(event.target)) {
    hideMenuBucket();
  }

  if (ctxMenuItem && event.target !== ctxMenuItem && !ctxMenuItem.contains(event.target)) {
    hideMenuItem();
  }
};

const onClickDeleteBucket = (id) => () => {
  hideMenuBucket();
  deleteBucketFn(id);
};

const onClickDeleteObject = (item) => () => {
  hideMenuItem();
  deleteObjectFn(item);
};

const onClickDetailBucket = () => {
  hideMenuBucket();
  setModalBucketFn(MODAL_TYPES.detail);
};

const onClickUpload = (id) => () => {
  hideMenuBucket();
  setUploadBucketIdFn(id);
  setModalBucketFn(MODAL_TYPES.upload);
};

const onClickTranslate = (id) => () => {
  postTranslateFn(id);
  hideMenuItem();
};

export default function BimMenu() {
  const [menuBucket, menuItem] = useUnit([$menuBucket, $menuItemDelete]);

  useEffect(() => {
    window.addEventListener('click', onWindowClickMenuListener);
    window.addEventListener('touchstart', onWindowClickMenuListener);

    return () => {
      window.removeEventListener('click', onWindowClickMenuListener);
      window.removeEventListener('touchstart', onWindowClickMenuListener);
    };
  }, []);

  return (
    <>
      <div id="ctxMenuBucket">
        <div className="ctx-menu-button" onClick={onClickDetailBucket}>
          Информация о бакете
        </div>
        <div className="ctx-menu-button" onClick={onClickUpload(menuBucket)}>
          Добавить модель
        </div>
        <div className="ctx-menu-button" onClick={onClickDeleteBucket(menuBucket)}>
          Удалить бакет
        </div>
      </div>

      <div id="ctxMenuItem">
        <div className="ctx-menu-button" onClick={onClickTranslate(menuItem.objectKey)}>
          Транслировать модель
        </div>
        <div className="ctx-menu-button ctx-menu-button-disabled">Скопировать модель</div>
        <div className="ctx-menu-button" onClick={onClickDeleteObject(menuItem)}>
          Удалить модель
        </div>
      </div>
    </>
  );
}
