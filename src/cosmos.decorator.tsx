import { ReactNode } from 'react';

import { Container } from './ui/Container';
import { GlobalStyles } from './ui/GlobalStyles';

type Props = {
  children: ReactNode;
};

export default ({ children }: Props) => (
  <>
    <GlobalStyles />
    <Container>{children}</Container>
  </>
);
