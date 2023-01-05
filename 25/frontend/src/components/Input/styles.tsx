import tw, { styled } from 'twin.macro';

export const DivInput = tw.div`my-4 w-full`;
export const LblInput = tw.label`block uppercase mb-1`;

type CssInputProps = { invalid: boolean };

const cssFn = ({ invalid }: CssInputProps) => [
  tw`block py-1 px-2 w-full rounded border border-gray-400`,
  tw`focus:outline-none focus:text-$violet focus:border-$violet`,
  invalid && tw`border border-$red bg-[#ffc2c2]`,
];

export const TxtInput = styled.input<CssInputProps>(cssFn);
export const TxtArea = styled.textarea<CssInputProps>(cssFn);
