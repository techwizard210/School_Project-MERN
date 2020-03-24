import React, { Component } from 'react';
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
  FormText,
  Badge
} from 'reactstrap';

import flag_config from './flag';

import axios from 'axios';

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
      tasks: []
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

    console.log(formData)
    axios.post("/api/users/addtask/", formData, {
    }).then(res => {
      window.location.href = "/tasks";

    }).catch((error) => {
      //alert('Please choose a file');
    })
  }


  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  componentDidMount() {
    axios.get('api/users/task')
      .then(res => {
        this.setState({
          tasks: res.data,
        });
        console.log(res.data)
      })
      .catch((error) => {
        console.log(error);
      })
  }



  render() {

    const data = this.state.tasks;
    const today = Date.now();

    const getpayment = (payment) => {
      return payment === 'Paypal' ? 'fa fa-paypal' :
        payment === 'Visa' ? 'fa fa-cc-visa' :
        payment === 'Credit' ? 'fa fa-credit-card-alt' :
        payment === 'Strip' ? 'fa fa-cc-stripe' :
        payment === 'Google' ? 'fa fa-google-wallet' :
        'fa fa-cc-mastercard'
    }

    let imgPreview;
    if (this.state.file) {
      imgPreview = <img src={this.state.file} alt='' style={{ size: "relative" }} />
    }

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
                        <ModalHeader toggle={this.toggle}>ADD TASK</ModalHeader>
                        <ModalBody>
                          <Form action={this.addtask} method="post" encType="multipart/form-data" className="form-horizontal">
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
                                <Input type="email" id="task-input" name="email-input" placeholder="" autoComplete="email" value={this.state.user.tasktitle} onChange={this.onChangeTaskTitle} />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col md="3" style={{ textAlign: "right" }}>
                                <Label htmlFor="text-input">Country</Label>
                              </Col>
                              <Col xs="12" md="9">
                                <Input type="email" id="task-input" name="email-input" placeholder="" autoComplete="email" value={this.state.user.country} onChange={this.onChangeCountry} />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col md="3" style={{ textAlign: "right" }}>
                                <Label htmlFor="text-input">Level</Label>
                              </Col>
                              <Col xs="12" md="9">
                                <Input type="email" id="task-input" name="email-input" placeholder="" autoComplete="email" value={this.state.user.level} onChange={this.onChangeLevel} />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col md="3" style={{ textAlign: "right" }}>
                                <Label htmlFor="text-input">Type</Label>
                              </Col>
                              <Col xs="12" md="9">
                                <Input type="email" id="task-input" name="email-input" placeholder="" autoComplete="email" value={this.state.user.type} onChange={this.onChangeType} />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col md="3" style={{ textAlign: "right" }}>
                                <Label htmlFor="text-input">Budget</Label>
                              </Col>
                              <Col xs="12" md="9">
                                <Input type="email" id="task-input" name="email-input" placeholder="" autoComplete="email" value={this.state.user.budget} onChange={this.onChangeBudget} />
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
                                <Input type="select" name="select" id="select" onChange={this.onChangePayment}>
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

                            <FormGroup row>
                              <Col md="3" style={{ textAlign: "right" }}>

                                <Label htmlFor="file-input">File input</Label>
                              </Col>
                              <Col xs="12" md="9">
                                {imgPreview}
                                <Input type="file" id="file-input" name="imgCollection" onChange={this.onFileChange} multiple />
                              </Col>
                            </FormGroup>

                            <FormGroup row hidden>
                              <Col md="3" style={{ textAlign: "right" }}>
                                <Label className="custom-file" htmlFor="custom-file-input">Custom file input</Label>
                              </Col>
                              <Col xs="12" md="9">
                                <Label className="custom-file">
                                  <Input className="custom-file" type="file" id="custom-file-input" name="file-input" />
                                  <span className="custom-file-control"></span>
                                </Label>
                              </Col>
                            </FormGroup>
                          </Form>
                        </ModalBody>
                        <ModalFooter>
                          <Button type="submit" color="primary" onClick={this.addtask}>Add Task</Button>{' '}
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
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => {
                      const flag = flag_config.find(flag => flag.id.toString() === item.country);
                      if ( flag !==undefined)
                      return (
                        <tr>
                          <td className="text-center">
                            <Row style={{ justifyContent: "left", paddingLeft: "20px" }}>
                              <div className="avatar">
                                <img src={item.imgurl} className="img-avatar" alt="admin@bootstrapmaster.com" />
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
                                <small className="text-muted">Jun 11, 2015 - {item.deadline}</small>
                              </div>
                            </div>
                          </td>
                          <td className="text-center">
                            <i className={getpayment(item.payment)} style={{ fontSize: 24 + 'px' }}></i>
                          </td>
                          <td>
                            <div className="clearfix">
                              <div className="float-left">
                                <strong>{item.progress}</strong>
                              </div>
                              <div className="float-left">
                                <small className="text-muted">{item.date}- {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(today)}</small>
                              </div>
                            </div>
                            <Progress className="progress-xs" color="info" value={item.progress} />
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

export default Tasks;
