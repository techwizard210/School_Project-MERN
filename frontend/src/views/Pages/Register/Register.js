import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser} from "../../../actions/authActions";
// import classnames from "classnames";

class Register extends Component {
    constructor(){
      super();
      this.state = {
        name: "",
        userid: "",
        email: "",
        password: "",
        confirmpassword: "",
        errors: {}
      };
    }

    componentDidMount(){
      if (this.props.auth.isAuthenticated){
        this.props.history.push('/dashboard');
      }
    }

    componentWillReceiveProps(nextProps) {
      if(nextProps.errors) {
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

      const newUser = {
        name: this.state.name,
        userid: this.state.userid,
        email: this.state.email,
        password: this.state.password,
        confirmpassword: this.state.confirmpassword,
        role:"inactive"
      };

      this.props.registerUser(newUser, this.props.history);

    };


    render() {

        const { errors } = this.state;
        return (
            <div className="auth-wrapper">
                <div className="auth-inner1" >

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
                        <h3>Sign Up</h3>

                        <div className="form-group">
                            <label>Name</label>
                            <input onChange={this.onChange} value={this.state.name} type="text" id="name" className="form-control" placeholder="name" />
                            <span className="red-text"><code>{errors.name}</code></span>
                        </div>

                        <div className="form-group">
                            <label>UserID</label>
                            <input onChange={this.onChange} type="text" id="userid"  placeholder="Enter UserID" className="form-control" value={this.state.userid} />
                            <span className="red-text"><code>{errors.userid}</code></span>
                        </div>

                        <div className="form-group">
                            <label>Email address</label>
                            <input type="email" className="form-control" id="email" placeholder="Enter email"  onChange={this.onChange} value={this.state.email} error={errors.email}/>
                            <span className="red-text"><code>{errors.email}</code></span>
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" id="password" placeholder="Enter password" onChange = {this.onChange} value = {this.state.password} error = { errors.password}/>
                            <span className="red-text"><code>{errors.password}</code></span>
                        </div>

                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input type="password" className="form-control" id="confirmpassword" placeholder="Confirm password" onChange = {this.onChange} value = {this.state.confirmpassword} error = { errors.confirmpassword}/>
                            <span className="red-text"><code>{errors.confirmpassword}</code></span>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                        <p className="forgot-password text-right">
                            Already registered <a href={'/sign-in'}>sign in?</a>
                        </p>
                    </form>
                </div>
            </div>
        );
    }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
 