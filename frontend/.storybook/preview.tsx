import type { Preview } from '@storybook/react';
import '../src/app/globals.css';
import RootLayout from '../src/app/layout';
import React from 'react';
import Providers from '../src/app/Providers';

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

      return (
        <Providers>
          <Story />
        </Providers>
      );
    },
  ],
};

export default preview;
