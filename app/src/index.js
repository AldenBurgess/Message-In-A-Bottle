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
import 'aframe-text-geometry-component';

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
        <a-assets>
            <a-asset-item
              id="heartModel"
              src="https://cdn.glitch.com/9df1a04f-7acf-4b5c-b996-5417587c3844%2Fheart.obj?v=1608431131171"
            ></a-asset-item>
            <a-asset-item
              id="pointModel"
              src="https://cdn.glitch.com/9df1a04f-7acf-4b5c-b996-5417587c3844%2Fexclamation-point.obj?v=1608431137574"
            ></a-asset-item>
            <a-asset-item
              id="markModel"
              src="https://cdn.glitch.com/9df1a04f-7acf-4b5c-b996-5417587c3844%2Fquestion-mark.obj?v=1608431115714"
            ></a-asset-item>
            <a-asset-item
              id="starModel"
              src="https://cdn.glitch.com/9df1a04f-7acf-4b5c-b996-5417587c3844%2Fstar.obj?v=1608431110249"
            ></a-asset-item>
            <a-asset-item 
              id="optimerBoldFont" 
              src="https://rawgit.com/mrdoob/three.js/dev/examples/fonts/optimer_bold.typeface.json"
            ></a-asset-item>
            <img
              id="street"
              src="https://cdn.glitch.com/9df1a04f-7acf-4b5c-b996-5417587c3844%2F3648043829_6e7c932c90_o.jpg?v=1608439608237"
            />
          </a-assets>
          <a-entity id="message-text" text-geometry="value: ... ; font: #optimerBoldFont"></a-entity>
          <a-obj-model
            src="#pointModel"
            color="green"
            rotation="-90 0 0"
            position="-1 2.5 -10"
            scale=".2 .2 .2"
          ></a-obj-model>

          <a-sky src="#street"> </a-sky>
          <a-entity event-set__display="_event: click; visable: true"></a-entity>
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

// function MessageToAR(message){
//   textField = getElementById(message-field)
//   textField.setAttribute('value', message)
// }

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
