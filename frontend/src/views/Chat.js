import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Progress,
  Row,
  Table,
  InputGroup,
  InputGroupAddon,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Form,
  FormGroup,
  Label,
} from 'reactstrap';

import Converstion from './converstaion';
import ChatUsers from './chatUsers';
import ChatBox from './ChatBox';

import axios from 'axios';

class Tasks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      primary: false,
      user: 'chatting',
      user_id:'',
      client: '',
      file: null,
      imgCollection: null,
      tasks: [],
      alltasks: [],
      updatetask: [],
      alt: 0,
      activeTab: new Array(4).fill('1')
    };
    this.toggle = this.toggle.bind(this);
    this.setUser = this.setUser.bind(this);
    this.setUserId = this.setUserId.bind(this);


  }

 
  componentDidMount() {
    axios.get('api/users/task')
      .then(res => {
        this.setState({
          tasks: res.data,
          alltasks: res.data
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  search(e) {
    const searchName = e.target.value;
    const alltasks = this.state.alltasks;
    if (searchName === '') {
      this.setState({
        tasks: alltasks
      })
    } else {
      var data = this.state.alltasks;
      this.setState({
        tasks: data.filter(task => (task.tasktitle.indexOf(searchName) > -1) || (task.client.indexOf(searchName) > -1)),
      });
    }

  }

  updatesubmit(e) {
    e.preventDefault();
    const task = this.state.user;
    const id = task._id;
    axios.post("/api/users/updatetask/" + id, task, {
    }).then(res => {
      window.location.href = "/tasks";

    }).catch((error) => {
      //alert('Please choose a file');
    })
  }

  delete(id) {
    const data = this.state.tasks;
    this.setState({
      tasks: data.filter(task => task._id !== id),
    });
    axios.delete('/api/users/delete-task/' + id)
      .then((res) => {
        console.log('User sucessfully deleted!')
      }).catch((error) => {
        console.log(error)
      })
  }

  setUser(value) {
    this.setState({
      user: value,
    });
  }

  setUserId(value) {
    this.setState({
      user_id: value,
    });
  }

  toggle(tabPane, tab) {
    const newArray = this.state.activeTab.slice()
    newArray[tabPane] = tab
    this.setState({
      activeTab: newArray,
    });
  }

  tabPane() {
    return (
      <>
        <TabPane tabId="1">
          <Converstion setUser={this.setUser} setUserId={this.setUserId}/>
        </TabPane>
        <TabPane tabId="2">
          <ChatUsers setUser={this.setUser} setUserId={this.setUserId}/>
        </TabPane>
      </>
    );
  }

  render() {

    return (
      <div className="animated fadeIn">

        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-comments-o fa-lg "></i>Chat

                <Col className="float-right" md="4">
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <Button type="button" color="primary"><i className="fa fa-search"></i> Search</Button>
                    </InputGroupAddon>
                    <Input type="text" id="input1-group2" onChange={this.search} name="input1-group2" placeholder="" />
                  </InputGroup>
                </Col>

              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="12" md="6" className="mb-4">
                    <Nav tabs>
                      <NavItem>
                        <NavLink
                          active={this.state.activeTab[0] === '1'}
                          onClick={() => { this.toggle(0, '1'); }}
                        >
                        Chats
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          active={this.state.activeTab[0] === '2'}
                          onClick={() => { this.toggle(0, '2'); }}
                        >
                          Users
                        </NavLink>
                      </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab[0]}>
                      {this.tabPane()}
                    </TabContent>
                  </Col>
                  <Col xs="12" md="6" className="mb-4">
                    <ChatBox user = {this.state.user} user_id = {this.state.user_id}/>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

// export default Tasks;
Tasks.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps
)(Tasks);;
