import { ReactNode } from 'react';

export interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}

export function Button({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: '0.5rem 1rem',
        backgroundColor: variant === 'primary' ? '#4F46E5' : '#6B7280',
        color: '#FFFFFF',
        border: 'none',
        borderRadius: '0.375rem',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        fontSize: '1rem',
        minHeight: '44px',
        minWidth: '44px',
      }}
    >
      {children}
    </button>
  );
}
