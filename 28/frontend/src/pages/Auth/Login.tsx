import React, { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import Button from '../../components/Button/Button';
import ErrorHandler from '../../components/ErrorHandler';
import Form from '../../components/Form/Form';
import Input from '../../components/Input';
import { useAppDispatch } from '../../store';
import { LoginMutationVariables, useLoginMutation } from '../../store/auth/graphql/Login.generated';
import { setCredentials } from '../../store/auth/slice';
import useFormHook from '../../util/useFormHook';
import Auth from './Auth';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});

const defaultValues: LoginMutationVariables = { email: '', password: '' };

const Login: React.FC = () => {
  const formHook = useFormHook(schema, defaultValues);
  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginMutationVariables) => {
    const response = await login(data);
    if ('error' in response) return;

    dispatch(setCredentials(response.data.login));
    navigate('/');
  };

  return (
    <Fragment>
      <ErrorHandler error={error} />
      <Auth>
        <Form formHook={formHook} onSubmit={onSubmit}>
          <Input label="Your E-Mail" type="email" name="email" />
          <Input label="Password" type="password" name="password" />
          <Button mode="raised" type="submit" loading={isLoading}>
            Login
          </Button>
        </Form>
      </Auth>
    </Fragment>
  );
};

export default Login;
