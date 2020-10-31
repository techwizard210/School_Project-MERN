import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import  {Button} from 'reactstrap';
//import { AppSwitch } from '@coreui/react'

export default class UserTableRow extends Component {

    constructor (props) {
        super(props);
        this.state = {
          role: "",
      };
        this.deleteUser = this.deleteUser.bind(this);
    }

    // change=e=>{
    //     const status =  e.target.value = "active" ? "inactive": "active";

    // };

    deleteUser() {
        axios.delete('/api/users/delete-user/' + this.props.user._id)
            .then((res) => {
                console.log('User sucessfully deleted!')
            }).catch((error) => {
                console.log(error)
            })
    }

    render(){

      const userLink = `/users/${this.props.user._id}`
      const role = this.props.user.role;
      const getBadge = (status) => {
        return status === 'active' ? '#4dbd74' : '#c8ced3'

      }
      const getColor = (status) => {
        return status === 'active' ? 'success' :
          status === 'inactive' ? 'secondary' :
                'primary'
      }

      const status = (st) => {
        return st === 'active' ? 'inactive': 'active'
      }

        return (
            <tr>
                <td className="align-middle">{this.props.no+1}</td>
                <td className="align-middle"><Link to={userLink}><img style={{height:"50px", width:"50px"}} className="img-avatar" src={this.props.user.imgurl}/></Link></td>
                <td className="align-middle"><Link to={userLink}>{this.props.user.name}</Link></td>
                <td className="align-middle">{this.props.user.userid}</td>
                <td className="align-middle">{this.props.user.email}</td>
                <td className="align-middle">{this.props.user.date}</td>
                <td className="align-middle">{this.props.user.admin}</td>
                <td className="align-middle" style={{textAlign:"center",color:getBadge(role)}}>{role}</td>
                <td className="align-middle" style={{textAlign:"center"}}>
                    <Button onClick={()=>this.props.status(this.props.user._id)} color={getColor(role)} id = "status" className="btn-pill" >{status(role)}</Button>
                    <Button onClick={()=>this.props.onClick(this.props.user._id)} color="danger" className="btn-pill" >Delete</Button>
                    <Button onClick={()=>this.props.editUserModal(this.props.user._id)} color="primary" className="btn-pill" >Edit</Button>
                    {/* <AppSwitch className={'mx-1'} variant={'pill'} color={'success'} outline={'alt'} checked label dataOn={'\u2713'} dataOff={'\u2715'} /> */}
                </td>
            </tr>
        )
    }
}
