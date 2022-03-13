import { Button } from './Button';
import { ReactComponent as LoginIcon } from './svg/LoginIcon.svg';

const colors = ['primary', 'error', 'warning', 'info', 'success'] as const;
const variants = ['contained', 'text', 'outlined'] as const;

export default {
  ...variants.reduce((acc, variant) => {
    acc[variant] = (
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {colors.map((color) => (
          <Button
            style={{ marginRight: 8 }}
            key={color}
            variant={variant}
            color={color}
          >
            Button
          </Button>
        ))}
      </div>
    );
    return acc;
  }, {} as any),
  'custom color': (
    <Button
      style={{
        '--button-color': 'blue',
        '--button-color-contrast': 'orange',
      }}
    >
      Custom color
    </Button>
  ),
  'with icon': (
    <Button>
      <LoginIcon />
      Login
    </Button>
  ),
  link: (
    <Button target="_blank" as="a" href="https://google.com">
      google.com
    </Button>
  ),
};
