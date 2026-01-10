import { version } from '@thai-master/fuse';

export function App() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1>Thai Master</h1>
      <p>Script-first Thai language learning</p>
      <p style={{ fontSize: '0.875rem', color: '#666' }}>
        Fuse Library v{version}
      </p>
    </div>
  );
}
