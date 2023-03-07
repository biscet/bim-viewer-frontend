/* eslint-disable max-len */
import React, { useState } from 'react';
import { Slide } from 'react-reveal';
import { useUnit } from 'effector-react';
import {
  $viewBucket, $menuBucket, setModalBucketFn,
  setBucketDetailFn, setUploadBucketIdFn, setOpenAccordionFn,
  $openedAccordions,
} from 'src/models/Engineering';
import { isEmpty } from 'src/lib/lodash';
import { showMenuBucket, hideMenuItem } from 'src/ui/components/BimMenu';
import { MODAL_TYPES } from 'src/config/constants';
import { BucketItem } from './BucketItem';

const setOpenModalUpload = (id) => () => {
  setUploadBucketIdFn(id);
  setModalBucketFn(MODAL_TYPES.upload);
};

const contextBucket = (id, detail) => (e) => {
  showMenuBucket(id, e);
  hideMenuItem();
  setBucketDetailFn(detail);
};

export const BucketAccordion = ({
  name, items, id, detail,
}) => {
  const [viewBucket, menuOpen, accordions] = useUnit([$viewBucket, $menuBucket, $openedAccordions]);
  const openAccordion = !isEmpty(accordions.find((item) => item === id));
  const [opened, setOpened] = useState(openAccordion);

  const amountItems = !isEmpty(items) ? items.length : 0;

  const className = ['dialog-accordion'];
  className.push(menuOpen === id ? 'dialog-accordion_active' : '');

  const classNameHeader = ['dialog-accordion__header'];
  classNameHeader.push(amountItems === 0 ? 'node-bim-nonactive' : '');

  return (
    <>
      <div
        className={className.join(' ')}
        title={amountItems === 0 ? 'Добавьте BIM модели в бакет' : null}
      >
        <div
          className={classNameHeader.join(' ')}
          onClick={() => {
            setOpened(!opened);
            setOpenAccordionFn(id);
          }}
          onContextMenu={contextBucket(id, { ...detail, items: items.length })}
        >
          {amountItems === 0 ? null : <Arrow open={opened} />}
          {name}
        </div>

        <div className="flex align-center">
          {amountItems > 0 ? <p className="dialog-accordion__amount">{amountItems}</p> : null}
          <button type="button" className="dialog-accordion__add-button" onClick={setOpenModalUpload(id)}>
            <Plus />
          </button>
        </div>
      </div>

      {!isEmpty(items)
        ? items.map((item, i) => {
          const duration = (i + 1) * 75;

          return (
            <Slide
              key={i}
              collapse
              when={opened}
              right
              duration={250 + duration}
            >
              <BucketItem
                active={String(viewBucket.replace('urn:', '')) === String(item.id)}
                id={item.id}
                name={item.text}
                bucketKey={id}
              />
            </Slide>
          );
        })
        : null}
    </>
  );
};

const Arrow = ({ open }) => {
  const className = ['arrow'];
  className.push(open ? 'arrow_opened' : '');

  return (
    <svg
      width="16"
      className={className.join(' ')}
      height="10"
      viewBox="0 0 16 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1 1.5L8 8.5L15 1.5" stroke="#111212" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
};

const Plus = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.05525 14V0H7.94475V14H6.05525ZM0 7.93997V6.06003H14V7.93997H0Z" fill="#007BFF" />
  </svg>
);
