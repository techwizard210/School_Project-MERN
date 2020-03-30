import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../../actions/authActions";
import SocialButton from "./Social-button";
import { Button } from 'reactstrap';
import GoogleLogin from 'react-google-login';// import classnames from "classnames";

class Login extends Component {

  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  responseGoogle = (response) => {
    const token = response.data
  }

  handleSocialLogin = (user) => {
    console.log(user)
  }

  handleSocialLoginFailure = (err) => {
    console.error(err)
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData)
  }

  render() {
    
    // const responseGoogle = (response) => {
    //   console.log(response);
    // }

    const { errors } = this.state;
    return (
      <div className="auth-wrapper">
        <div className="auth-inner">

          <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
              <Link className="navbar-brand" to={"/sign-in"}>School-Mernstack</Link>
              <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to={"/sign-in"}>Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <form noValidate onSubmit={this.onSubmit}>
            <h3>Sign In</h3>
            <span className="red-text"><code>{errors.role}</code></span>
            <div className="form-group">
              <label>Email address</label>
              <input type="email" className="form-control" id="email" placeholder="Enter email" onChange={this.onChange} value={this.state.email} error={errors.email} />
              <span className="text-"><code>{errors.email} {errors.emailnotfound}</code></span>
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" id="password" placeholder="Enter password" onChange={this.onChange} value={this.state.password} error={errors.password} />
              <span className=""><code>{errors.password} {errors.passwordincorrect}</code></span>
            </div>

            <div className="form-group">
              <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block">Submit</button>
            <p className="forgot-password text-right">
              Forgot <a href="#">password?</a>
            </p>
          </form>
          <div>
            {/* <SocialButton style = {{padding: "0px", border:"0px"}}
              provider='facebook'
              appId='YOUR_APP_ID'
              onLoginSuccess={this.handleSocialLogin}
              onLoginFailure={this.handleSocialLoginFailure}
            >
              <Button className="btn-facebook btn-brand mr-1 mb-1"><i className="fa fa-facebook"></i><span>Facebook</span></Button>
            </SocialButton>

            <div>
              <SocialButton style = {{padding: "0px", border:"0px"}}
                provider='google'
                clientId='925085432552-olvnonou07rhvs0pb3lndaejsedcdea6.apps.googleusercontent.com'
                onLoginSuccess={this.handleSocialLogin}
                onLoginFailure={this.handleSocialLoginFailure}
              >
                 <Button className="btn-google-plus btn-brand mr-1 mb-1"><i className="fa fa-google"></i><span>Google</span></Button>
              </SocialButton>
            </div> */}
            {/* <GoogleLogin
        clientId="352071222096-5r27r7faqc4unbmpshqjnhi3v3v8781g.apps.googleusercontent.com" //CLIENTID NOT CREATED YET
        buttonText="LOGIN WITH GOOGLE"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      /> */}
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
