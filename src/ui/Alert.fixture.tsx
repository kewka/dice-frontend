import { Alert, severities } from './Alert';

export default (
  <div style={{ display: 'grid', gap: 16 }}>
    {severities.map((severity) => (
      <Alert severity={severity} key={severity} onClose={console.log}>
        Hello world
      </Alert>
    ))}
  </div>
);
