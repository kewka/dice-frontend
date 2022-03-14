import { useTranslation } from 'react-i18next';

import { Button, ButtonProps } from '~/ui/Button';
import { ReactComponent as ChevronDownIcon } from '~/ui/svg/ChevronDownIcon.svg';
import { ReactComponent as ChevronUpIcon } from '~/ui/svg/ChevronUpIcon.svg';

export type DetailsButtonProps = ButtonProps & {
  isOpen?: boolean;
};

export function DetailsButton({ isOpen, ...rest }: DetailsButtonProps) {
  const { t } = useTranslation();
  return (
    <Button size="small" variant="text" color="caption" {...rest}>
      {t('Details')}
      {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
    </Button>
  );
}
