import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container, Collapse } from 'reactstrap';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Message from "../../views/Message";
import {
  AppAside,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';
import axios from 'axios';

const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));
const Users = React.lazy(() => import('../../views/Users/Users'));

class DefaultLayout extends Component {

  constructor(props){
    super(props);
    this.collapse = React.createRef();
    this.state={
      accordion: [false, false, false],
      user:[]
    }
    const id = this.props.auth.user.id;
    axios.get('/api/users/user/' + id)
      .then(res=>{
        this.setState ({
          user: res.data
        })
      })
    console.log(this.props.auth);
    
    console.log("construct");
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

    toggleAccordion(tab) {
    if (!this.state.accordion[0]) {
      // attach/remove event handler
      document.addEventListener('click', this.handleOutsideClick, false);
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false);
    }

    var status = !this.state.accordion[0];
    var temp = this.state.accordion;
    temp[0] = status;

    this.setState({
       accordion: temp,
    });
  }
  
  handleOutsideClick(e) {
    // ignore clicks on the component itself

    var that = document.getElementById("collapse")

    if (that.contains(e.target)) {
      return;
    }
    
    this.toggleAccordion();
  }

  // toggleAccordion(tab) {

  //   const prevState = this.state.accordion;
  //   const state = prevState.map((x, index) => tab === index ? !x : false);

  //   this.setState({
  //     accordion: state,
  //   });
  // }


  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  signOut(e) {
    e.preventDefault()
    // this.props.history.push('/signin')
     this.props.logoutUser();
    // console.log(this.props)

  }

  componentDidMount(){
    console.log("didmount");


    // const id = this.props.auth.user.id;
    // axios.get('/api/users/' + id)
    //   .then(res=>{
    //     this.setState ({
    //       user: res.data
    //     })
    //   })
  }

  render() {
    console.log(this.props.auth.user.admin)
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense  fallback={this.loading()}>
            <DefaultHeader onLogout={e=>this.signOut(e)} onToggle={e=>this.toggleAccordion(e)} id = {this.props.auth.user.id}/>
          </Suspense>
        </AppHeader>
        <Collapse isOpen={this.state.accordion[0]} data-parent="#accordion" id="collapseOne" aria-labelledby="headingOne" id = "collapse">

          <Message/>  

        </Collapse> 
        <div className="app-body">
          {/* <AppSidebar fixed display="lg"> */}
          <AppSidebar display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
            <AppSidebarNav navConfig={navigation} {...this.props} router={router}/>
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes} router={router}/>
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )} />
                    ) : (null);
                  })}
                  {this.props.auth.user.admin === "admin" ? 
                  <Route path="/users" name="Users" component={Users} />
                :""}
                  <Redirect from="/" to="/dashboard" />
                </Switch>
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside />
            </Suspense>
          </AppAside>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

DefaultLayout.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(DefaultLayout);;
