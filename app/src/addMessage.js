import React from "react";
import ReactDOM from "react-dom";
import Form from 'react-bootstrap/Form';
import Radar from 'radar-sdk-js';
import Button from 'react-bootstrap/Button';
var Cassandra = require('./useAPI.js');


class MessageAdd extends React.Component{
  constructor (props) {
    super(props);
  }

  handleSubmit(event){
    event.preventDefault();
    const formData = new FormData(event.target),
    formDataObj = Object.fromEntries(formData.entries())
    //console.log("egg aaa fuck oh jeezx oh shit")
    console.log(formDataObj)
    //find nearest geofence to the user and then they can access messages from that person.
    Radar.initialize("prj_test_pk_d65e98b983fe32401d19717c4c222098ee35251a ");
    Radar.searchGeofences({
      radius: 1000,
      //we only have 2 types of places rn lol.
      tags: ['userAddress', 'college'],
      limit: 1
    }, function(err, result) {
      if (!err) {
        //placeName = result[0]["externalId"]
      }
    });
    //console.log(formDataObj["message"], formDataObj[])
  }

  render(){

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Enter your message here.</Form.Label>
          <Form.Control type="message" placeholder="write message" name="messageText"/>
          <Form.Text className="text-muted">
            What do you want to say to the world?
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>How do you want to style it?</Form.Label>
          <Form.Control as="select" name="messageType">
            <option>Stars</option>
            <option>Hearts</option>
            <option>Question Marks</option>
            <option>Exclamation Points</option>
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    )
  }
}
export default MessageAdd;
