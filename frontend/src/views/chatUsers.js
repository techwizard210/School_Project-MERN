import React, { Component } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Progress,
  Row,
  Table,
} from 'reactstrap';

import axios from 'axios';


class ChartUsers extends Component {

    constructor(){
        super()
        this.state={
          users:[],
        }
      }
    componentDidMount(){
      var id = localStorage.getItem("id");
        axios.get('api/users/users')
          .then(res => {
            this.setState({
              users: res.data
            });
            const data = this.state.users;
            this.setState({
              users: data.filter(user => user._id !== id),
            });
          })
          .catch((error) => {
            console.log(error);
          })
      }

  render() {
    const users = this.state.users;

    return (
        <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
            <tbody>
            {users.map((user, index) =>
                <tr onClick={() => {this.props.setUser(user.userid);this.props.setUserId(user._id)}}>
                <td className="text-center">
                    <div className="avatar">
                    <img src={user.imgurl} className="img-avatar" alt="admin@bootstrapmaster.com" />
                    <span className="avatar-status badge-success"></span>
                    </div>
                </td>
                <td>
                    <div>{user.userid}</div>
                    <div className="small text-muted">
                    <span>New</span> | Registered: Jan 1, 2015
                    </div>
                </td>
                </tr>
            )}

            </tbody>
        </Table>
    );
  }
}

export default ChartUsers;
