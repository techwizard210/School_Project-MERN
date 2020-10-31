import React, { Component } from 'react';
import { 
  Card, 
  CardBody, 
  CardHeader, 
  Col, 
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
  Badge, 
  Progress
} from 'reactstrap';
import axios from "axios";
import flag_config from '../flag';
// import usersData from './UsersData'

class User extends Component {

  constructor(props) {
    super(props)
    this.state = {
      user: {},
      tasks: [],
      alltasks: [],
      alt: 0,
      modal: false,
      file: null,
      imgCollection: null,
      updatetask: {}
    }
    axios.get('/api/users/user/' + this.props.match.params.id)
      .then(res => {
        this.setState({
          user: res.data
        })
      })

    this.updatesubmit = this.updatesubmit.bind(this);
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
    this.addtask = this.addtask.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.onChangeProgress = this.onChangeProgress.bind(this);
    this.onChangeActive = this.onChangeActive.bind(this);

  }

  update(id) {
    const data = this.state.alltasks;
    const update = data.filter(task => (task._id === id));
    this.setState({
      updatetask: update[0],
    });

    this.setState({
      modal: !this.state.modal,
      alt: 1
    });

  }

  updatesubmit(e) {
    e.preventDefault();
    const task = this.state.updatetask;
    const id = task._id;
    axios.post("/api/users/updatetask/" + id, task, {
    }).then(res => {
      this.setState({
        modal: !this.state.modal
      })
    }).catch((error) => {
      //alert('Please choose a file');
    })
  }

  onChangeClient(e) {

    var updatetask = this.state.updatetask;
    updatetask.client = e.target.value;
    this.setState({
      updatetask: updatetask
    })

  }

  onChangeTaskTitle(e) {

    var updatetask = this.state.updatetask;
    updatetask.tasktitle = e.target.value;
    this.setState({
      updatetask: updatetask
    })

  }

  onChangeCountry(e) {

    var updatetask = this.state.updatetask;
    updatetask.country = e.target.value;
    this.setState({
      updatetask: updatetask
    })

  }

  onChangeLevel(e) {

    var updatetask = this.state.updatetask;
    updatetask.level = e.target.value;
    this.setState({
      updatetask: updatetask
    })

  }

  onChangeType(e) {

    var updatetask = this.state.updatetask;
    updatetask.type = e.target.value;
    this.setState({
      updatetask: updatetask
    })

  }

  onChangeBudget(e) {

    var updatetask = this.state.updatetask;
    updatetask.budget = e.target.value;
    this.setState({
      updatetask: updatetask
    })

  }

  onChangeDeadline(e) {

    var updatetask = this.state.updatetask;
    updatetask.deadline = e.target.value;
    this.setState({
      updatetask: updatetask
    })

  }

  onChangeDescription(e) {

    var updatetask = this.state.updatetask;
    updatetask.description = e.target.value;
    this.setState({
      updatetask: updatetask
    })

  }

  onChangePayment(e) {

    var updatetask = this.state.updatetask;
    updatetask.payment = e.target.value;
    this.setState({
      updatetask: updatetask
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
    var updatetask = this.state.updatetask;
    updatetask.active = e.target.value;
    this.setState({
      updatetask: updatetask
    })
  }

  onChangeProgress(e) {
    var updatetask = this.state.updatetask;
    updatetask.progress = e.target.value;
    this.setState({
      updatetask: updatetask
    })
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
      alt: 0
    });

    this.setState({
      updatetask: {}
    })
  }

