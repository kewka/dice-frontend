import { css } from '@emotion/react';
import { rgba } from 'polished';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useMedia } from 'react-use';

const black = '#222222';
const white = '#ffffff';

export const themeCss = css`
  body {
    /* Common */
    --theme-color-black: ${black};
    --theme-color-white: ${white};

    --theme-color-background: var(--theme-color-white);
    --theme-color-text: var(--theme-color-black);

    --theme-color-caption: ${rgba(black, 0.7)};
    --theme-color-caption-contrast: var(--theme-color-background);

    --theme-color-primary: #805ad5;
    --theme-color-primary-contrast: var(--theme-color-white);

    --theme-color-overlay: ${rgba(black, 0.6)};

    /* Gray */
    --theme-color-gray-50: #fafafa;
    --theme-color-gray-100: #f5f5f5;
    --theme-color-gray-200: #eeeeee;
    --theme-color-gray-700: #616161;
    --theme-color-gray-800: #424242;

    /* Severities */
    --theme-color-error: #d32f2f;
    --theme-color-error-contrast: var(--theme-color-white);
    --theme-color-warning: #f57c00;
    --theme-color-warning-contrast: var(--theme-color-white);
    --theme-color-info: #3777ff;
    --theme-color-info-contrast: var(--theme-color-white);
    --theme-color-success: #0cce6b;
    --theme-color-success-contrast: var(--theme-color-white);

    /* Hover  */
    --theme-color-hover: ${rgba(black, 0.04)};
    --theme-color-hover-active: ${rgba(black, 0.1)};

    /* Divider */
    --theme-color-divider: ${rgba(black, 0.12)};

    /* z-index */
    --theme-z-index-modal: 1000;
    --theme-z-index-notifications: 1100;

    /* Shadows */
    --theme-color-shadow-1: ${rgba(black, 0.05)};
    --theme-color-shadow-2: ${rgba(black, 0.1)};
    --theme-color-shadow-3: ${rgba(black, 0.15)};

    /* Toolbar */
    --theme-toolbar-height: 48px;
    --theme-toolbar-shadow: var(--theme-color-shadow-1);

    /* Drawer */
    --theme-drawer-width: 250px;
    --theme-drawer-shadow: var(--theme-color-shadow-1);

    /* Avatar */
    --theme-avatar-background: var(--theme-color-gray-50);

    /* Skeleton */
    --theme-skeleton-color: var(--theme-color-gray-100);

    /* Card */
    --theme-card-background: var(--theme-color-background);
    --theme-card-shadow: var(--theme-color-shadow-1);

    /* Transitions */
    --theme-transition-1: 100ms;
    --theme-transition-2: 200ms;
    --theme-transition-3: 300ms;
  }
`;

export const darkThemeCss = css`
  .theme-dark {
    --theme-color-background: ${black};
    --theme-color-text: ${white};

    --theme-color-caption: ${rgba(white, 0.6)};

    --theme-color-overlay: ${rgba(white, 0.18)};

    /* Hover  */
    --theme-color-hover: ${rgba(white, 0.04)};
    --theme-color-hover-active: ${rgba(white, 0.1)};

    /* Divider */
    --theme-color-divider: ${rgba(white, 0.12)};

    /* Shadows */
    --theme-color-shadow-1: ${rgba(white, 0.03)};
    --theme-color-shadow-2: ${rgba(white, 0.06)};
    --theme-color-shadow-3: ${rgba(white, 0.09)};

    /* Avatar */
    --theme-avatar-background: var(--theme-color-gray-800);

    /* Skeleton */
    --theme-skeleton-color: var(--theme-color-gray-700);
  }
`;

export type Theme = 'light' | 'dark';

export type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => any;
  toggleTheme: () => any;
};

export const ThemeContext = createContext<ThemeContextType>(null as any);

export const useTheme = () => useContext(ThemeContext);

export type ThemeProviderProps = {
  children?: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const prefersDark = useMedia('(prefers-color-scheme: dark)');
  const [theme, setTheme] = useState<Theme>(
    getPersistedTheme() ?? (prefersDark ? 'dark' : 'light')
  );

  const toggleTheme = useCallback(
    () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light')),
    []
  );

  const ctx = useMemo<ThemeContextType>(
    () => ({
      theme,
      setTheme,
      toggleTheme,
    }),
    [theme, toggleTheme]
  );

  useEffect(() => {
    persistTheme(theme);
  }, [theme]);

  useEffect(() => {
    // Sync theme between tabs.
    function handler(event: StorageEvent) {
      if (event.key !== themeKey) return;

      const persisted = getPersistedTheme();
      if (persisted && persisted !== theme) {
        setTheme(persisted);
      }
    }

    window.addEventListener('storage', handler);

    return () => window.removeEventListener('storage', handler);
  }, [theme]);

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('theme-dark');
    } else {
      document.body.classList.remove('theme-dark');
    }
  }, [theme]);

  return <ThemeContext.Provider value={ctx}>{children}</ThemeContext.Provider>;
}

const themeKey = 'theme';

function persistTheme(theme: Theme) {
  localStorage.setItem(themeKey, theme);
}

function getPersistedTheme(): Theme | null {
  const persisted = localStorage.getItem(themeKey);
  switch (persisted) {
    case 'light':
    case 'dark':
      return persisted;
    default:
      return null;
  }
}
