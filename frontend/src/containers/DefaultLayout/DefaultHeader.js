import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Badge, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';
import axios from 'axios';
import { AppAsideToggler, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
// import logo from '../../assets/img/brand/logo.svg'
import logo1 from '../../assets/img/brand/school.svg'
import sygnet from '../../assets/img/brand/sygnet.svg'
//import Message from '../../views/Message';
// import logo2 from '../../assets/img/brand/logo1.svg'
// import icon from '../../assets/img/brand/icon.svg'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {

  constructor (props) {
    super(props);
    this.state={
      user:{},
      //accordion: [false, false, false],
    }

    //this.toggleAccordion = this.toggleAccordion.bind(this);
  }

  // toggleAccordion(tab) {

  //   const prevState = this.state.accordion;
  //   const state = prevState.map((x, index) => tab === index ? !x : false);

  //   this.setState({
  //     accordion: state,
  //   });
  // }


  componentDidMount(){

    const id = this.props.id;
    axios.get('/api/users/user/' + id)
      .then(res=>{
        this.setState ({
          user: res.data
        })
      })
  }

  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;
    const userLink = `/updateuser/${this.props.id}`

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo1, width: 89, height: 25, alt: 'CoreUI Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg"/>

        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
          </NavItem>
          {this.state.user.admin == "admin" ? 
          <NavItem className="px-3">
            <Link to="/users" className="nav-link">Users</Link>
          </NavItem>
          :""}
          <NavItem className="px-3">
            <NavLink to="/schools" className="nav-link">Schools</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink to="/message" className="nav-link">Messages</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink to="/tasks" className="nav-link">Tasks</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink to="#" className="nav-link" onClick={() => this.props.onToggle(0)} >Collapse</NavLink>
            {/* <Button block color="link" className="text-left m-0 p-0" onClick={() => this.props.onToggle(0)} aria-expanded={this.state.accordion[0]} aria-controls="collapseOne">
              Collapse
            </Button> */}
          </NavItem>
          <NavItem className="px-3">
            <NavLink to="/chat" className="nav-link">Chat</NavLink>
          </NavItem>
        </Nav>
        <Nav className="ml-auto">
          <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-bell"></i><Badge pill color="danger">5</Badge></NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-list"></i></NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-location-pin"></i></NavLink>
          </NavItem>
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <img src={this.state.user.imgurl} className="img-avatar" alt="admin@bootstrapmaster.com" />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
              <DropdownItem><i className="fa fa-bell-o"></i><Link to={userLink}> Updates</Link><Badge color="info">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-envelope-o"></i><Link to="/message"> Messages</Link><Badge color="success">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-tasks"></i><Link to="/tasks"> Tasks<Badge color="danger">42</Badge></Link></DropdownItem>
              <DropdownItem><i className="fa fa-comments"></i> Comments<Badge color="warning">42</Badge></DropdownItem>
              <DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem>
              <DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem>
              <DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem>
              <DropdownItem><i className="fa fa-usd"></i> Payments<Badge color="secondary">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-file"></i> Projects<Badge color="primary">42</Badge></DropdownItem>
              <DropdownItem divider />
              <DropdownItem><i className="fa fa-shield"></i> Lock Account</DropdownItem>
              <DropdownItem onClick={e => this.props.onLogout(e)}><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        <AppAsideToggler className="d-md-down-none" />
        {/* <AppAsideToggler className="d-lg-none" mobile /> */}         

      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