  addtask(e) {
    e.preventDefault();
    var formData = new FormData();
    for (const key of Object.keys(this.state.imgCollection)) {
      formData.append('imgCollection', this.state.imgCollection[key]);
    }
    formData.append('client', this.state.updatetask.client);
    formData.append('tasktitle', this.state.updatetask.tasktitle);
    formData.append('country', this.state.updatetask.country);
    formData.append('level', this.state.updatetask.level);
    formData.append('type', this.state.updatetask.type);
    formData.append('budget', this.state.updatetask.budget);
    formData.append('deadline', this.state.updatetask.deadline);
    formData.append('description', this.state.updatetask.description);
    formData.append('payment', this.state.updatetask.payment);
    formData.append('id', this.props.match.params.id);

    axios.post("/api/users/addtask/", formData, {
    }).then(res => {
      this.setState({
        modal: !this.state.modal
      })

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

  componentDidMount() {
    axios.get('/api/users/task/' + this.props.match.params.id)
      .then((res) => {
        this.setState({
          tasks: res.data,
          alltasks: res.data
        });
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    const data = this.state.tasks;

    const alt = this.state.alt;

    const id = this.props.match.params.id;
    // const user = usersData.find( user => user.id.toString() === this.props.match.params.id)
    const user = this.state.user;

    // const userDetails = user ? Object.entries(user) : [['id', (<span><i className="text-muted icon-ban"></i> Not found</span>)]]
    const getBadge = (status) => {
      return status === 'active' ? 'success' :
        status === 'inactive' ? 'secondary' :
          'primary'
    }

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

    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i>{user.userid}:{""}Information</strong>
              </CardHeader>
              <CardBody>
                <Table responsive hover className="table-outline mb-0 d-none d-sm-table">

                  <thead className="thead-light">
                    <tr>
                      <th className="text-center">Photo</th>
                      <th className="text-center"><i className="fa icon-user "></i>{" "}User</th>
                      <th className="text-center">User id</th>
                      <th className="text-center">User Email</th>
                      <th className="text-center">Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-center"><img style={{height:"100px", width:"100px"}} className="img-avatar" src={user.imgurl} /></td>
                      <td className="text-center">
                        <div style={{ marginLeft: "10px", paddingTop: "4%" }}>{user.name}</div>
                      </td>
                      <td className="text-center">
                        <div>{user.userid}</div>
                      </td>
                      <td className="text-center">
                        <div>{user.email}</div>
                      </td>
                      <td className="text-center"><div><Badge color={getBadge(user.role)} pill>{user.role}</Badge></div></td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-home fa-lg "></i>{user.userid} Tasks
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
                      </InputGroupAddon>
                  </InputGroup>
                </Col>
              </CardHeader>
              <Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-primary">
                <ModalHeader toggle={this.toggle}>{alt === 0 ? "ADD TASK" : "UPDATE TASK"} </ModalHeader>
                <ModalBody>
                  <Form action={this.addtask} method="post" encType="multipart/form-data" className="form-horizontal">
                    <Col style={{ textAlign: "center" }}>
                      <img src={this.state.updatetask.imgurl} alt='' style={{ size: "relative", borderRadius: "50%", width:"50px" }} />
                    </Col>

                    <FormGroup row>
                      <Col md="3" style={{ textAlign: "right" }}>
                        <Label htmlFor="text-input">Client</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="client" name="client" placeholder="" value={this.state.updatetask.client} onChange={this.onChangeClient} />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3" style={{ textAlign: "right" }}>
                        <Label htmlFor="text-input">Task Title</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="task-title" name="title-input" placeholder="" autoComplete="text" value={this.state.updatetask.tasktitle} onChange={this.onChangeTaskTitle} />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3" style={{ textAlign: "right" }}>
                        <Label htmlFor="text-input">Country</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="country-input" name="country-input" placeholder="" autoComplete="text" value={this.state.updatetask.country} onChange={this.onChangeCountry} />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3" style={{ textAlign: "right" }}>
                        <Label htmlFor="text-input">Level</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="level-input" name="level-input" placeholder="" autoComplete="text" value={this.state.updatetask.level} onChange={this.onChangeLevel} />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3" style={{ textAlign: "right" }}>
                        <Label htmlFor="text-input">Type</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="type-input" name="type-input" placeholder="" autoComplete="text" value={this.state.updatetask.type} onChange={this.onChangeType} />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3" style={{ textAlign: "right" }}>
                        <Label htmlFor="text-input">Budget</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="budget-input" name="budget-input" placeholder="" autoComplete="text" value={this.state.updatetask.budget} onChange={this.onChangeBudget} />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3" style={{ textAlign: "right" }}>
                        <Label htmlFor="date-input">Deadline</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="date" id="date-input" name="date-input" placeholder="date" value={this.state.updatetask.deadline} onChange={this.onChangeDeadline} />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3" style={{ textAlign: "right" }}>
                        <Label htmlFor="textarea-input">Description</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="textarea" name="textarea-input" id="textarea-input" rows="5"
                          placeholder="Content..." value={this.state.updatetask.description} onChange={this.onChangeDescription} />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3" style={{ textAlign: "right" }}>
                        <Label htmlFor="select">payment</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="select" name="select" id="select" value={this.state.updatetask.payment} onChange={this.onChangePayment}>
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
                              placeholder="" value={this.state.updatetask.progress} onChange={this.onChangeProgress} />
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Col md="3" style={{ textAlign: "right" }}>
                            <Label htmlFor="textarea-input">Active</Label>
                          </Col>
                          <Col xs="12" md="9">
                            <Input type="text" name="Active-input" id="textarea-input"
                              placeholder="" value={this.state.updatetask.active} onChange={this.onChangeActive} />
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
                    { data.length === 0 ?
                      <tr><td colSpan = "11" className="text-center">There is no data.</td></tr>
                      :
                      data.map((item, index) => {
                        const flag = flag_config.find(flag => flag.id.toString() === item.country);
                        if (flag !== undefined && item.id === id)
                          return (
                            <tr key={index}>
                              <td className="text-center">
                                <Row style={{ justifyContent: "left", paddingLeft: "20px" }}>
                                  <div className="avatar">
                                    <img src={item.imgurl} className="img-avatar" alt="admin@bootstrapmaster.com" />
                                    <span className="avatar-status badge-success"></span>
                                  </div>
                                  <div style={{ marginLeft: "10px", paddingTop: "4%" }}>{item.client}</div>
                                </Row>
                                <div className="small text-muted">
                                  <span>New</span> | assigned: {item.date}
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
                                <div style={{ color: color(item.active) }}>{item.active}</div>
                              </td>
                              <td>
                                <Button onClick={() => this.update(item._id)} block color="primary">Update</Button>
                                <Button onClick={() => this.delete(item._id)} block color="danger">Delete</Button>
                              </td>
                            </tr>)
                      }
                    )
                    }
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default User;
