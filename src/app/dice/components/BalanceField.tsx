import styled from '@emotion/styled';
import { formatEther } from 'ethers/lib/utils';
import { ChangeEvent, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { useAccountBalance } from '~/app/web3/cache';
import { currency } from '~/app/web3/config';
import { formatCurrency } from '~/app/utils/format';
import { Button } from '~/ui/Button';
import { FormField, FormFieldProps, LabelText } from '~/ui/FormField';
import { InputProps, NumericInput } from '~/ui/Input';
import { Skeleton } from '~/ui/Skeleton';

export type BalanceFieldProps = FormFieldProps & {
  inputProps?: InputProps;
};

export function BalanceField({
  label,
  inputProps,
  ...rest
}: BalanceFieldProps) {
  const { t } = useTranslation();
  const { data } = useAccountBalance();
  const { name, id, onChange } = inputProps ?? {};
  const onMax = useCallback(
    () =>
      onChange?.({
        type: 'change',
        target: {
          id,
          name,
          value: formatEther(data!),
        },
      } as ChangeEvent<HTMLInputElement>),
    [data, id, name, onChange]
  );
  return (
    <Root
      label={
        <>
          <span>{label}</span>
          {data ? (
            <span>
              {t('Balance: {{balance}}', {
                balance: formatCurrency(data, currency.symbol),
              })}
            </span>
          ) : (
            <Skeleton width={100} height={14} />
          )}
        </>
      }
      {...rest}
    >
      <NumericInput
        end={
          <Button disabled={!data} onClick={onMax} size="small" variant="text">
            {t('Max')}
          </Button>
        }
        {...inputProps}
      />
    </Root>
  );
}

export const Root = styled(FormField)`
  ${LabelText} {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
