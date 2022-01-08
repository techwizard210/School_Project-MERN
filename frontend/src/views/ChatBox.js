import React, { useState, useEffect, useRef } from 'react';
import {
  Form,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Card,
  CardBody,
  CardHeader,
  Col,
  Progress,
  Row,
  Table,
} from 'reactstrap';
import './style.css';

import axios from 'axios';
import socketIOClient from 'socket.io-client';



const ChatBox = props => {

    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [lastMessage, setLastMessage] = useState(null);

    let chatBottom = useRef(null);

    useEffect(() => {
        reloadMessages();
    }, [lastMessage, props.user]);



    useEffect(() => {
        const socket = socketIOClient(process.env.REACT_APP_API_URL);
        socket.on('messages', data => setLastMessage(data));
    }, []);

    const reloadMessages = () => {
        if (props.user === 'Global Chat') {
            axios.get('api/users/global_messages')
            .then(res => {
                setMessages(res.data);console.log(messages);
            });
        } else if (props.scope !== null && props.conversationId !== null) {
            axios.get('api/users/private_conversations/query?to=' + props.user_id + '&from=' + localStorage.getItem("id"))
            .then(res => {
                setMessages(res.data);console.log(messages);
            });
        } else {
            setMessages([]);
        }
    };

    const handleSubmit = e => {
        
        e.preventDefault();
        if (newMessage != ""){
            if (props.user === 'Global Chat') {
                const message = {
                    message: newMessage,
                    to: props.user_id,
                    from: localStorage.getItem("id")
                };
                axios.post("/api/users/addGlobalMessage/", message, {
                }).then(res => {
                    setNewMessage('');
            
                }).catch((error) => {
                //alert('Please choose a file');
                })
            } else {
                const message = {
                    message: newMessage,
                    to: props.user_id,
                    from: localStorage.getItem("id")
                };
                axios.post("/api/users/addPrivateMessage/", message, {
                }).then(res => {
                    setNewMessage('');
            
                }).catch((error) => {
                //alert('Please choose a file');
                })
            }
        }
    };

    return (
        <Table hover responsive className="table-outline mb-0 d-none d-sm-table" style = {{height:'100%'}}>
            <thead className="thead-light">
                <tr><th colSpan="2" className="text-center" style = {{lineHeight:0.9}}>{props.user}</th></tr>
            </thead>
            <tbody>  
            {messages && ( 
                <>
                {messages.map((m,key) => (
                <tr>
                    <td className="text-center">
                        <div className="avatar">
                        <img src={m.fromObj[0].imgurl} className="img-avatar" alt="admin@bootstrapmaster.com" />
                        <span className="avatar-status badge-success"></span>
                        </div>
                    </td>
                    <td>
                        <div>{m.fromObj[0].userid}</div>
                        <div className="small text-muted">
                        <span>{m.body}</span> | {new Date(parseInt(m.date)).toLocaleDateString("en-US")}
                        </div>
                    </td>
                </tr>
                ))}
                </>
            )}
                <tr> 
                    <td colSpan="2">
                        <Form onSubmit={handleSubmit}>
                            <InputGroup className="mb-3">
                                <Input type="text" id="global_message" value={newMessage} onChange={e =>setNewMessage(e.target.value)} placeholder="Message" autoComplete="username" />
                                <InputGroupAddon addonType="append">
                                <InputGroupText style={{padding:"0"}}>
                                    <button type="submit" className="btn btn-primary btn-block"><i className="fa fa-send"></i></button>
                                </InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>
                        </Form>
                    </td>                   

                </tr>
         
            </tbody>
        </Table>
    );
}

export default ChatBox;
