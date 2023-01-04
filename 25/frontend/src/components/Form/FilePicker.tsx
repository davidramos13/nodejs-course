import React from 'react';
import { DivInput, LblInput, TxtInput } from './sharedStyles';

type Props = { id: string; label: string;
  onChange(id: string, value: string, files?: FileList | null ): void;
};
const FilePicker: React.FC<Props> = props => {
  const { id, label, onChange } = props;

  return (
    <DivInput>
      <LblInput htmlFor={id}>{label}</LblInput>
      <TxtInput
        type="file"
        id={id}
        onChange={e => onChange(id, e.target.value, e.target.files)}
      />
    </DivInput>
  );
};

export default FilePicker;
