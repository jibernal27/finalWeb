import React, {Component} from "react";
import {PropTypes} from "prop-types";
import { Meteor } from "meteor/meteor";
import { createContainer} from "meteor/react-meteor-data"

import TweetsResults from "./TweetsResults.jsx";
import {Tweets} from "../api/Tweets.js";
import ColombiaMap from "./ColombiaMap.jsx";
import Map from "./Map.jsx"

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projection:null
    }   
    Meteor.call("twitter.stream", '');
  }

  changeQuery(evt) {
    if (evt.key !== "Enter") {
      return;
    }
    // "this" will change in the method call, so I need to save it
    let component = this;

    console.log(evt.target.value);
    Meteor.call("twitter.stream", evt.target.value);

  }

  setProj(proj)
  {
    console.log("proyeccion")
    console.log(proj)
    this.setState({
      projection: proj
    })
  }

    getProj()
  {
    return this.state.projection;
  }

  render() {
    return (
      <div>
      <h2>Map:</h2>
      <ColombiaMap
      width="600"
      height="600"
      setProje={this.setProj.bind(this)} 
      ></ColombiaMap>     
      
      <Map  tweets= {this.props.tweets}
      geProje={this.getProj.bind(this)}
      />
      <h2>  Results:</h2>
      {this.props && this.props.tweets ?
        <TweetsResults tweets={this.props.tweets}/> :
        <p>Enter a query</p>
      }

      </div>
      );
  }
}

App.propTypes = {
  tweets : PropTypes.array.isRequired
};

export default AppContainer = createContainer(() => {
  Meteor.subscribe("tweets");


  return {
    tweets: Tweets.find({}).fetch()
  };
}, App);