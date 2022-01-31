import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import jwt_decode from "jwt-decode";
import setAuthToken from "./actions/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";
import PrivateRoute from "./actions/PrivateRoute";

import SignUp from './views/Pages/Register';
import Login from './views/Pages/Login';
import DefaultLayout from './containers/DefaultLayout';

// Containers
// const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  console.log(decoded, Date.now()/1000);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./sign-in";
  }
}

function App() {
  return (
    <Provider store={store}>
       <Router>
        <div className="App">
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={SignUp} />
            <Switch>
              {/* <PrivateRoute path="/" name="Home" render={props => <DefaultLayout {...props} />} /> */}
              <PrivateRoute path="/" name="Home" component={DefaultLayout}/>
            </Switch>

          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
