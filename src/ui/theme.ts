import { css } from '@emotion/react';
import { rgba } from 'polished';

import { black, blue, gray, white } from './vars/colors';

export const themeCss = css`
  body {
    --theme-background: ${white};
    --theme-text: ${black};
    --theme-primary: ${blue[500]};
    --theme-primary-contrast: ${white};

    --theme-shadow: ${rgba(gray[300], 0.5)};

    --theme-hover: ${rgba(black, 0.04)};
    --theme-hover-active: ${rgba(black, 0.1)};
    --theme-hover-duration: 0.2s;

    /* --theme-hover-duration: 0.2s,
  --theme-shadow: rgba($color-gray-300, 0.5),
  --theme-divider: $color-gray-200,
  --theme-error: $color-red-700,
  --theme-error-contrast: $color-white,
  --theme-warning: $color-orange-700,
  --theme-warning-contrast: $color-white,
  --theme-info: $color-blue-700,
  --theme-info-contrast: $color-white,
  --theme-success: $color-green-700,
  --theme-success-contrast: $color-white,
  --theme-modal-overlay: rgba($color-black, 0.6),
  --theme-modal-background: $color-white,
  --theme-modal-z-index: 1000,
  --theme-skeleton-color: $color-gray-200,
  --theme-card-background: $color-white,
  --theme-avatar-background: $color-gray-50 */
  }
`;

export const darkThemeCss = css`
  body.theme-dark {
  }
`;
