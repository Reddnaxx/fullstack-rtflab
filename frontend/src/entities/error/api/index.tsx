import { toast } from 'react-toastify';

import { Icon } from '@/shared/ui';

import { APIError } from '../models';

import type { APIErrorResponse } from '../models';
import type { AxiosError } from 'axios';

export const handleAPIError = (error: AxiosError<APIErrorResponse>) => {
  const err = APIError.fromAxiosError(error);

  const message = err.getMessageOrCodeDescription();
  toast.error(message, { icon: <Icon name="error" /> });

  throw new Error(message);
};
