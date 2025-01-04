import { useEffect } from 'react';

import type { RefObject } from 'react';

export const useOnOutsideClick = (
  callback: () => void,
  ref: RefObject<HTMLDivElement | null>
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref?.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [callback, ref]);
};
