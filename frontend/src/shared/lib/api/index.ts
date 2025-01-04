import { env } from 'process';

import axios from 'axios';

export default axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
