import { css } from '@emotion/react';
import { rgba } from 'polished';

import { black, blue, gray, green, orange, red, white } from './vars/colors';
import * as zIndex from './vars/zIndex';

export const themeCss = css`
  body {
    --theme-background: ${white};
    --theme-text: ${black};
    --theme-primary: ${blue[500]};
    --theme-primary-contrast: ${white};

    --theme-shadow: ${rgba(gray[300], 0.5)};

    --theme-divider: ${gray[200]};

    --theme-hover: ${rgba(black, 0.04)};
    --theme-hover-active: ${rgba(black, 0.1)};
    --theme-hover-duration: 0.2s;

    --theme-card-background: ${white};

    --theme-avatar-background: ${gray[50]};

    --theme-skeleton-color: ${gray[200]};

    --theme-error: ${red[700]};
    --theme-error-contrast: ${white};
    --theme-warning: ${orange[700]};
    --theme-warning-contrast: ${white};
    --theme-info: ${blue[700]};
    --theme-info-contrast: ${white};
    --theme-success: ${green[700]};
    --theme-success-contrast: ${white};

    --theme-modal-overlay: ${rgba(black, 0.6)};
    --theme-modal-background: ${white};
    --theme-modal-z-index: ${zIndex.modal};

    --theme-notifications-z-index: ${zIndex.notifications};
  }
`;

export const darkThemeCss = css`
  body.theme-dark {
  }
`;
