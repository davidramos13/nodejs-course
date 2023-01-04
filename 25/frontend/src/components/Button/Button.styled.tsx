import { Link } from "react-router-dom";
import tw, { css, styled } from "twin.macro";

export type CssButtonProps = {
  mode?: 'flat' | 'raised';
  design?: 'accent' | 'danger' | 'success';
};

const mainCss = [
  tw`border border-$violet text-$violet bg-none px-4 py-2`,
  tw`cursor-pointer uppercase no-underline focus:outline-none leading-[18px]`,
  css`&:disabled {${tw`cursor-not-allowed shadow-none`}}`,
  css`&:active,&:hover {${tw`bg-$violet text-white`}}`,
  css`&:disabled,&:disabled:hover,&:disabled:active {
    ${tw`bg-gray-300 text-gray-500 border-gray-300`}}`,
];

const accent = [
  tw`border-$yellow text-$yellow`,
  css`&:active,&:hover {${tw`bg-$yellow text-$violet`}}`
];

const danger = [
  tw`border-$red text-$red`,
  css`&:active,&:hover {${tw`bg-$red text-white`}}`
];

const success = [
  tw`border-$green text-$green`,
  css`&:active,&:hover {${tw`bg-$green text-white`}}`
];

const flat = [
  tw`border-none`,
  css`&:active,&:hover {${tw`bg-$violet/[.3] text-$violet`}}`
];

const raised = [
  tw`bg-$violet text-white shadow-y1`,
  css`&:active,&:hover {${tw`bg-[#520288]`}}`
];

const flatAccent = [
  css`&:active,&:hover {${tw`bg-[#fab9404d] text-$yellow`}}`
];

const raisedAccent = [
  tw`bg-$yellow text-$violet`,
  css`&:active,&:hover {${tw`bg-[#fbc766]`}}`
];

const flatDanger = [
  css`&:active,&:hover {${tw`bg-$red/[.3] text-$red`}}`
];

const raisedDanger = [
  tw`bg-$red text-white`,
  css`&:active,&:hover {${tw`bg-[#c00000]`}}`
];

const flatSuccess = [
  css`&:active,&:hover {${tw`bg-$green/[.3] text-$green`}}`
];

const raisedSuccess = [
  tw`bg-$green text-white`,
  css`&:active,&:hover {${tw`bg-[#00a151]`}}`
];

const cssGroupedFn = ({ design, mode }: CssButtonProps) => [
  ...mainCss,
  ...(design === 'accent' ? accent : []),
  ...(design === 'danger' ? danger : []),
  ...(design === 'success' ? success : []),
  ...(mode === 'flat' ? [
    ...flat,
    ...(design === 'accent' ? flatAccent : []),
    ...(design === 'danger' ? flatDanger : []),
    ...(design === 'success' ? flatSuccess : []),
  ] : []),
  ...(mode === 'raised' ? [
    ...raised,
    ...(design === 'accent' ? raisedAccent : []),
    ...(design === 'danger' ? raisedDanger : []),
    ...(design === 'success' ? raisedSuccess : []),
  ] : []),
];

export const CssButton = styled.button<CssButtonProps>(cssGroupedFn);
export const CssLink = styled(Link)<CssButtonProps>(cssGroupedFn);
