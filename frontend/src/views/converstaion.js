import React, { useState, useEffect } from 'react';
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
import socketIOClient from 'socket.io-client';



const Conversation = props => {

    const [conversations, setConversations] = useState([]);
    const [newConversation, setNewConversation] = useState(null);

    // Returns the recipient name that does not
    // belong to the current user.
    const handleRecipient = recipients => {
        for (let i = 0; i < recipients.length; i++) {
            if (
                recipients[i]._id !==
                localStorage.getItem("id")
            ) {
                return recipients[i];
            }
        }
        return null;
    };

    useEffect(() => {
        var id = localStorage.getItem("id");
        axios.get('api/users/conversations/' + id)
        .then(res =>setConversations(res.data))
    }, [newConversation]);

    useEffect(() => {
        let socket = socketIOClient(process.env.REACT_APP_API_URL);
        socket.on('messages', data => setNewConversation(data));

        return () => {
            socket.removeListener('messages');
        };
    }, []);

    return (
        <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
            <tbody>
                <tr onClick={() => {props.setUser('Global Chat');props.setUserId('5f3bcfb9cd7e0b5188768e40')}}>
                    <td className="text-center">
                        <div className="avatar">
                        <img src={'assets/img/avatars/global.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                        <span className="avatar-status badge-success"></span>
                        </div>
                    </td>
                    <td>
                        <div>Global Chat</div>
                    </td>
                </tr>
                {conversations && (
                    <>
                    {conversations.map(c => (
                    <tr onClick={() => {props.setUser(handleRecipient(c.recipientObj).userid);props.setUserId(handleRecipient(c.recipientObj)._id)}}>
                        <td className="text-center">
                        <div className="avatar">
                            <img src={handleRecipient(c.recipientObj).imgurl} className="img-avatar" alt="admin@bootstrapmaster.com" />
                            <span className="avatar-status badge-success"></span>
                        </div>
                        </td>
                        <td>
                        <div>{handleRecipient(c.recipientObj).userid}</div>
                        <div className="small text-muted">
                            <span>{c.lastMessage}</span> | {new Date(parseInt(c.date)).toLocaleDateString("en-US")}
                        </div>
                        </td>
                    </tr>
                    ))}
                    </>
                )}
            </tbody>
        </Table>
    );
}

export default Conversation;
