import React from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import Button from '../../components/Button/Button';
import Form from '../../components/Form/Form';
import Input from '../../components/Input';
import useFormHook from '../../util/useFormHook';
import Auth from './Auth';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});

type LoginData = { email: string; password: string };
const defaultValues: LoginData = { email: '', password: '' };

const Login: React.FC = () => {
  const formHook = useFormHook(schema, defaultValues);

  const _onChange = () => {
    // TODO
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    // onLogin(e, { email: "TODO", password: "TODO" });
  };

  return (
    <Auth>
      <Form formHook={formHook} onSubmit={onSubmit}>
        <Input label="Your E-Mail" type="email" name="email" />
        <Input label="Password" type="password" name="password" />
        <Button mode="raised" type="submit" /* loading={loading} */>
          Login
        </Button>
      </Form>
    </Auth>
  );
};

export default Login;

// onBlur={this.inputBlurHandler.bind(this, 'email')}
// valid={this.state.loginForm['email'].valid}
// touched={this.state.loginForm['email'].touched}

// onBlur={this.inputBlurHandler.bind(this, 'password')}
// valid={this.state.loginForm['password'].valid}
// touched={this.state.loginForm['password'].touched}
