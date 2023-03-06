import React, { useEffect } from 'react';
import { notFoundRouteApi } from 'src/models/routes';

export const NotFound = () => {
  useEffect(() => {
    notFoundRouteApi.opened();

    return () => {
      notFoundRouteApi.closed();
    };
  }, []);

  return (
    <div>
      NotFound
    </div>
  );
};
