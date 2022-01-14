import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
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

import { createTask, getTasks, deleteTask, updateTask } from "../actions/taskAction";

import flag_config from './flag';

import axios from 'axios';

import { GET_TASKS } from '../actions/types';

class Tasks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      primary: false,
      user: {},
      client: '',
      file: null,
      imgCollection: null,
      tasks: [],
      alltasks: [],
      updatetask: [],
      alt: 0
    };

    this.toggle = this.toggle.bind(this);
    this.onChangeClient = this.onChangeClient.bind(this);
    this.onChangeTaskTitle = this.onChangeTaskTitle.bind(this);
    this.onChangeCountry = this.onChangeCountry.bind(this);
    this.onChangeLevel = this.onChangeLevel.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onChangeBudget = this.onChangeBudget.bind(this);
    this.onChangeDeadline = this.onChangeDeadline.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangePayment = this.onChangePayment.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.addtask = this.addtask.bind(this);
    this.search = this.search.bind(this);
    this.onChangeProgress = this.onChangeProgress.bind(this);
    this.onChangeActive = this.onChangeActive.bind(this);
    this.updatesubmit = this.updatesubmit.bind(this);
    this.delete = this.delete.bind(this);
  }

  onChangeClient(e) {

    var user = this.state.user;
    user.client = e.target.value;
    this.setState({
      user: user
    })

  }

  onChangeTaskTitle(e) {

    var user = this.state.user;
    user.tasktitle = e.target.value;
    this.setState({
      user: user
    })

  }

  onChangeCountry(e) {

    var user = this.state.user;
    user.country = e.target.value;
    this.setState({
      user: user
    })

  }

  onChangeLevel(e) {

    var user = this.state.user;
    user.level = e.target.value;
    this.setState({
      user: user
    })

  }

  onChangeType(e) {

    var user = this.state.user;
    user.type = e.target.value;
    this.setState({
      user: user
    })

  }

  onChangeBudget(e) {

    var user = this.state.user;
    user.budget = e.target.value;
    this.setState({
      user: user
    })

  }

  onChangeDeadline(e) {

    var user = this.state.user;
    user.deadline = e.target.value;
    this.setState({
      user: user
    })

    console.log(e.target.value)

  }

  onChangeDescription(e) {

    var user = this.state.user;
    user.description = e.target.value;
    this.setState({
      user: user
    })

  }

  onChangePayment(e) {

    var user = this.state.user;
    user.payment = e.target.value;
    this.setState({
      user: user
    })

  }

  onFileChange(e) {
    this.setState({ imgCollection: e.target.files });
    console.log(this.state.imgCollection);
    this.setState({
      file: URL.createObjectURL(e.target.files[0])
    })
  }

  onChangeActive(e) {
    var user = this.state.user;
    user.active = e.target.value;
    this.setState({
      user: user
    })
  }

  onChangeProgress(e) {
    var user = this.state.user;
    user.progress = e.target.value;
    this.setState({
      user: user
    })
  }


  addtask(e) {
    e.preventDefault();
    var formData = new FormData();
    for (const key of Object.keys(this.state.imgCollection)) {
      formData.append('imgCollection', this.state.imgCollection[key]);
    }
    formData.append('client', this.state.user.client);
    formData.append('tasktitle', this.state.user.tasktitle);
    formData.append('country', this.state.user.country);
    formData.append('level', this.state.user.level);
    formData.append('type', this.state.user.type);
    formData.append('budget', this.state.user.budget);
    formData.append('deadline', this.state.user.deadline);
    formData.append('description', this.state.user.description);
    formData.append('payment', this.state.user.payment);
    formData.append('id', this.props.auth.user.id);

    this.props.createTask(formData);

    this.setState({
      modal: !this.state.modal
    })
  
    // axios.post("/api/users/addtask/", formData, {
    // }).then(res => {
    //   window.location.href = "/tasks";

    // }).catch((error) => {
    //   //alert('Please choose a file');
    // })
  }


  toggle() {
    this.setState({
      modal: !this.state.modal,
      alt: 0
    });

    this.setState({
      user: []
    })
  }

  componentDidMount() {
    // axios.get('api/users/task')
    //   .then(res => {
    //     this.setState({
    //       tasks: res.data,
    //       alltasks: res.data
    //     });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   })
    this.props.getTasks();
    this.setState({
      tasks: this.props.tasks,
      alltasks: this.props.tasks
    })
  }

  search(e){
    console.log("ss");
    const searchName = e.target.value;
    const alltasks = this.props.tasks;
    if (searchName === '') {
      this.setState({
        tasks: alltasks
      })
    } else {
      var data = this.state.alltasks;
      // this.setState({
      //   tasks: data.filter(task => (task.tasktitle.indexOf(searchName) > -1) || (task.client.indexOf(searchName) > -1)),
      // });
      var tasks = data.filter(task => (task.tasktitle.indexOf(searchName) > -1) || (task.client.indexOf(searchName) > -1));
     // this.props.gettasks(tasks);
    }

  }

  update(id) {
    const data = this.props.tasks;
    const update = data.filter(task => (task._id === id))
    this.setState({
      user: update[0],
    });

    this.setState({
      modal: !this.state.modal,
      alt: 1
    });

  }

  updatesubmit(e) {
    e.preventDefault();
    const task = this.state.user;
    const id = task._id;
    // axios.post("/api/users/updatetask/" + id, task, {
    // }).then(res => {
    //   window.location.href = "/tasks";

    // }).catch((error) => {
    //   //alert('Please choose a file');
    // })
    this.props.updateTask(id, task);
    this.setState({
      modal: !this.state.modal
    });
  }

  delete(id) {
    this.props.deleteTask(id);
  }

  render() {

    const id = this.props.auth.user.id;

    const data = this.props.tasks;

    const alt = this.state.alt;

    const today = Date.now();

    const getpayment = (payment) => {
      return payment === 'Paypal' ? 'fa fa-paypal' :
        payment === 'Visa' ? 'fa fa-cc-visa' :
          payment === 'Credit' ? 'fa fa-credit-card-alt' :
            payment === 'Strip' ? 'fa fa-cc-stripe' :
              payment === 'Google' ? 'fa fa-google-wallet' :
                'fa fa-cc-mastercard'
    }

    const progress = (pecent) => {
      return pecent > 85 ? 'success' :
        pecent > 50 ? 'info' :
          pecent > 30 ? 'warning' :
            'danger'
    }

    const color = (status) => {
      return status === 'completed' ? '#4dbd74' :
      status === 'active' ? '#1985ac' :
      status === 'cancelled' ? '#f86c6b' :
            '#23282c'
    }

    let imgPreview;
    if (this.state.file) {
      imgPreview = <img src={this.state.file} alt='' style={{ size: "relative" }} />
    }
    //
    return (
      <div className="animated fadeIn">

        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-home fa-lg "></i>My Tasks

              <Col className="float-right" md="4">
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <Button type="button" color="primary"><i className="fa fa-search"></i> Search</Button>
                    </InputGroupAddon>
                    <Input type="text" id="input1-group2" onChange={this.search} name="input1-group2" placeholder="Task Title" />
                  </InputGroup>
                </Col>
                <Col className="float-right" md="1">
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <Button onClick={this.toggle} type="button" color="primary"><i className="icon-plus"></i> ADD</Button>

                      <Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-primary">
                        <ModalHeader toggle={this.toggle}>{alt === 0 ? "ADD TASK" : "UPDATE TASK"} </ModalHeader>
                        <ModalBody>
                          <Form action={this.addtask} method="post" encType="multipart/form-data" className="form-horizontal">
                            <Col style={{ textAlign: "center" }}>
                              <img src={this.state.user.imgurl} alt='' style={{ size: "relative", borderRadius: "50%", width: "50px" }} />
                            </Col>

                            <FormGroup row>
                              <Col md="3" style={{ textAlign: "right" }}>
                                <Label htmlFor="text-input">Client</Label>
                              </Col>
                              <Col xs="12" md="9">
                                <Input type="text" id="client" name="client" placeholder="" value={this.state.user.client} onChange={this.onChangeClient} />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col md="3" style={{ textAlign: "right" }}>
                                <Label htmlFor="text-input">Task Title</Label>
                              </Col>
                              <Col xs="12" md="9">
                                <Input type="text" id="task-title" name="title-input" placeholder="" autoComplete="text" value={this.state.user.tasktitle} onChange={this.onChangeTaskTitle} />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col md="3" style={{ textAlign: "right" }}>
                                <Label htmlFor="text-input">Country</Label>
                              </Col>
                              <Col xs="12" md="9">
                                <Input type="text" id="country-input" name="country-input" placeholder="" autoComplete="text" value={this.state.user.country} onChange={this.onChangeCountry} />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col md="3" style={{ textAlign: "right" }}>
                                <Label htmlFor="text-input">Level</Label>
                              </Col>
                              <Col xs="12" md="9">
                                <Input type="text" id="level-input" name="level-input" placeholder="" autoComplete="text" value={this.state.user.level} onChange={this.onChangeLevel} />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col md="3" style={{ textAlign: "right" }}>
                                <Label htmlFor="text-input">Type</Label>
                              </Col>
                              <Col xs="12" md="9">
                                <Input type="text" id="type-input" name="type-input" placeholder="" autoComplete="text" value={this.state.user.type} onChange={this.onChangeType} />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col md="3" style={{ textAlign: "right" }}>
                                <Label htmlFor="text-input">Budget</Label>
                              </Col>
                              <Col xs="12" md="9">
                                <Input type="text" id="budget-input" name="budget-input" placeholder="" autoComplete="text" value={this.state.user.budget} onChange={this.onChangeBudget} />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col md="3" style={{ textAlign: "right" }}>
                                <Label htmlFor="date-input">Deadline</Label>
                              </Col>
                              <Col xs="12" md="9">
                                <Input type="date" id="date-input" name="date-input" placeholder="date" value={this.state.user.deadline} onChange={this.onChangeDeadline} />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col md="3" style={{ textAlign: "right" }}>
                                <Label htmlFor="textarea-input">Description</Label>
                              </Col>
                              <Col xs="12" md="9">
                                <Input type="textarea" name="textarea-input" id="textarea-input" rows="5"
                                  placeholder="Content..." value={this.state.user.description} onChange={this.onChangeDescription} />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col md="3" style={{ textAlign: "right" }}>
                                <Label htmlFor="select">payment</Label>
                              </Col>
                              <Col xs="12" md="9">
                                <Input type="select" name="select" id="select" value={this.state.user.payment} onChange={this.onChangePayment}>
                                  <option value="0">Please select</option>
                                  <option value="Paypal">Paypal</option>
                                  <option value="Visa">Visa Card</option>
                                  <option value="Credit">Credit Card</option>
                                  <option value="Strip">Strip</option>
                                  <option value="Google">Google wellet</option>
                                  <option value="Master">Master Card</option>
                                </Input>
                              </Col>
                            </FormGroup>

                            {alt === 0 ? "" :
                              <>
                                <FormGroup row>
                                  <Col md="3" style={{ textAlign: "right" }}>
                                    <Label htmlFor="textarea-input">Progress</Label>
                                  </Col>
                                  <Col xs="12" md="9">
                                    <Input type="number" name="progress" id="progress-input"
                                      placeholder="" value={this.state.user.progress} onChange={this.onChangeProgress} />
                                  </Col>
                                </FormGroup>
                                <FormGroup row>
                                  <Col md="3" style={{ textAlign: "right" }}>
                                    <Label htmlFor="textarea-input">Active</Label>
                                  </Col>
                                  <Col xs="12" md="9">
                                    <Input type="text" name="Active-input" id="textarea-input"
                                      placeholder="" value={this.state.user.active} onChange={this.onChangeActive} />
                                  </Col>
                                </FormGroup>
                              </>
                            }
                            {alt === 0 ?
                              <FormGroup row>
                                <Col md="3" style={{ textAlign: "right" }}>

                                  <Label htmlFor="file-input">File input</Label>
                                </Col>
                                <Col xs="12" md="9">
                                  {imgPreview}
                                  <Input type="file" id="file-input" name="imgCollection" onChange={this.onFileChange} multiple />
                                </Col>
                              </FormGroup>
                              : ""}
                          </Form>
                        </ModalBody>
                        <ModalFooter>
                          {alt === 0 ?
                            <Button type="submit" color="primary" onClick={this.addtask}>Done</Button>
                            :
                            <Button type="submit" color="primary" onClick={this.updatesubmit}>Done</Button>
                          }
                          {' '}
                          <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                      </Modal>
                    </InputGroupAddon>
                  </InputGroup>
                </Col>
              </CardHeader>
              <CardBody>
                <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
                  <thead className="thead-light">
                    <tr>
                      <th className="text-center"><i className="fa icon-people "></i>{" "}Clients</th>
                      <th>Task Title</th>
                      <th className="text-center">Country</th>
                      <th>level</th>
                      <th>Type</th>
                      <th>Budget</th>
                      <th>Deadline</th>
                      <th className="text-center">Payment Method</th>
                      <th>Progress</th>
                      <th>Active</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => {
                      const flag = flag_config.find(flag => flag.id.toString() === item.country);
                      if (flag !== undefined && item.id === id)
                        return (
                          <tr key = {index}>
                            <td className="text-center">
                              <Row style={{ justifyContent: "left", paddingLeft: "20px" }}>
                                <div className="avatar">
                                  <img style={{width:"50px", height: "50px"}}src={item.imgurl} className="img-avatar" alt="admin@bootstrapmaster.com" />
                                  <span className="avatar-status badge-success"></span>
                                </div>
                                <div style={{ marginLeft: "10px", paddingTop: "4%" }}>{item.client}</div>
                              </Row>
                              <div className="small text-muted">
                                <span>New</span> | Registered: Jan 1, 2015
                              </div>
                            </td>
                            <td>
                              <div>{item.tasktitle}</div>
                            </td>
                            <td className="text-center">
                              <i className={flag.name} title={item.country} id={item.country}></i>
                            </td>
                            <td>
                              <div>{item.level}</div>
                            </td>
                            <td>
                              <div>{item.type}</div>
                            </td>
                            <td>
                              <div>{item.budget}</div>
                            </td>
                            <td>
                              <div className="clearfix">
                                <div className="float-left">
                                  <small className="text-muted">{item.date} - {item.deadline}</small>
                                </div>
                              </div>
                            </td>
                            <td className="text-center">
                              <i className={getpayment(item.payment)} style={{ fontSize: 24 + 'px' }} title={item.payment}></i>
                            </td>
                            <td>
                              <div className="clearfix">
                                <div className="float-left">
                                  <strong>{item.progress}%</strong>
                                </div>
                                <div className="float-right">
                                  <small className="text-muted">{item.date}- {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(today)}</small>
                                </div>
                              </div>
                              <Progress className="progress-xs" color={progress(item.progress)} value={item.progress} />
                            </td>
                            <td>
                              <div style = {{color:color(item.active)}}>{item.active}</div>
                            </td>
                            <td>
                              <Button onClick={() => this.update(item._id)} block color="primary">Update</Button>
                              <Button onClick={() => this.delete(item._id)} block color="danger">Delete</Button>
                            </td>
                          </tr>)
                    }
                    )}
                  </tbody>
                </Table>
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
  createTask: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  tasks: state.task.tasks,
});

export default connect(
  mapStateToProps,
  {createTask, getTasks, deleteTask, updateTask}
)(Tasks);;
