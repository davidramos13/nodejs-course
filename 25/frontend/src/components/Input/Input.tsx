import React, { useId } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { DivInput, LblInput, TxtInput } from './styles';

type Props = {
  name: string;
  label?: string;
  className?: string;
  type?: string;
  placeholder?: string;
};

const Input = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { name, type = 'text', label, ...rest } = props;
  const id = useId();
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const { ref: _, value, ...restField } = field;
        const { error } = fieldState;
        const invalid = !!error;

        return (
          <DivInput>
            {label && <LblInput htmlFor={id}>{label}</LblInput>}
            <TxtInput
              type={type}
              id={id}
              ref={ref}
              {...restField}
              invalid={invalid}
              value={value}
              {...rest}
            />
          </DivInput>
        );
      }}
    />
  );
});
Input.displayName = 'Input';

export default Input;
