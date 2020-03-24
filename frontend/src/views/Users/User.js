import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Badge } from 'reactstrap';
import axios from "axios";
// import usersData from './UsersData'

class User extends Component {

  constructor(props) {
    super(props)
    this.state = {
      user: {}
    }
  }

  componentDidMount() {
    console.log(this.props.match.params.id)
    axios.get('/api/users/' + this.props.match.params.id)
      .then(res=>{
        this.setState ({
          user: res.data
        })
      })

  }

  render() {

    // const user = usersData.find( user => user.id.toString() === this.props.match.params.id)
    const user = this.state.user;

    // const userDetails = user ? Object.entries(user) : [['id', (<span><i className="text-muted icon-ban"></i> Not found</span>)]]
    const getBadge = (status) => {
      return status === 'active' ? 'success' :
        status === 'inactive' ? 'secondary' :
              'primary'
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={6}>
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i>User id: {user.userid}</strong>
              </CardHeader>
              <CardBody>
                  <Table responsive hover>
                    <tbody>
                      {
                        // userDetails.map(([key, value]) => {
                        //   return (
                        //     <tr key={key}>
                        //       <td>{`${key}:`}</td>
                        //       <td><strong>{value}</strong></td>
                        //     </tr>
                        //   )
                        // })
                      }
                      <tr>
                        <td>photo</td>
                        <td><img src={user.imgurl}/></td>
                      </tr>
                      <tr>
                        <td>UserID</td>
                        <td>{user.userid}</td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>{user.email}</td>
                      </tr>
                      <tr>
                        <td>registered</td>
                        <td>{user.date}</td>
                      </tr>
                      <tr>
                        <td>role</td>
                        <td><Badge color={getBadge(user.role)} pill>{user.role}</Badge></td>
                      </tr>
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
