import React from 'react';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import { TextFieldGroup } from '../';
import { Header } from 'semantic-ui-react';

function validateInput(data) {
  const errors = {};

  if (Validator.isEmpty(data.username)) {
    errors.username = 'This field is required';
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'This field is required';
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'This field is required';
  }
  if (Validator.isEmpty(data.passwordConfirmation)) {
    errors.passwordConfirmation = 'This field is required';
  }
  if (!Validator.equals(data.password, data.passwordConfirmation)) {
    errors.passwordConfirmation = 'Passwords must match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

// Use class components for top-components to get hot reloading working
class SignupForm extends React.Component {
  // Defining the state in the constructor
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      errors: {},
      isLoading: false,
      invalid: false
    };

    // Binding the right context to the onChange and onSubmit methods
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.checkUserExists = this.checkUserExists.bind(this);
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  checkUserExists(e) {
    const field = e.target.name;
    const val = e.target.value;
    if (val !== '') {
      this.props.isUserExists(val).then(res => {
        const errors = this.state.errors;
        let invalid;
        if (!isEmpty(res.data.user)) {
          errors[field] = 'There is user with such ' + field;
          invalid = true;
        } else {
          errors[field] = '';
          invalid = false;
        }
        this.setState({ errors, invalid });
      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    // Condition for client side validation
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.userSignupRequest(this.state).then(
        () => {
          // success from server
          this.props.showFlashMessageWithTimeout({
            type: 'success',
            text: 'You signed up successfully. Welcome!'
          });
          this.context.router.push('/');
        })
          // error from server
        .catch(error => {
          this.setState({ errors: error.response.data, isLoading: false });
        });
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <form onSubmit={this.onSubmit} id="signup-form">
        <Header as="h1" textAlign="center">
          Create your account
        </Header>

				<TextFieldGroup
					error={errors.username}
					label="Username"
          checkUserExists={this.checkUserExists}
					onChange={this.onChange}
					value={this.state.username}
          field="username"
    />

				<TextFieldGroup
					error={errors.email}
					label="Email"
          checkUserExists={this.checkUserExists}
					onChange={this.onChange}
					value={this.state.email}
					field="email"
    />

				<TextFieldGroup
					error={errors.password}
					label="Password"
					onChange={this.onChange}
					value={this.state.password}
					field="password"
          type="password"
    />

				<TextFieldGroup
					error={errors.passwordConfirmation}
					label="Password Confirmation"
					onChange={this.onChange}
					value={this.state.passwordConfirmation}
					field="passwordConfirmation"
          type="password"
    />

        <div className="form-group">
          <button
            className="btn btn-primary btn-lg"
            disabled={this.state.isLoading || this.state.invalid}
          >
            Sign up
          </button>
        </div>
      </form>
    );
  }
}

SignupForm.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
  showFlashMessageWithTimeout: React.PropTypes.func.isRequired,
  isUserExists: React.PropTypes.func.isRequired
};

SignupForm.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default SignupForm;
