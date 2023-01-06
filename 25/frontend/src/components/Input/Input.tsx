import React, { ChangeEvent, useId } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { DivInput, LblInput, TxtInput } from './styles';

type Props = {
  name: string;
  label?: string;
  className?: string;
  type?: string;
  placeholder?: string;
  onFileChange?: (files: FileList) => void;
};

const Input = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { name, type = 'text', label, onFileChange, ...rest } = props;
  const id = useId();
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const { ref: _, value, onChange, ...restField } = field;
        const { error } = fieldState;
        const invalid = !!error;

        const onChangeFull = (e: ChangeEvent<HTMLInputElement>) => {
          onChange(e);
          if (type !== 'file' || !onFileChange || !e.target.files) return;
          const files = e.target.files as FileList;
          onFileChange(files);
        };

        return (
          <DivInput>
            {label && <LblInput htmlFor={id}>{label}</LblInput>}
            <TxtInput
              type={type}
              id={id}
              ref={ref}
              {...restField}
              invalid={invalid}
              onChange={onChangeFull}
              value={type === 'file' ? undefined : value}
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
