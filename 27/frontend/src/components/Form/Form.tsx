import { PropsWithChildren } from 'react';
import { FieldValues, FormProvider, SubmitHandler, UseFormReturn } from 'react-hook-form';
import tw, { css, styled } from 'twin.macro';

const CssForm = styled.form<{ useStyled: boolean }>(({ useStyled }) => [
  ...(useStyled
    ? [
        tw`flex items-center`,
        css`
          & * {
            ${tw`my-0 mx-2`}
          }
        `,
      ]
    : []),
]);

type Props<T extends FieldValues> = {
  formHook: UseFormReturn<T, unknown>;
  onSubmit: SubmitHandler<T>;
  className?: string;
  useStyled?: boolean;
};

const Form = <T extends FieldValues>(props: PropsWithChildren<Props<T>>) => {
  const { children, formHook, onSubmit, className, useStyled = false } = props;

  return (
    <FormProvider {...formHook}>
      <CssForm
        className={className}
        onSubmit={formHook.handleSubmit(onSubmit)}
        noValidate
        useStyled={useStyled}>
        {children}
      </CssForm>
    </FormProvider>
  );
};

export default Form;
