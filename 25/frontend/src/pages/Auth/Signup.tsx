import React from 'react';
import { z } from 'zod';
import Button from '../../components/Button/Button';
import Form from '../../components/Form/Form';
import Input from '../../components/Input';
import useFormHook from '../../util/useFormHook';
import Auth from './Auth';

const schema = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string().min(5),
});

// type Props = {
//   loading: boolean;
//   onSignup(e: FormEvent<HTMLFormElement>, options: any): void;
// }

type SignupData = z.infer<typeof schema>;
const defaultValues: SignupData = { email: '', name: '', password: '' };

const Signup: React.FC = () => {
  const formHook = useFormHook(schema, defaultValues);

  const onSubmit = (data: SignupData) => {
    console.log(data);
    // onLogin(e, { email: "TODO", password: "TODO" });
  };

  return (
    <Auth>
      <Form formHook={formHook} onSubmit={onSubmit}>
        <Input name="email" label="Your E-Mail" type="email" />
        <Input name="name" label="Your Name" />
        <Input name="password" label="Password" type="password" />
        <Button mode="raised" type="submit" /* loading={loading} */>
          Signup
        </Button>
      </Form>
    </Auth>
  );
};

export default Signup;

// onBlur={this.inputBlurHandler.bind(this, 'email')}
// valid={this.state.signupForm['email'].valid}
// touched={this.state.signupForm['email'].touched}

// onBlur={this.inputBlurHandler.bind(this, 'name')}
// valid={this.state.signupForm['name'].valid}
// touched={this.state.signupForm['name'].touched}

// onBlur={this.inputBlurHandler.bind(this, 'password')}
// valid={this.state.signupForm['password'].valid}
// touched={this.state.signupForm['password'].touched}
