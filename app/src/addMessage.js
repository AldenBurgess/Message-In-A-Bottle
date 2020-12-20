import React from "react";
import ReactDOM from "react-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';



class MessageAdd extends React.Component{
  constructor (props) {
    super(props);
  }

  handleSubmit(event){
    event.preventDefault();
    console.log("submission.");
    console.log("do a post request here.")
  }

  render(){
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Enter your message here.</Form.Label>
          <Form.Control type="message" placeholder="write message" />
          <Form.Text className="text-muted">
            What do you want to say to the world?
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>How do you want to style it?</Form.Label>
          <Form.Control as="select">
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
