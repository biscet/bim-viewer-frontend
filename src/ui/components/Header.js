/* eslint-disable max-len */
import React from 'react';
import { useUnit } from 'effector-react';
import { Link } from 'atomic-router-react';
import {
  setModalBucketFn, $loaderResend,
  resendGetBucketsFn,
} from 'src/models/Engineering';
import { homeRoute } from 'src/models/routes/index';
import { Button } from './Form';

import 'src/ui/styles/Other/Header.scss';

const setOpenModalCreateBucket = () => {
  setModalBucketFn('createBucket');
};

const resendBuckets = () => {
  resendGetBucketsFn();
};

export const Header = () => {
  const loaderResend = useUnit($loaderResend);

  const classNameResend = ['header__resend-button'];
  classNameResend.push(loaderResend ? 'header__resend-button_active' : '');

  return (
    <div className="header">
      <Link to={homeRoute} className="header__logo logo">
        <img className="logo__img" src="favicon.ico" alt="" />
        BIM Viewer
      </Link>

      <div className="flex align-center">
        <Button
          variant="outlined"
          type="button"
          className="margin-top-none margin-bottom-none"
          onClick={setOpenModalCreateBucket}
          disabled={loaderResend}
        >
          Добавить Бакет
        </Button>

        <button
          className={classNameResend.join(' ')}
          type="button"
          disabled={loaderResend}
          onClick={resendBuckets}
        >
          <Spin />
        </button>
      </div>
    </div>
  );
};

const Spin = () => (
  <div className="spin">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.1053 1.81554C13.2376 1.00505 11.1795 0.792159 9.19335 1.20603C7.20762 1.61983 5.39029 2.6399 3.96842 4.12948C2.54702 5.61856 1.58391 7.51025 1.19414 9.56307C0.804404 11.6157 1.00407 13.7438 1.76962 15.68C2.5353 17.6166 3.83487 19.2792 5.51098 20.4525C7.18771 21.6262 9.16419 22.2558 11.1903 22.2558V20.2558C9.58104 20.2558 8.00383 19.7562 6.6579 18.814C5.31134 17.8714 4.25502 16.5267 3.62952 14.9447C3.0039 13.3624 2.83956 11.6188 3.15904 9.93614C3.47849 8.2537 4.26596 6.71433 5.41513 5.51043C6.56383 4.30703 8.0216 3.49317 9.60135 3.16398C11.1807 2.83486 12.8183 3.0033 14.3092 3.65024C15.8007 4.29745 17.083 5.39682 17.9886 6.81668C18.5824 7.74763 18.9958 8.78777 19.2102 9.87738H16.7701L20.1811 15.129L23.5921 9.87738H21.2414C21.006 8.40663 20.4751 6.99592 19.6748 5.7412L18.8317 6.27894L19.6748 5.7412C18.5607 3.99445 16.9725 2.62575 15.1053 1.81554Z"
        fill="#d89216"
      />
    </svg>
  </div>
);
