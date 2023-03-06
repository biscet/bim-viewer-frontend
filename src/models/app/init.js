import { sample } from 'effector';
import { redirect } from 'atomic-router';
import { debounce } from 'patronum';
import { $notFoundRouteOpened, homeRoute } from 'src/models/routes/index';
import { NOT_FOUND_PAGE_REDIRECT_MS } from 'src/config/constants';

sample({
  clock: debounce({
    source: $notFoundRouteOpened,
    timeout: NOT_FOUND_PAGE_REDIRECT_MS,
  }),
  filter: (store) => store === true,
  target: redirect({
    route: homeRoute,
  }),
});
