import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { 
  Card, 
  CardBody, 
  CardHeader, 
  Col, 
  Row, 
  Table, 
  InputGroup, 
  InputGroupAddon,
  Input, 
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  ModalFooter,
  InputGroupText
 } from 'reactstrap';
import axios from 'axios';
import UserTableRow from './UserTableRow';


class Users extends Component {

  constructor(){
    super()
    this.state={
      users:[],
      obb:[],
      modal: false,
      updateuser:{},
      file: null,  
      imgCollection: null,
    
    }

    //this.delete = this.delete.bind(this);
    //this.change = this.change.bind(this);
    this.search = this.search.bind(this);
    this.editUserModal = this.editUserModal.bind(this);
    this.toggle = this.toggle.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
  }

  onFileChange(e) {
    //console.log("image")
    this.setState({ imgCollection: e.target.files });
    const data = this.state.updateuser;
    data.imgurl = URL.createObjectURL(e.target.files[0]);
    this.setState({
      updateuser: data
    })
  }

  updateUser(e){
    e.preventDefault();
    var formData = new FormData();
    for (const key of Object.keys(this.state.imgCollection)) {
      formData.append('imgCollection', this.state.imgCollection[key]);
    }
    formData.append('userid', this.state.updateuser.userid);
    formData.append('name', this.state.updateuser.name);
    formData.append('email', this.state.updateuser.email);
    formData.append('id', this.state.updateuser._id);
    const id = this.state.updateuser._id;

    axios.post("/api/users/updateuser/" + id, formData, {
    }).then(res => {
      this.setState({
        modal: !this.state.modal
      })

    }).catch((error) => {
      //alert('Please choose a file');  
    })
  }

  onChange(e) {
    var data = this.state.updateuser;
    data.userid = e.target.value;
    this.setState({
        updateuser: data
    })
  }

  onChangeName(e) {
      var data = this.state.updateuser;
      data.name = e.target.value;
      this.setState({
        updateuser: data
      })
      console.log(data)
  }

  onChangeEmail(e) {
      var data = this.state.updateuser;
      data.email = e.target.value;
      this.setState({
        updateuser: data
      })
  }


  search(e){
    const searchName = e.target.value;   
    console.log(searchName) 
    if (searchName === ''){
      axios.get('api/users/users')
      .then(res => {
        this.setState({
          users: res.data
        });
      })
      .catch((error) => {
        console.log(error);
      })
    } else{
      var data = this.state.obb;
      this.setState({
        users: data.filter(user => user.name.indexOf(searchName)>-1),
      });
  }
    
  }

