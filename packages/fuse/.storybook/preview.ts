import type { Preview } from "@storybook/react";
import { ThemeProvider } from 'styled-components';
import { GlobalStyles, theme } from '../src/theme';
import React from 'react';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) =>
      React.createElement(
        ThemeProvider,
        { theme },
        React.createElement(React.Fragment, null,
          React.createElement(GlobalStyles),
          React.createElement(Story)
        )
      ),
  ],
};

export default preview;
