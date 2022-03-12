import { ReactNode } from 'react';

export type ProviderProps = {
  children?: ReactNode;
};

export function Provider(props: ProviderProps) {
  return <>{props.children}</>;
}
