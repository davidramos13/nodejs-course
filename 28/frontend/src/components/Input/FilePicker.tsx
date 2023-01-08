import React, { ChangeEvent, useId } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { DivInput, LblInput, TxtInput } from './styles';

type Props = {
  name: string;
  label?: string;
  className?: string;
  placeholder?: string;
  onFileChange: (files: FileList) => void;
};

const FilePicker = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { name, label, onFileChange, ...rest } = props;
  const id = useId();
  const { control } = useFormContext();
  const { field, fieldState } = useController({ name, control });

  const { ref: _ref, value: _value, onChange, ...restField } = field;
  const { error } = fieldState;

  const onChangeFull = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    onChange(e.target.files);
    const files = e.target.files as FileList;
    onFileChange(files);
  };

  return (
    <DivInput>
      {label && <LblInput htmlFor={id}>{label}</LblInput>}
      <TxtInput
        type="file"
        id={id}
        ref={ref}
        {...restField}
        invalid={!!error}
        onChange={onChangeFull}
        {...rest}
      />
    </DivInput>
  );
});
FilePicker.displayName = 'FilePicker';

export default FilePicker;
