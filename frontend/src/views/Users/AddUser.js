import React, { Component } from 'react';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Label
} from 'reactstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

class UpdateUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            file: null,
            imgCollection: null,
            user: {"role":"inactive"},
            errors: {}
        }
        // var user = this.state.user;
        //     user.role = "inactive";
        //     this.setState({
        //         user: user
        //     })
        this.uploadSingleFile = this.uploadSingleFile.bind(this);
        this.upload = this.upload.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeOldPassword = this.onChangeOldPassword.bind(this);
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
        this.onChangeRole = this.onChangeRole.bind(this)
    }

    onChangeRole(e) {
        console.log(e.target.value)
        if(e.target.value === 'option1'){
            var data = this.state.user;
            data.role = "active";
            this.setState({
                user: data
            })
        } else {
            var data = this.state.user;
            data.role = "inactive";
            this.setState({
                user: data
            })
        }
    }

    onChange(e) {
        var data = this.state.user;
        data.userid = e.target.value;
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
        console.log(data)
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

    }

    uploadSingleFile(e) {
        this.setState({
            file: URL.createObjectURL(e.target.files[0])
        })
    }

    onFileChange(e) {
        this.setState({ imgCollection: e.target.files });
        this.setState({
            file: URL.createObjectURL(e.target.files[0])
        })
    }

    upload(e) {
        const id = localStorage.getItem("id");
        e.preventDefault()
        var formData = new FormData();
        for (const key of Object.keys(this.state.imgCollection)) {
            console.log(this.state.imgCollection[key])
            formData.append('imgCollection', this.state.imgCollection[key]);
            console.log(formData.getAll('imgCollection'))
        }
        formData.append('userid', this.state.user.userid);
        formData.append('name', this.state.user.name);
        formData.append('email', this.state.user.email);
        formData.append('password', this.state.user.password);
        formData.append('confirmpassword', this.state.user.confirmpassword);
        formData.append('role',this.state.user.role);

        console.log(formData)
        axios.post("/api/users/upload-images/", formData, {
        }).then(res => {
            window.location.href = "/users";

        }).catch((error) => {
            alert(error.response.data.email)
        })

    }

    componentDidMount() {
        // const id = localStorage.getItem("id");
        // axios.get('/api/users/' + id)
        //   .then(res=>{
        //     this.setState ({
        //       user: res.data
        //     })
        //   })
    }


    render() {
        const errors = this.state.errors
        let imgPreview;
        if (this.state.file) {
            imgPreview = <img src={this.state.file} alt='' style={{ size: "relative", width:"100px", height:"100px" }} />
        }
        return (



            <Col xs="8">
                <Card>
                    <CardHeader>
                        <i className="icon-note icons font-2xl d-block mt-4">AddUser Form</i>
                    </CardHeader>
                    <CardBody>
                        <Form onSubmit={this.upload} action="" method="post" encType="multipart/form-data">
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
                </FormGroup> */}
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText><i className="fa fa-asterisk"></i></InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="password" id="newpassword" name="newpassword" placeholder="new Password" onChange={this.onChangePassword} autoComplete="current-password" />
                                </InputGroup>
                                <span className="red-text"><code>{errors.password}</code></span>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText><i className="fa fa-asterisk"></i></InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="password" id="repassword" name="repassword" placeholder="confirm pasword" onChange={this.onChangeConfirmPassword} autoComplete="current-password" />
                                </InputGroup>
                                <span className="red-text"><code>{errors.confirmpassword}</code></span>
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
                            <FormGroup className="form-actions">
                                <Button type="submit" size="sm" color="success">ADDUSER</Button>
                                <Link to="/users"><Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Cancel</Button></Link>
                            </FormGroup>
                        </Form>
                    </CardBody>
                </Card>
            </Col>


        )
    }

}

export default UpdateUser;
