import { forwardRef } from 'react';

import { cn } from '../../lib/helpers/cn';

import type { ComponentProps, FC, ReactNode } from 'react';

type ErrorSpace = 'dynamic' | 'static';

type InputRounded = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

type InputProps = Omit<ComponentProps<'input'>, 'prefix'> & {
  label: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  error?: string;
  errorSpace?: ErrorSpace;
  rounded?: InputRounded;
};

const roundedClasses: Record<InputRounded, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      className,
      placeholder,
      type,
      suffix,
      prefix,
      error,
      required,
      rounded = 'md',
      errorSpace = 'dynamic',
      ...props
    },
    ref
  ) => {
    const inputClassNames = cn(
      'p-2 border border-gray-400 hover:border-black peer pt-3.5 placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:transition-opacity outline-0 focus:outline-2 outline-blue-500 w-full transition-all autofill:outline-2 text-black',
      roundedClasses[rounded],
      {
        'pl-9': prefix,
        'pr-9': suffix,
        'border-red-500 outline-red-500': error,
      }
    );

    return (
      <label
        className={cn('flex w-fit flex-col gap-1 text-lg relative', className)}
      >
        <div className="relative">
          <input
            ref={ref}
            type={type}
            placeholder={placeholder ?? ''}
            className={inputClassNames}
            {...props}
          />

          <InputLabel
            className={cn({
              'pl-7': prefix,
            })}
          >
            {label}
            {required && (
              <span className="pl-[.25ch] font-light text-red-400">*</span>
            )}
          </InputLabel>

          {prefix && (
            <InputAttachment childrenPosition={'prefix'}>
              {prefix}
            </InputAttachment>
          )}
          {suffix && (
            <InputAttachment childrenPosition={'suffix'}>
              {suffix}
            </InputAttachment>
          )}
        </div>

        <InputError error={error} space={errorSpace} />
      </label>
    );
  }
);

Input.displayName = 'Input';

interface InputLabelProps {
  children?: ReactNode;
  className?: string;
}

const InputLabel: FC<InputLabelProps> = ({ children, className }) => {
  return (
    <span
      className={cn(
        'pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 select-none transition-all peer-focus:top-3 peer-focus:text-sm peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:text-sm peer-autofill:text-sm peer-autofill:top-3 text-gray-600',
        className
      )}
    >
      {children}
    </span>
  );
};

interface InputChildrenProps {
  childrenPosition?: 'prefix' | 'suffix';
  children: ReactNode;
}

const InputAttachment: FC<InputChildrenProps> = ({
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

interface InputErrorProps {
  error?: string;
  space?: ErrorSpace;
}

const InputError: FC<InputErrorProps> = ({ error, space }) => {
  const errorClassNames = cn('text-sm text-red-500 min-h-5');

  if (space === 'static') {
    return <span className={errorClassNames}>{error}</span>;
  }

  return (
    error && (
      <span
        className={cn(
          'text-sm text-red-500 absolute bottom-[75%] right-5 bg-white border-red-500 border rounded-lg p-1 animate-appear'
        )}
      >
        {error}
      </span>
    )
  );
};

export default Input;
