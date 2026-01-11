import { version } from '@thai-master/fuse';
import { StoreDebug } from './components/StoreDebug';

export function App() {
  return (
    <>
      {/* Store Debug Component - REMOVE BEFORE PRODUCTION */}
      <StoreDebug />

      {/* Original App Content */}
      <div style={{
        padding: '2rem',
        fontFamily: 'system-ui, sans-serif',
        borderTop: '2px solid #ddd',
        marginTop: '2rem',
        textAlign: 'center',
        color: '#999',
      }}>
        <p style={{ fontSize: '0.875rem' }}>
          Fuse Library v{version}
        </p>
      </div>
    </>
  );
}
