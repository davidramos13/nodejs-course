import React, { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import Button from '../../components/Button/Button';
import ErrorHandler from '../../components/ErrorHandler';
import Form from '../../components/Form/Form';
import Input from '../../components/Input';
import { PutSignup, useSignupMutation } from '../../store/auth/apis';
import useFormHook from '../../util/useFormHook';
import Auth from './Auth';

const schema = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string().min(5),
});

const defaultValues: PutSignup = { email: '', name: '', password: '' };

const Signup: React.FC = () => {
  const formHook = useFormHook(schema, defaultValues);
  const [signup, { isLoading, error }] = useSignupMutation();
  const navigate = useNavigate();

  const onSubmit = async (data: PutSignup) => {
    await signup(data).unwrap();
    navigate('/');
  };

  return (
    <Fragment>
      <ErrorHandler error={error} />
      <Auth>
        <Form formHook={formHook} onSubmit={onSubmit}>
          <Input name="email" label="Your E-Mail" type="email" />
          <Input name="name" label="Your Name" />
          <Input name="password" label="Password" type="password" />
          <Button mode="raised" type="submit" loading={isLoading}>
            Signup
          </Button>
        </Form>
      </Auth>
    </Fragment>
  );
};

export default Signup;
