import React from 'react';

type Props = { id: string; label?: string; value: string; multiline?: boolean;
  type?: string; placeholder?:string; rows?: number;
  onChange(id: string, value: string, files?: FileList | null): void };
const Input: React.FC<Props> = props => {
  const { id, label, value, multiline = false, type = 'text',
    placeholder, rows, onChange } = props;

  const control = multiline ? (
    <textarea
      id={id}
      rows={rows}
      value={value}
      onChange={e => onChange(id, e.target.value)}
    />
  ) : (
    <input
      type={type}
      id={id}
      value={value}
      placeholder={placeholder}
      onChange={e => onChange(id, e.target.value, e.target.files)}
    />
  )

  return (
    <div className="input">
      {label && <label htmlFor={id}>{label}</label>}
      {control}
    </div>
  );
};

export default Input;
