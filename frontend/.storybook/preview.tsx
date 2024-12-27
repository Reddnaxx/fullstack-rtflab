import type { Preview } from '@storybook/react';
import '../src/app/globals.css';
import RootLayout from '../src/app/layout';
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
    (Story, { parameters }) => {
      const { pageLayout } = parameters;

      if (pageLayout) {
        return (
          <RootLayout>
            <Story />
          </RootLayout>
        );
      }

      return <Story />;
    },
  ],
};

export default preview;
