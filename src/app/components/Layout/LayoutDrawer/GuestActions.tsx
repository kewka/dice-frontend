import { useTranslation } from 'react-i18next';

import { ReactComponent as LoginIcon } from '~/ui/svg/LoginIcon.svg';
import { ListItem, ListItemText } from '~/ui/ListItem';
import { Alert } from '~/ui/Alert';
import { useAuth } from '~/app/auth/provider';

export function GuestActions() {
  const { t } = useTranslation();
  const { connect, error } = useAuth();
  return (
    <>
      <ListItem onClick={connect} component="button" type="button">
        <LoginIcon />
        <ListItemText>{t('Connect')}</ListItemText>
      </ListItem>
      {error && <Alert $severity="warning">{error.message}</Alert>}
    </>
  );
}
