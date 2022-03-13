import { ComponentProps, ElementType } from 'react';

/**
 * Helper type for ignoring TS errors when using `as` prop.
 */
export type AnyProps<T extends ElementType> = ComponentProps<T> &
  Record<string, any>;
