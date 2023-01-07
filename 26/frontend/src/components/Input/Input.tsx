import React, { useId } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { DivInput, LblInput, TxtInput } from './styles';

type Props = {
  name: string;
  label?: string;
  className?: string;
  type?: string;
  placeholder?: string;
};

const Input = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { name, label, type = 'text', ...rest } = props;
  const id = useId();
  const { control } = useFormContext();
  const { field, fieldState } = useController({ name, control });

  const { ref: _, value, ...restField } = field;
  const { error } = fieldState;

  return (
    <DivInput>
      {label && <LblInput htmlFor={id}>{label}</LblInput>}
      <TxtInput
        type={type}
        id={id}
        ref={ref}
        {...restField}
        invalid={!!error}
        value={value}
        {...rest}
      />
    </DivInput>
  );
});
Input.displayName = 'Input';

export default Input;
