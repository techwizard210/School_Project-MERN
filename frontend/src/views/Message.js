import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, ListGroup, ListGroupItem, Row, TabContent, TabPane, Button, Collapse } from 'reactstrap';
import axios from 'axios';
class Message extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleAccordion = this.toggleAccordion.bind(this);
    this.state = {
      activeTab: 0,
      collapse: false,
      accordion: [],
      messages: []
    };

    axios.get('/api/users/messages')
    .then(res => {

      const data = res.data;

      var preAccordion=[];
      data.map((item, index) => 
         preAccordion[index] = false,
         )

         
       this.setState({
         accordion: preAccordion
       })

      this.setState({
        messages: res.data,
      });
    })
    .catch((error) => {
      console.log(error);
    })



  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  toggleAccordion(tab) {

    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => tab === index ? !x : false);

    this.setState({
      accordion: state,
    });

  }


  render() {

    const data = this.state.messages;

    return (
      <div className="animated fadeIn">

        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-envelope-o"></i><strong>My Messages</strong>
                <div className="card-header-actions">
                  <Badge>NEW</Badge>
                </div>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="4">
                    <ListGroup id="list-tab" role="tablist">
                      <ListGroupItem onClick={() => this.toggle(0)} action active={this.state.activeTab === 0} >Inbox</ListGroupItem>
                      <ListGroupItem onClick={() => this.toggle(1)} action active={this.state.activeTab === 1} >Sent</ListGroupItem>
                      <ListGroupItem onClick={() => this.toggle(2)} action active={this.state.activeTab === 2} >Draft</ListGroupItem>
                      <ListGroupItem onClick={() => this.toggle(3)} action active={this.state.activeTab === 3} >Trash</ListGroupItem>
                    </ListGroup>
                  </Col>
                  <Col xs="8">
                    <TabContent activeTab={this.state.activeTab}>
                      <TabPane tabId={0} >
                        <div id="accordion">
                        {data.map((item, index) =>
                          {if(item.type == "inbox"){
                            return(
                            <Card className="mb-0" key = {index}>
                              <CardHeader id="headingOne">
                                <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(index)} aria-expanded={this.state.accordion[index]} aria-controls="collapseOne">
                                  <h5 className="m-0 p-0">{item.title}</h5>
                                </Button>
                              </CardHeader>
                              <Collapse isOpen={this.state.accordion[index]} data-parent="#accordion" id="collapseOne" aria-labelledby="headingOne">
                                <CardBody>
                                  {item.content}  
                                </CardBody>
                              </Collapse>
                            </Card>
                            )
                          }}
                          )}
                                                  
                        </div>
                      </TabPane>
                      <TabPane tabId={1}>
                      <div id="accordion1">
                      {data.map((item, index) =>
                          {if(item.type == "sent"){
                            return(
                            <Card className="mb-0" key = {index}>
                              <CardHeader id="headingOne1">
                                <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(index)} aria-expanded={this.state.accordion[index]} aria-controls="collapseOne1">
                                  <h5 className="m-0 p-0">{item.title}</h5>
                                </Button>
                              </CardHeader>
                              <Collapse isOpen={this.state.accordion[index]} data-parent="#accordion1" id="collapseOne1" aria-labelledby="headingOne1">
                                <CardBody>
                                  {item.content}  
                                </CardBody>
                              </Collapse>
                            </Card>
                            )
                          }}
                          )}
                        </div>
                      </TabPane>
                      <TabPane tabId={2}>
                      <div id="accordion">
                      {data.map((item, index) =>
                          {if(item.type == "draft"){
                            return(
                            <Card className="mb-0" key = {index}>
                              <CardHeader id="headingOne">
                                <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(index)} aria-expanded={this.state.accordion[0]} aria-controls="collapseOne">
                                  <h5 className="m-0 p-0">{item.title}</h5>
                                </Button>
                              </CardHeader>
                              <Collapse isOpen={this.state.accordion[index]} data-parent="#accordion" id="collapseOne" aria-labelledby="headingOne">
                                <CardBody>
                                  {item.content}  
                                </CardBody>
                              </Collapse>
                            </Card>
                            )
                          }}
                          )}
                        </div>
                      </TabPane>
                      <TabPane tabId={3}>
                      <div id="accordion">
                      {data.map((item, index) =>
                          {if(item.type == "trash"){
                            return(
                            <Card className="mb-0" key = {index}>
                              <CardHeader id="headingOne">
                                <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(index)} aria-expanded={this.state.accordion[0]} aria-controls="collapseOne">
                                  <h5 className="m-0 p-0">{item.title}</h5>
                                </Button>
                              </CardHeader>
                              <Collapse isOpen={this.state.accordion[index]} data-parent="#accordion" id="collapseOne" aria-labelledby="headingOne">
                                <CardBody>
                                  {item.content}  
                                </CardBody>
                              </Collapse>
                            </Card>
                            )
                          }}
                          )}
                        </div>
                      </TabPane>
                    </TabContent>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Message;
