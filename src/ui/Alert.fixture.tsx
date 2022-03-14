import { Alert } from './Alert';

export default (
  <div style={{ display: 'grid', gap: 16 }}>
    {(['error', 'warning', 'info', 'success'] as const).map((severity) => (
      <Alert $severity={severity} key={severity} onClose={console.log}>
        Hello world
      </Alert>
    ))}
  </div>
);
