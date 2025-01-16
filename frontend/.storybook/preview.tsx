import React from 'react';
import Providers from '../src/app/Providers';

import '../src/app/globals.css';

import type { Preview } from '@storybook/react';

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
    Story => (
      <Providers>
        <Story />
      </Providers>
    ),
  ],
};

export default preview;
