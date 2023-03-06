/* eslint-disable max-len */
import React from 'react';
import { useUnit } from 'effector-react';
import { setViewBucketFn, $menuItem, setMenuItemDeleteFn } from 'src/models/Engineering';
import { showMenuItem, hideMenuBucket } from 'src/ui/components/BimMenu';

const setViewBucket = (id) => () => {
  setViewBucketFn(id);
};

const setDeleteItem = (name, bucket, key) => {
  setMenuItemDeleteFn({
    objectName: name,
    bucketKey: bucket,
    objectKey: key,
  });
};

const contextMenu = (id, bucket, name) => (e) => {
  showMenuItem(id, e);
  setDeleteItem(name, bucket, id);
  hideMenuBucket();
};

export const BucketItem = ({
  name, active, id, bucketKey,
}) => {
  const menu = useUnit($menuItem);
  const newName = name.split('.');

  const className = ['bim-model'];
  className.push(active ? 'bim-model_active' : '', id === menu ? 'bim-model_active-menu' : '');

  const classNameDot = ['bim-model__format'];
  classNameDot.push(active ? 'format_active' : '');

  return (
    <div
      className={className.join(' ')}
      onClick={setViewBucket(id)}
      onContextMenu={contextMenu(id, bucketKey, name)}
      title={name}
    >
      <div className={classNameDot.join(' ')}>{newName[1]}</div>
      <p className="node-bim-truncate">{newName[0]}</p>
    </div>
  );
};
