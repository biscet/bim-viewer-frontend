import { createHistoryRouter } from 'atomic-router';
import { createBrowserHistory } from 'history';
import {
  homeRoute, notFoundRoute,
} from './index';

export const routes = [
  { path: '/', route: homeRoute },
];

export const router = createHistoryRouter({
  routes,
  notFoundRoute,
});

const history = createBrowserHistory();

router.setHistory(history);
