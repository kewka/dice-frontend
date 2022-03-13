import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';

export function PageLoader() {
  const { t } = useTranslation();
  return <Root>{t('Loading')}...</Root>;
}

export const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
`;
