import type {
  TextFontFamily,
  TextAlignment,
  TextColor,
  TextSize,
  TextWeight,
} from './types';
import type { ClassNameValue } from 'tailwind-merge';

type TextColorClasses = Record<TextColor, ClassNameValue>;
type TextWeightClasses = Record<TextWeight, ClassNameValue>;
type TextSizeClasses = Record<TextSize, ClassNameValue>;
type TextAlignmentClasses = Record<TextAlignment, ClassNameValue>;
type TextFontFamilyClasses = Record<TextFontFamily, ClassNameValue>;

export const textColorClasses: TextColorClasses = {
  default: 'text-black',
  primary: 'text-sky-500',
  error: 'text-red-500',
  success: 'text-green-500',
};

export const textWeightClasses: TextWeightClasses = {
  normal: 'font-normal',
  bold: 'font-bold',
  black: 'font-black',
  light: 'font-light',
  lighter: 'font-thin',
};

export const textSizeClasses: TextSizeClasses = {
  '8': 'text-2xs',
  '10': 'text-xs',
  '12': 'text-sm',
  '14': 'text-base',
  '16': 'text-lg',
  '18': 'text-xl',
  '20': 'text-2xl',
  '24': 'text-3xl',
  '30': 'text-4xl',
  '36': 'text-5xl',
  '48': 'text-6xl',
  '60': 'text-7xl',
  '72': 'text-8xl',
};

export const textAlignClasses: TextAlignmentClasses = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify',
};

export const textFontFamilyClasses: TextFontFamilyClasses = {
  roboto: 'font-roboto',
  'roboto-condensed': 'font-roboto-condensed',
};
