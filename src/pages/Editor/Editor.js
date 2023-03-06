/* eslint-disable max-len */
import React, { useEffect, useRef } from 'react';

import { useUnit } from 'effector-react';
import {
  $buckets, $viewBucket,
  resetViewBucketFn, $loadersCombineData,
} from 'src/models/Engineering';
import { isEmpty } from 'src/lib/lodash';
import { launchViewer, deleteViewer } from 'src/lib/autodesk';
import { LoaderBucket, BucketAccordion } from './children';

import 'src/ui/styles/Other/Bim.scss';
import 'src/ui/styles/Other/BimComponents.scss';

export const Editor = () => {
  const [
    buckets, viewBucket, [loaderCreateBucket],
  ] = useUnit([$buckets, $viewBucket, $loadersCombineData]);

  const viewer = useRef(null);

  useEffect(() => {
    if (!isEmpty(viewBucket) && !isEmpty(viewer)) {
      deleteViewer(viewer);
      launchViewer('viewerBim', viewBucket);
    }
  }, [viewBucket]);

  return (
    <div className="bim-viewer">
      <div id="viewerBim" ref={viewer}>
        {isEmpty(viewBucket) ? (
          <p className="bim-viewer__preview">Для начала работы нужно выбрать BIM модель</p>
        ) : (
          <button
            className="bim-viewer__close-model"
            type="button"
            onClick={() => {
              resetViewBucketFn();
              deleteViewer(viewer);
            }}
          >
            <Close />
          </button>
        )}
      </div>

      <div className="bim-viewer__dialog">
        {!isEmpty(buckets)
          ? buckets.map((bucket, i) => (
            <BucketAccordion
              key={i}
              name={bucket.text}
              items={bucket.items}
              id={bucket.id}
              detail={bucket.detail}
            />
          ))
          : null}

        {loaderCreateBucket ? <LoaderBucket /> : null}
      </div>
    </div>
  );
};

const Close = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.05525 14V0H7.94475V14H6.05525ZM0 7.93997V6.06003H14V7.93997H0Z" fill="white" />
  </svg>
);
