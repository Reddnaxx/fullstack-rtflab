import { forwardRef } from 'react';

import { cn } from '../../lib/helpers/cn';

import type { ComponentProps, FC, ReactNode } from 'react';

type TextareaProps = Omit<ComponentProps<'textarea'>, 'prefix'> & {
  label: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  error?: string;
};

export const TextArea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      className,
      placeholder,
      suffix,
      prefix,
      error,
      required,
      ...props
    },
    ref
  ) => {
    const textareaClassNames = cn(
      'p-2 border border-gray-400 rounded-md hover:border-black peer pt-5 outline-0 focus:outline-2 outline-blue-500 w-full transition-colors autofill:outline-2',
      {
        'pl-9': prefix,
        'pr-9': suffix,
        'border-red-500 outline-red-500': error,
      }
    );

    return (
      <label className={cn('flex w-fit flex-col gap-1 text-lg', className)}>
        <div className="relative">
          <textarea
            ref={ref}
            placeholder={placeholder ?? ''}
            className={textareaClassNames}
            {...props}
          />

          <TextAreaLabel
            className={cn({
              'pl-7': prefix,
            })}
          >
            {label}
            {required && (
              <span className="pl-[.25ch] font-light text-red-400">*</span>
            )}
          </TextAreaLabel>

          {prefix && (
            <TextareaAttachment childrenPosition={'prefix'}>
              {prefix}
            </TextareaAttachment>
          )}
          {suffix && (
            <TextareaAttachment childrenPosition={'suffix'}>
              {suffix}
            </TextareaAttachment>
          )}
        </div>

        {error && <TextareaError error={error} />}
      </label>
    );
  }
);

TextArea.displayName = 'Textarea';

interface TextAreaLabelProps {
  children?: ReactNode;
  className?: string;
}

const TextAreaLabel: FC<TextAreaLabelProps> = ({ children, className }) => {
  return (
    <span
      className={cn(
        'pointer-events-none absolute left-2 top-1 text-sm select-none transition-all',
        className
      )}
    >
      {children}
    </span>
  );
};

interface TextareaChildrenProps {
  childrenPosition?: 'prefix' | 'suffix';
  children: ReactNode;
}

const TextareaAttachment: FC<TextareaChildrenProps> = ({
  childrenPosition,
  children,
}) => {
  return (
    <div
      className={cn('absolute top-1/2 -translate-y-1/2', {
        'left-2': childrenPosition !== 'suffix' && children,
        'right-2': childrenPosition === 'suffix' && children,
      })}
    >
      {children}
    </div>
  );
};

interface TextareaErrorProps {
  error: string;
}

const TextareaError: FC<TextareaErrorProps> = ({ error }) => {
  return <span className="text-sm text-red-500">{error}</span>;
};

export default TextArea;
