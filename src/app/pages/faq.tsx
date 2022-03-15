import { useTranslation } from 'react-i18next';

import { PageHeader } from '~/ui/PageHeader';
import { Typography } from '~/ui/Typography';

export default function FaqPage() {
  const { t } = useTranslation();
  return (
    <>
      <PageHeader title={t('FAQ')} />
      <Typography>TODO</Typography>
    </>
  );
}
