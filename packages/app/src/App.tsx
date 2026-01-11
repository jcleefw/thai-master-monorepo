import { version, ThemeTest } from '@thai-master/fuse';

export function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Thai Master - Script-first Thai language learning</h1>

      <div style={{ marginTop: '2rem' }}>
        <ThemeTest showThaiSample={true} />
      </div>

      <div style={{
        padding: '2rem',
        borderTop: '2px solid #ddd',
        marginTop: '2rem',
        textAlign: 'center',
        opacity: 0.6,
      }}>
        <p style={{ fontSize: '0.875rem' }}>
          Fuse Library v{version}
        </p>
      </div>
    </div>
  );
}
