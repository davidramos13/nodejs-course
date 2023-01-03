import React from 'react';

type Props = { id: string; label: string;
  onChange(id: string, value: string, files?: FileList | null ): void;
};
const FilePicker: React.FC<Props> = props => {
  const { id, label, onChange } = props;

  return (
    <div className="input">
      <label htmlFor={id}>{label}</label>
      <input
        type="file"
        id={id}
        onChange={e => onChange(id, e.target.value, e.target.files)}
      />
    </div>
  );
};

export default FilePicker;
