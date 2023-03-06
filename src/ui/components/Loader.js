import React from 'react';
import { useUnit } from 'effector-react';
import { $isLoadingPage } from 'src/models/Engineering';

import 'src/ui/styles/Other/Loader.scss';

export const Loader = () => {
  const isLoadingPage = useUnit($isLoadingPage);

  return isLoadingPage ? (
    <div className="loader-wrapper">
      <div className="loader-wrapper__loader" />
      <div className="loader-wrapper__loader-section" />
    </div>
  ) : null;
};
