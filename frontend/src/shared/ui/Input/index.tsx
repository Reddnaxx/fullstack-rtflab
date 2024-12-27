import { ComponentProps, FC, ReactNode } from 'react';
import { cn } from '../../helpers/cn';

type InputProps = Omit<ComponentProps<'input'>, 'prefix'> & {
  label: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  error?: string;
};

export const Input: FC<InputProps> = ({
  label,
  className,
  placeholder,
  type,
  suffix,
  prefix,
  error,
  ...props
}) => {
  const inputClassNames = cn(
    'p-2 border rounded-md border-black peer pt-3.5 placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:transition-opacity outline-0 focus:outline-2 outline-blue-500',
    {
      'pl-9': prefix,
      'pr-9': suffix,
      'border-red-500 outline-red-500': error,
    },
    className
  );

  return (
    <label className="flex w-fit flex-col gap-1 text-lg">
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder ?? ''}
          className={inputClassNames}
          {...props}
        />

        <InputLabel
          label={label}
          className={cn({
            'pl-7': prefix,
          })}
        />

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

      {error && <InputError error={error} />}
    </label>
  );
};

interface InputLabelProps {
  label: string;
  className?: string;
}

const InputLabel: FC<InputLabelProps> = ({ label, className }) => {
  return (
    <span
      className={cn(
        'pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 select-none transition-all peer-focus:top-3 peer-focus:text-sm peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:text-sm',
        className
      )}
    >
      {label}
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
  error: string;
}

const InputError: FC<InputErrorProps> = ({ error }) => {
  return <span className="text-red-500">{error}</span>;
};

export default Input;
