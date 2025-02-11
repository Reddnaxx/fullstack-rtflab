import type { ButtonVariant, ButtonColor, ButtonSize } from './types';
import type { ClassNameValue } from 'tailwind-merge';

type ButtonClasses = Record<ButtonVariant, Record<ButtonColor, string>>;
type ButtonSizeClasses = Record<ButtonSize, ClassNameValue>;
type ButtonDisabledClasses = Record<ButtonVariant, string>;

export const buttonClasses: ButtonClasses = {
  filled: {
    primary:
      'bg-sky-500 border-2 border-sky-500 hover:bg-sky-400 active:bg-sky-300 text-white',
    danger:
      'bg-red-500 border-2 border-sky-500 hover:bg-red-400 active:bg-red-300 text-white',
    success:
      'bg-green-500 border-2 border-sky-500 hover:bg-green-400 active:bg-green-300 text-white',
  },
  outlined: {
    primary:
      'border-2 border-sky-500 text-sky-500 hover:bg-sky-50 active:bg-sky-100',
    danger:
      'border-2 border-red-500 text-red-500 hover:bg-red-50 active:bg-sky-100',
    success:
      'border-2 border-green-500 text-green-500 hover:bg-green-50 active:bg-sky-100',
  },
  text: {
    primary: 'text-sky-500 hover:bg-sky-50 active:bg-sky-100',
    danger: 'text-red-500 hover:bg-red-50 active:bg-sky-100',
    success: 'text-green-500 hover:bg-green-50 active:bg-sky-100',
  },
};

export const buttonSizeClasses: ButtonSizeClasses = {
  sm: 'py-1 px-2 text-sm',
  md: 'py-2 px-3 text-base',
  lg: 'py-3 px-4 text-lg',
};

export const buttonDisabledClasses: ButtonDisabledClasses = {
  filled:
    'disabled:bg-gray-300 disabled:hover:bg-gray-300 disabled:active:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:border-gray-300',
  outlined:
    'disabled:bg-gray-50 disabled:border-gray-300 disabled:text-gray-300 disabled:cursor-not-allowed',
  text: 'disabled:text-gray-400 disabled:cursor-not-allowed',
};
