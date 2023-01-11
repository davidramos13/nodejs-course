import React, { useId } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { DivInput, LblInput, TxtArea } from './styles';

type Props = {
  name: string;
  label?: string;
  className?: string;
  placeholder?: string;
  rows?: number;
};
const TextArea = React.forwardRef<HTMLTextAreaElement, Props>((props, ref) => {
  const { name, label, ...rest } = props;
  const id = useId();
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const { ref: _, value, ...restField } = field;
        const { isTouched, error } = fieldState;
        const invalid = !!(isTouched && error);

        return (
          <DivInput>
            {label && <LblInput htmlFor={id}>{label}</LblInput>}
            <TxtArea id={id} ref={ref} {...restField} {...rest} value={value} invalid={invalid} />
          </DivInput>
        );
      }}
    />
  );
});
TextArea.displayName = 'TextArea';

export default TextArea;
