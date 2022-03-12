import { css, Global } from '@emotion/react';
import { normalize } from 'polished';
import 'focus-visible';

import { typography } from './mixins/typography';
import { darkThemeCss, themeCss } from './theme';

const styles = css`
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap');
  ${normalize()}
  ${themeCss}
  ${darkThemeCss}

  html {
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: var(--theme-background);
    color: var(--theme-text);
    overflow-x: hidden;
    ${typography('body1')}
  }

  button {
    border: none;
    padding: 0;
    background: none;
    color: inherit;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    text-align: left;
  }

  [data-js-focus-visible] :focus:not([data-focus-visible-added]) {
    outline: none;
  }

  a {
    color: inherit;
    text-decoration: none;
    display: inline-flex;
  }
`;

export function GlobalStyles() {
  return <Global styles={styles} />;
}
