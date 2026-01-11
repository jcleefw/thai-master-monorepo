import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { ThemeTest } from '../ThemeTest';
import { theme } from '../../../theme';

describe('ThemeTest Component', () => {
  it('should render without errors', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <ThemeTest />
      </ThemeProvider>
    );
    expect(container).toBeDefined();
  });

  it('should display theme test title', () => {
    render(
      <ThemeProvider theme={theme}>
        <ThemeTest />
      </ThemeProvider>
    );
    expect(screen.getByText('Theme Test Component')).toBeInTheDocument();
  });

  it('should display all color swatches', () => {
    render(
      <ThemeProvider theme={theme}>
        <ThemeTest />
      </ThemeProvider>
    );

    // Check for color labels
    expect(screen.getByText(/cream:/i)).toBeInTheDocument();
    expect(screen.getByText(/lavender:/i)).toBeInTheDocument();
    expect(screen.getByText(/sage:/i)).toBeInTheDocument();
    expect(screen.getByText(/periwinkle:/i)).toBeInTheDocument();
    expect(screen.getByText(/coral:/i)).toBeInTheDocument();
    expect(screen.getByText(/charcoal:/i)).toBeInTheDocument();
  });

  it('should display Thai sample text when showThaiSample is true', () => {
    render(
      <ThemeProvider theme={theme}>
        <ThemeTest showThaiSample={true} />
      </ThemeProvider>
    );

    expect(screen.getByText(/สวัสดี ครับ/i)).toBeInTheDocument();
    expect(screen.getByText(/7:1 contrast ratio/i)).toBeInTheDocument();
  });

  it('should not display Thai sample text when showThaiSample is false', () => {
    render(
      <ThemeProvider theme={theme}>
        <ThemeTest showThaiSample={false} />
      </ThemeProvider>
    );

    expect(screen.queryByText(/สวัสดี ครับ/i)).not.toBeInTheDocument();
  });

  it('should display contrast information', () => {
    render(
      <ThemeProvider theme={theme}>
        <ThemeTest showThaiSample={true} />
      </ThemeProvider>
    );

    expect(screen.getByText(/Noto Sans Thai/i)).toBeInTheDocument();
    expect(screen.getByText(/Sarabun/i)).toBeInTheDocument();
  });

  it('should render Thai tone marks correctly', () => {
    render(
      <ThemeProvider theme={theme}>
        <ThemeTest showThaiSample={true} />
      </ThemeProvider>
    );

    // Check for Thai characters with tone marks
    expect(screen.getByText(/ก้า ก๊า ก่า ก๋า/i)).toBeInTheDocument();
  });
});
