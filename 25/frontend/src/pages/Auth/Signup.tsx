import React, { FormEvent } from 'react';
import Button from '../../components/Button/Button';
import Input from '../../components/Form/Input';
import Auth from './Auth';

// type Props = {
//   loading: boolean;
//   onSignup(e: FormEvent<HTMLFormElement>, options: any): void;
// }
const Signup: React.FC = () => {
  // const { loading, onSignup } = props;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    // onSignup(e, { }); // sending this.state
  };

  const onChange = () => {
    // TODO
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
          value="" // {this.state.signupForm['email'].value}
          // valid={this.state.signupForm['email'].valid}
          // touched={this.state.signupForm['email'].touched}
        />
        <Input
          id="name"
          label="Your Name"
          type="text"
          onChange={onChange}
          // onBlur={this.inputBlurHandler.bind(this, 'name')}
          value="" // {this.state.signupForm['name'].value}
          // valid={this.state.signupForm['name'].valid}
          // touched={this.state.signupForm['name'].touched}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          onChange={onChange}
          // onBlur={this.inputBlurHandler.bind(this, 'password')}
          value="" // {this.state.signupForm['password'].value}
          // valid={this.state.signupForm['password'].valid}
          // touched={this.state.signupForm['password'].touched}
        />
        <Button mode="raised" type="submit" /* loading={loading} */>
          Signup
        </Button>
      </form>
    </Auth>
  );
};

export default Signup;
