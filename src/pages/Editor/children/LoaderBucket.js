import React from 'react';

export function LoaderBucket() {
  return (
    <div className="dialog-accordion dialog-accordion_loader-bar">
      <div
        className="dialog-accordion__header cursor-default"
      >
        <div className="model-adding__text-loader" />
      </div>
      <div className="flex align-center">
        <div className="model-adding__amount-loader" />
        <div className="model-adding__button-loader" />
      </div>
    </div>
  );
}
