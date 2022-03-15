import { ComponentProps } from 'react';

import { ReactComponent as SunIcon } from './svg/SunIcon.svg';
import { ReactComponent as MoonIcon } from './svg/MoonIcon.svg';
import { IconButton } from './IconButton';
import { useTheme } from './theme';

export type ToggleThemeButtonProps = ComponentProps<typeof IconButton>;

export function ToggleThemeButton(props: ToggleThemeButtonProps) {
  const { theme, toggleTheme } = useTheme();
  return (
    <IconButton onClick={toggleTheme} {...props}>
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </IconButton>
  );
}