  editUserModal(id){

    const data = this.state.users;
    const update = data.filter(user => (user._id === id));
    this.setState({
      updateuser: update[0]
    });

    this.setState({
      modal: !this.state.modal
    });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });

    this.setState({
      edituser: {}
    })
  }

  change=id=>{
     var data = this.state.users;
      for (var i in data) {
        if (data[i]._id === id) {
           if(data[i].role === 'active'){
             data[i].role='inactive';
             break; //Stop this loop, we found it!
           }else{
             data[i].role = 'active';
           }

        }
      }
      this.setState({
        users:data
      })

    const user=this.state.users.filter(user => user._id === id)
    axios.put("api/users/change-action/"+id,user[0],{
    }).then(res => {
      //console.log(res.data)
    }).catch((err)=>{
      // this.setState({
      //   errors:  err.response.data
      })

    }

  delete=id=>{

    const data = this.state.users;
    this.setState({
      users: data.filter(user => user._id !== id),
    });
    console.log(this.state.users)
    axios.delete('/api/users/delete-user/' + id)
            .then((res) => {
                console.log('User sucessfully deleted!')
            }).catch((error) => {
                console.log(error)
            })
  }

  componentDidMount(){
    axios.get('api/users/users')
      .then(res => {
        this.setState({
          users: res.data,
          obb: res.data
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {


    const users = this.state.users;

    let imgPreview;
    if (this.state.file) {
      imgPreview = <img src={this.state.file} alt='' style={{ size: "relative" }} />
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa icon-people"></i> Users
                
                <Col className="float-right" md="4">
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <Button type="button" color="primary"><i className="fa fa-search"></i> Search</Button>
                    </InputGroupAddon>
                    <Input type="text" id="input1-group2" onChange={this.search} name="input1-group2" placeholder="Username" />
                  </InputGroup>
                </Col>
                <Col className="float-right" md="1">
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <Link to="/adduser"><Button type="button" color="primary"><i className="icon-plus"></i> ADD</Button></Link>
                    </InputGroupAddon>
                  </InputGroup>
                </Col>
              </CardHeader>
              <Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-primary">
                <ModalHeader toggle={this.toggle}>Update User </ModalHeader>
                <ModalBody>
                  <Form onSubmit={this.upload} action="" method="post" encType="multipart/form-data">
                    <Col style={{ textAlign: "center" }}>
                      <img src={this.state.updateuser.imgurl} alt='' style={{ size: "relative", borderRadius: "50%", width:"50px" }} />
                    </Col>
                    <FormGroup>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" id="userid" name="userid" placeholder="Userid" value={this.state.updateuser.userid} onChange={this.onChange} autoComplete="name" />
                        </InputGroup>
                        <span className="red-text"><code>{/*errors.userid*/}</code></span>
                    </FormGroup>
                    <FormGroup>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" id="username" name="username" placeholder="Username" value={this.state.updateuser.name} onChange={this.onChangeName} autoComplete="name" />
                        </InputGroup>
                        <span className="red-text"><code>{/*errors.name*/}</code></span>
                    </FormGroup>
                    <FormGroup>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText><i className="fa fa-envelope"></i></InputGroupText>
                            </InputGroupAddon>
                            <Input type="email" id="email1" name="email1" placeholder="Email" value={this.state.updateuser.email} onChange={this.onChangeEmail} autoComplete="username" />
                        </InputGroup>
                        <span className="red-text"><code>{/*errors.email*/}</code></span>
                    </FormGroup>
                    {/* <FormGroup>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText><i className="fa fa-asterisk"></i></InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" id="oldpassword" name="oldpassword" placeholder="Old Password" onChange = { this.onChangeOldPassword} autoComplete="current-password" />
                      </InputGroup>
                      <span className="red-text"><code>{errors.oldpassword}</code></span>
                    </FormGroup> */}
                    <FormGroup>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText><i className="fa fa-asterisk"></i></InputGroupText>
                            </InputGroupAddon>
                            <Input type="password" id="newpassword" name="newpassword" placeholder="new Password" onChange={this.onChangePassword} autoComplete="current-password" />
                        </InputGroup>
                        <span className="red-text"><code>{/*errors.password*/}</code></span>
                    </FormGroup>
                    <FormGroup>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText><i className="fa fa-asterisk"></i></InputGroupText>
                            </InputGroupAddon>
                            <Input type="password" id="repassword" name="repassword" placeholder="confirm pasword" onChange={this.onChangeConfirmPassword} autoComplete="current-password" />
                        </InputGroup>
                        <span className="red-text"><code>{/*errors.confirmpassword*/}</code></span>
                    </FormGroup>
                    <FormGroup row>
                        <Col md="3">
                            <Label>Role</Label>
                        </Col>
                        <Col md="9">
                            <FormGroup check inline>
                                <Input className="form-check-input" type="radio" id="inline-radio1" name="inline-radios" value="option1"  onChange={this.onChangeRole} />
                                <Label className="form-check-label" check htmlFor="inline-radio1">Active</Label>
                            </FormGroup>
                            <FormGroup check inline>
                                <Input className="form-check-input" type="radio" id="inline-radio2" name="inline-radios" value="option2" defaultChecked onChange={this.onChangeRole}/>
                                <Label className="form-check-label" check htmlFor="inline-radio2">Inactive</Label>
                            </FormGroup>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col md="3">
                            <Label htmlFor="file-input">File input</Label>
                        </Col>
                        <Col md="3">
                            {imgPreview}
                            <Input type="file" id="file-input" name="imgCollection" onChange={this.onFileChange} multiple />
                        </Col>
                        <Col md="6">
                            <div className="form-group preview" style={{ width: "170px", height: "70px" }}>

                            </div>
                        </Col>

                    </FormGroup>
                </Form>
                </ModalBody>
                <ModalFooter>
                  <Button type="submit" color="primary" onClick={this.updateUser}>Done</Button>
                  <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
              </Modal>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                    <th scope="col">no</th>
                      <th scope="col">photo</th>
                      <th scope="col">name</th>
                      <th scope="col">UserID</th>
                      <th scope="col">Email</th>
                      <th scope="col">registerd</th>
                      <th scope="col">admin</th>
                      <th scope="col"  style={{textAlign:"center"}}>active</th>
                      <th scope="col" style={{textAlign:"center"}}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) =>

                      <UserTableRow key={index} user={user} no={index} onClick={this.delete} status={this.change} editUserModal={this.editUserModal}/>
                    )}
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

export default Users;
