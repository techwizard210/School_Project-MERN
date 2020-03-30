import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Table, InputGroup, InputGroupAddon,Input, Button } from 'reactstrap';
import axios from 'axios';
import UserTableRow from './UserTableRow';


class Users extends Component {

  constructor(){
    super()
    this.state={
      users:[],
      obb:[]
    }

    //this.delete = this.delete.bind(this);
    //this.change = this.change.bind(this);
    this.search = this.search.bind(this);
  }

  search(e){
    const searchName = e.target.value;   
    console.log(searchName) 
    if (searchName === ''){
      axios.get('api/users/')
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
    axios.get('api/users/')
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

                      <UserTableRow key={index} user={user} no={index} onClick={this.delete} status={this.change}/>
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
