import { zodResolver } from '@hookform/resolvers/zod';
import { DefaultValues, FieldValues, useForm } from 'react-hook-form';
import { z } from 'zod';

type DefaultType<T> = DefaultValues<T> | ((payload?: unknown) => Promise<T>);
function useFormHook<T extends FieldValues>(schema: z.AnyZodObject, defaultValues: DefaultType<T>) {
  const hook = useForm<T>({
    defaultValues,
    resolver: zodResolver(schema),
    mode: 'onTouched',
  });
  return hook;
}

export default useFormHook;
