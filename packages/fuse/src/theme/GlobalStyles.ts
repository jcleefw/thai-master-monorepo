import { createGlobalStyle, ExecutionProps } from 'styled-components';
import { NamedExoticComponent } from 'react';

// Use NamedExoticComponent combined with ExecutionProps
// This is what createGlobalStyle actually returns in modern versions
export const GlobalStyles: NamedExoticComponent<ExecutionProps & object> = createGlobalStyle`
  /* CSS Reset */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* Body styles with Thai font stack */
  body {
    font-family: 'Sarabun', 'Noto Sans Thai', sans-serif;
    font-size: ${props => { console.log(props); return props.theme.typography.baseFontSize }};
    line-height: ${props => props.theme.typography.lineHeight};
    color: ${props => props.theme.colors.charcoal};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    /* Ensure font-display: swap for asynchronous loading */
    font-display: swap;
  }

  /* Ensure root element fills viewport */
  #root {
    min-height: 100vh;
  }

  /* Remove default list styles */
  ul,
  ol {
    list-style: none;
  }

  /* Reset button styles */
  button {
    font-family: inherit;
    cursor: pointer;
  }

  /* Reset input styles */
  input,
  textarea,
  select {
    font-family: inherit;
  }

  /* Improve image behavior */
  img,
  picture,
  video,
  canvas,
  svg {
    display: block;
    max-width: 100%;
  }

  /* Remove text decoration from links */
  a {
    text-decoration: none;
    color: inherit;
  }
` 