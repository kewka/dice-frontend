import { Drawer } from './Drawer';
import { Logo } from './Logo';

export default (
  <Drawer
    style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
  >
    <Logo />
  </Drawer>
);
