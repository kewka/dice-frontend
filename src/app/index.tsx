import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { GlobalStyles } from '~/ui/GlobalStyles';

import { Layout } from './components/Layout';
import { Provider } from './providers';

const IndexPage = lazy(() => import('./pages/index'));
const Page404 = lazy(() => import('./pages/404'));

export function App() {
  return (
    <>
      <GlobalStyles />
      <Provider>
        <BrowserRouter>
          <Layout>
            <Suspense fallback={'Loading...'}>
              <Routes>
                <Route path="/" element={<IndexPage />} />
                <Route path="*" element={<Page404 />} />
              </Routes>
            </Suspense>
          </Layout>
        </BrowserRouter>
      </Provider>
    </>
  );
}
