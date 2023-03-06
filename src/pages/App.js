import React from 'react';
import { RouterProvider, Route } from 'atomic-router-react';
import { router } from 'src/models/routes/init';
import { homeRouteChained, notFoundRoute } from 'src/models/routes/index';
import {
  Header, BimMenu, BimModal, Loader,
} from 'src/ui/components';
import { Editor, NotFound } from './Pages';

const App = () => (
  <RouterProvider router={router}>
    <Header />

    <BimModal />
    <BimMenu />

    <Loader />

    <Route route={homeRouteChained} view={Editor} />
    <Route route={notFoundRoute} view={NotFound} />
  </RouterProvider>
);

export default App;
