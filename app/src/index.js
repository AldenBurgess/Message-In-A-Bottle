import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './Site.scss';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import Jumbotron from 'react-bootstrap/Jumbotron';
import MessageAdd from './addMessage.js';
import reportWebVitals from './reportWebVitals';
import 'aframe';

class HomeText extends React.Component{
  constructor (){
    super();
  }
  render(){
    return (
      <div>
      <style>{`
          a-scene {
            height: 300px;
            width: 600px;
          }
        `}</style>
        <h3>Home</h3>
        <a-scene embedded>
          <a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9"></a-box>
          <a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E"></a-sphere>
          <a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#FFC65D"></a-cylinder>
          <a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>
          <a-sky color="#ECECEC"></a-sky>
        </a-scene>
      </div>
    )
  }
}

class FormText extends React.Component{
  constructor (){
    super();
  }
  render(){
    return (
      <div>
        <h3>Input your note</h3>
        <MessageAdd />
      </div>
    )
  }
}


class AboutText extends React.Component{
  constructor (){
    super();
  }
  render(){
    return (
      <div>
        <h1>About</h1>
        <p>Notes in Space is an interactive web experience wherein users can find and leave notes in VR/AR for people in their
        vicinity. Development is ongoing for HackUmass 2020. The frontend was built in React, Bootstrap and <a href="https://aframe.io/">a-frame.io</a>. User location was obtained using <a href="https://radar.io">radar.io</a>.
        The backend was built in Node.js and hosted as a separate API deployed to Google Cloud App Engine which queried our Datastax Cassandra database.
        </p>
      </div>
    )
  }
}

class Tabs extends React.Component {
  constructor () {
    super();
  }
  render() {
    return (
    <div id="encloses">
      <Tab.Container id="pagecontent" defaultActiveKey="home">
        <Row style={{marginLeft:"1px", marginRight:"1px"}}>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="home">Home</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="about">About</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="form">Form</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="home">
                <HomeText />
              </Tab.Pane>
              <Tab.Pane eventKey="about">
                <AboutText />
              </Tab.Pane>
              <Tab.Pane eventKey="form">
                <FormText />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  )
  }
}

class Header extends React.Component {
  constructor() {
    super();
  }
  render () {
    return (
      <div>
        <Jumbotron fluid style={{backgroundColor:"#326128", paddingTop:"25px", paddingBottom:"25px", color:"#fffffc"}}>
          <Container>
            <h1>Notes in Space</h1>
          </Container>
        </Jumbotron>
      </div>
    )
  }
}

class Page extends React.Component {
  constructor () {
    super();
  }
  render () {
    return (<div style={{backgroundColor:"#fffffc"}}>
        <Header />
        <Tabs />
      </div>
    )
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Page />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
