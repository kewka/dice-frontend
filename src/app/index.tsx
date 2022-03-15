import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { GlobalStyles } from '~/ui/GlobalStyles';

import { Layout } from './components/Layout';
import { PageLoader } from './components/PageLoader';
import { GamesSubscription } from './dice/components/GamesSubscription';
import { Provider } from './providers';
import { Paths } from './router/paths';

const Pages = {
  Index: lazy(() => import('./pages/index')),
  NotFound: lazy(() => import('./pages/404')),
  Game: lazy(() => import('./pages/games/[id]')),
  Faq: lazy(() => import('./pages/faq')),
};

export function App() {
  return (
    <>
      <GlobalStyles />
      <Provider>
        <BrowserRouter>
          <Layout>
            <GamesSubscription />
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path={Paths.INDEX} element={<Pages.Index />} />
                <Route path={Paths.GAME} element={<Pages.Game />} />
                <Route path={Paths.FAQ} element={<Pages.Faq />} />
                <Route path="*" element={<Pages.NotFound />} />
              </Routes>
            </Suspense>
          </Layout>
        </BrowserRouter>
      </Provider>
    </>
  );
}
