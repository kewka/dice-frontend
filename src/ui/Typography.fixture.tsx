import { TypographyVariant, variants } from './mixins/typography';
import { Typography } from './Typography';

export default (
  <>
    {Object.keys(variants).map((variant) => (
      <Typography $variant={variant as TypographyVariant}>
        Typography - {variant}
      </Typography>
    ))}
  </>
);
