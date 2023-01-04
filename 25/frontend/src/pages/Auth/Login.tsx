import React, { FormEvent } from 'react';
import Button from '../../components/Button/Button';
import Input from '../../components/Form/Input';
import Auth from './Auth';

// type Props = {
//   loading: boolean;
//   onLogin(e: FormEvent<HTMLFormElement>, options: { email: string; password: string }): void;
// }
const Login: React.FC = () => {
  // const { loading, onLogin } = props;

  const onChange = () => {
    // TODO
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    // onLogin(e, { email: "TODO", password: "TODO" });
  };

  return (
    <Auth>
      <form onSubmit={onSubmit}>
        <Input
          id="email"
          label="Your E-Mail"
          type="email"
          onChange={onChange}
          // onBlur={this.inputBlurHandler.bind(this, 'email')}
          value="" // {this.state.loginForm['email'].value}
          // valid={this.state.loginForm['email'].valid}
          // touched={this.state.loginForm['email'].touched}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          onChange={onChange}
          // onBlur={this.inputBlurHandler.bind(this, 'password')}
          value="" // {this.state.loginForm['password'].value}
          // valid={this.state.loginForm['password'].valid}
          // touched={this.state.loginForm['password'].touched}
        />
        <Button mode="raised" type="submit" /* loading={loading} */>
          Login
        </Button>
      </form>
    </Auth>
  );
};

export default Login;
