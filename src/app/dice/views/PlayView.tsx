import styled from '@emotion/styled';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAuth } from '~/app/auth/provider';
import { Button } from '~/ui/Button';
import { PageHeader } from '~/ui/PageHeader';
import { ReactComponent as AddIcon } from '~/ui/svg/AddIcon.svg';

export function PlayView() {
  const { t } = useTranslation();
  const [isOpen, setOpen] = useState(false);
  const { account } = useAuth();
  return (
    <>
      <StyledPageHeader
        title={t('Play')}
        description={t('On this page you can create a new game or join one.')}
        actions={
          <Button disabled={!account} onClick={() => setOpen(true)}>
            <AddIcon />
            {t('Create Game')}
          </Button>
        }
      />
    </>
  );
}

export const StyledPageHeader = styled(PageHeader)`
  margin-bottom: 24px;
`;
