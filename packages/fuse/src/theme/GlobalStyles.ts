import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
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
    font-size: ${props => props.theme.typography.baseFontSize};
    line-height: ${props => props.theme.typography.lineHeight};
    background-color: ${props => props.theme.colors.cream};
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
`;
