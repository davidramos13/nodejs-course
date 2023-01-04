import tw from 'twin.macro';

export const DivInput = tw.div`my-4 w-full`;
export const LblInput = tw.label`block uppercase mb-1`;

const baseCssInput = `block py-1 px-2 w-full rounded border
  border-gray-400 focus:outline-none focus:text-$violet
  focus:border-$violet`;
export const TxtInput = tw.input`${baseCssInput}`;
export const TxtArea = tw.textarea`${baseCssInput}`;
