import { createRoute, chainRoute } from 'atomic-router';
import { createDomain, createApi } from 'effector';
import { getBucketsFx } from '../Engineering';

export const routesDomain = createDomain('routesDomain');

// Events

// Stores

export const $notFoundRouteOpened = routesDomain.createStore(false);

// Effects

// Apis

export const notFoundRouteApi = createApi($notFoundRouteOpened, {
  opened: () => true,
  closed: () => false,
});

// Routes
export const homeRoute = createRoute();
export const notFoundRoute = createRoute();

export const homeRouteChained = chainRoute({
  route: homeRoute,
  beforeOpen: {
    effect: getBucketsFx,
  },
});
