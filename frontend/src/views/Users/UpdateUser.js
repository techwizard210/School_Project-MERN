import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Col,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
} from 'reactstrap';
import axios from 'axios';

class UpdateUser extends Component {

  constructor(props) {
    super(props)
    this.state = {
      file: null,
      imgCollection: null,
      user: {},
      errors: {}
    }
    // this.uploadSingleFile = this.uploadSingleFile.bind(this);
    this.upload = this.upload.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeOldPassword = this.onChangeOldPassword.bind(this);
    this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
  }

  onChange(e) {
    var data = this.state.user;
    data.userid = e.target.value;
    //user = data;
    this.setState({
      user: data
    })
  }

  onChangeName(e) {
    var data = this.state.user;
    data.name = e.target.value;
    this.setState({
      user: data
    })
  }

  onChangeEmail(e) {
    var data = this.state.user;
    data.email = e.target.value;
    this.setState({
      user: data
    })
  }

  onChangeOldPassword(e) {
    var data = this.state.user;
    data.oldpassword = e.target.value;
    this.setState({
      user: data
    })
  }

  onChangePassword(e) {
    var data = this.state.user;
    data.password = e.target.value;
    this.setState({
      user: data
    })
  }

  onChangeConfirmPassword(e) {
    var data = this.state.user;
    data.confirmpassword = e.target.value;
    this.setState({
      user: data
    })
    //console.log(this.state.user)
  }

  // uploadSingleFile(e) {

  //   this.setState({
  //     file: URL.createObjectURL(e.target.files[0])
  //   })
  // }

  onFileChange(e) {
    //console.log("image")
    this.setState({ imgCollection: e.target.files });
    const data = this.state.user;
    data.imgurl = URL.createObjectURL(e.target.files[0]);
    this.setState({
      user: data
    })
    // this.setState({
    //   file: URL.createObjectURL(e.target.files[0])
    // })
  }

  upload(e) {
    const id = this.props.match.params.id;
    e.preventDefault()
    var formData = new FormData();
    if (this.state.imgCollection){
      for (const key of Object.keys(this.state.imgCollection)) {
        console.log(this.state.imgCollection[key])
        formData.append('imgCollection', this.state.imgCollection[key]);
        console.log(formData.getAll('imgCollection'))     
      } 
    }

    formData.append('userid', this.state.user.userid);
    formData.append('name', this.state.user.name);
    formData.append('email', this.state.user.email);

    axios.post("/api/users/updateuser/" + id, formData, {
    }).then(res => {
      //console.log(res.data)
      window.location.href = "/";

    }).catch((error) => {
      console.log(error.response.data);
      alert('Please choose a file');
    })

  }

  componentDidMount() {
    const id = this.props.match.params.id;
    axios.get('/api/users/user/' + id)
      .then(res => {
        this.setState({
          user: res.data
        })
      })
  }


  render() {
    const errors = this.state.errors
    return (

      <Col xs="8">
        <Card>
          <CardHeader>
            <i className="icon-note icons font-2xl d-block mt-4">UpdateUser Form</i>
          </CardHeader>
          <Form onSubmit={this.upload} action="" method="post" encType="multipart/form-data">
            <CardBody>

              <FormGroup>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                  </InputGroupAddon>
                  <Input type="text" id="userid" name="userid" placeholder="Userid" value={this.state.user.userid} onChange={this.onChange} autoComplete="name" />
                </InputGroup>
                <span className="red-text"><code>{errors.userid}</code></span>
              </FormGroup>
              <FormGroup>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                  </InputGroupAddon>
                  <Input type="text" id="username" name="username" placeholder="Username" value={this.state.user.name} onChange={this.onChangeName} autoComplete="name" />
                </InputGroup>
                <span className="red-text"><code>{errors.name}</code></span>
              </FormGroup>
              <FormGroup>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText><i className="fa fa-envelope"></i></InputGroupText>
                  </InputGroupAddon>
                  <Input type="email" id="email1" name="email1" placeholder="Email" value={this.state.user.email} onChange={this.onChangeEmail} autoComplete="username" />
                </InputGroup>
                <span className="red-text"><code>{errors.email}</code></span>
              </FormGroup>
              {/* <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText><i className="fa fa-asterisk"></i></InputGroupText>
                    </InputGroupAddon>
                    <Input type="password" id="oldpassword" name="oldpassword" placeholder="Old Password" onChange = { this.onChangeOldPassword} autoComplete="current-password" />
                  </InputGroup>
                  <span className="red-text"><code>{errors.oldpassword}</code></span>
                </FormGroup>
                <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText><i className="fa fa-asterisk"></i></InputGroupText>
                    </InputGroupAddon>
                    <Input type="password" id="newpassword" name="newpassword" placeholder="new Password" onChange = {this.onChangePassword} autoComplete="current-password" />
                  </InputGroup>
                  <span className="red-text"><code>{errors.password}</code></span>
                </FormGroup>
                <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText><i className="fa fa-asterisk"></i></InputGroupText>
                    </InputGroupAddon>
                    <Input type="password" id="repassword" name="repassword" placeholder="confirm pasword" onChange = {this.onChangeConfirmPassword} autoComplete="current-password" />
                  </InputGroup>
                  <span className="red-text"><code>{errors.confirmpassword}</code></span>
                </FormGroup> */}
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="file-input">File input</Label>
                </Col>
                <Col md="3">
                  <img src={this.state.user.imgurl} alt='' style={{ size: "relative" }} style={{height:"100px", width:"100px"}} />
                  {/* {imgPreview} */}
                  <Input type="file" id="file-input" name="imgCollection" onChange={this.onFileChange} multiple />
                </Col>
                <Col md="6">
                  <div className="form-group preview" style={{ width: "170px", height: "70px" }}>

                  </div>
                </Col>

              </FormGroup>
              {/* <FormGroup className="form-actions">
                  <Button type="submit" size="sm" color="success">update</Button>
                </FormGroup> */}


            </CardBody>
            <CardFooter>
              <Button type="submit" size="sm" color="success"><i className="fa fa-dot-circle-o"></i> UpdateUser</Button>
              <Link to="/dashboard"><Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Cancel</Button></Link>
            </CardFooter>
          </Form>
        </Card>
      </Col>


    )
  }

}

export default UpdateUser;
