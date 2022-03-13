import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { GlobalStyles } from '~/ui/GlobalStyles';

import { Layout } from './components/Layout';
import { PageLoader } from './components/PageLoader';
import { Provider } from './providers';

const Pages = {
  Index: lazy(() => import('./pages/index')),
  NotFound: lazy(() => import('./pages/404')),
};

export function App() {
  return (
    <>
      <GlobalStyles />
      <Provider>
        <BrowserRouter>
          <Layout>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Pages.Index />} />
                <Route path="*" element={<Pages.NotFound />} />
              </Routes>
            </Suspense>
          </Layout>
        </BrowserRouter>
      </Provider>
    </>
  );
}
