import { DefaultValues, useForm, FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type DefaultType<T> = DefaultValues<T> | ((payload?: unknown) => Promise<T>);
function useFormHook<T extends FieldValues>(
  schema: yup.AnyObjectSchema,
  defaultValues: DefaultType<T>,
) {
  const hook = useForm<T>({ defaultValues, resolver: yupResolver(schema) });
  return hook;
}

export default useFormHook;
