import React from 'react';
import { DivInput, LblInput, TxtArea, TxtInput } from './sharedStyles';

type Props = { id: string; label?: string; value: string; multiline?: boolean;
  type?: string; placeholder?:string; rows?: number;
  onChange(id: string, value: string, files?: FileList | null): void };
const Input: React.FC<Props> = props => {
  const { id, label, value, multiline = false, type = 'text',
    placeholder, rows, onChange } = props;

  const control = multiline ? (
    <TxtArea
      id={id}
      rows={rows}
      value={value}
      onChange={e => onChange(id, e.target.value)}
    />
  ) : (
    <TxtInput
      type={type}
      id={id}
      value={value}
      placeholder={placeholder}
      onChange={e => onChange(id, e.target.value, e.target.files)}
    />
  )

  return (
    <DivInput>
      {label && <LblInput htmlFor={id}>{label}</LblInput>}
      {control}
    </DivInput>
  );
};

export default Input;
