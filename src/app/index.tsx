import { GlobalStyles } from '~/ui/GlobalStyles';

import { Provider } from './providers';

export function App() {
  return (
    <>
      <GlobalStyles />
      <Provider>Hello world</Provider>
    </>
  );
}
