import React from "react";
import ReactDOM from "react-dom";
import Form from 'react-bootstrap/Form';
import Radar from 'radar-sdk-js';
import Button from 'react-bootstrap/Button';
var Cassandra = require('./useAPI.js');

class ReadMessage extends React.Component{
  constructor (props) {
    super(props);
    this.state = {Messages:[]};
  }
  getData(){
    Radar.initialize("prj_test_pk_d65e98b983fe32401d19717c4c222098ee35251a ");
    Radar.searchGeofences({
      radius: 1000,
      tags: ['userAddress','college'],
      limit: 10
    }, function(err, result) {
      if (!err) {
        if (result.geofences.length>0){
          //what the fuck why am I getting goddamn security errors what the fuck
          //console.log(Cassandra.getRequest(result.geofences[0]["externalId"]));
          this.requestData('neighborHouse')
        }else {
          return ["Nothing to display"]
        }
      }
    });
  }
  requestData(placeName) {
    // Simple GET request using fetch
    fetch('cassandra-api-dot-bottlemessage-299107.uc.r.appspot.com/api/query/'+placeName)
        .then(response => response.json())
        .then(data => this.setState({ Messages: data.total }));
      }
  render(){
    this.getData();
    return(
      <p>{this.state.Messages}</p>
    )
  }
}


  export default ReadMessage;
