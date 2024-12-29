import type { TextColor, TextWeight } from './types';
import type { ClassNameValue } from 'tailwind-merge';

type TextColorClasses = Record<TextColor, ClassNameValue>;
type TextWeightClasses = Record<TextWeight, ClassNameValue>;

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