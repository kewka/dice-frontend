import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';

import { IconButton } from '~/ui/IconButton';
import { ToggleThemeButton } from '~/ui/ToggleThemeButton';
import { ReactComponent as GithubIcon } from '~/ui/svg/GithubIcon.svg';

export function BottomActions() {
  const { t } = useTranslation();
  return (
    <Root>
      <IconButton
        as="a"
        title={t('GitHub')}
        href="https://github.com/kewka/dice-frontend"
      >
        <GithubIcon />
      </IconButton>
      <ToggleThemeButton title={t('Toggle theme')} />
      {/* TODO: i18n picker */}
      {/* TODO: chainId selector */}
    </Root>
  );
}

export const Root = styled.div`
  padding-top: 24px;
  margin-top: auto;
  grid-auto-flow: column;
  display: grid;
  justify-content: space-between;
  gap: 8px;
`;
