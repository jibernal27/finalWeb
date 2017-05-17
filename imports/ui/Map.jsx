import React, {Component} from "react";
import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import {Tweets} from "../api/Tweets.js";
import { Meteor } from "meteor/meteor";
export default class Map extends TrackerReact( Component) {


	constructor(props) {
		super(props);
		this.state={last:0};

		
	}

	componentWillReceiveProps(nextProps)
	{
		this.drawDot(nextProps.tweets)
		
	}

	drawDot(tweets)
	{
		var canvas = document.getElementById("myCanvas");
		var canvasWidth = canvas.width;
		var canvasHeight = canvas.height;
		var ctx = canvas.getContext("2d");
		var canvasData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
		console.log('porque no haces loop');
		console.log(tweets.length);
		for(var i = this.state.last; i < tweets.length; i++)
		{
			x=this.props.geProje()(tweets[i].coordinates.coordinates);
			// var index = (x[0] + x[1] * 600) * 4;
			// canvasData.data[index + 0] = 255;
			// canvasData.data[index + 1] = 0;
			// canvasData.data[index + 2] = 0;
			// canvasData.data[index + 3] = 0.3;
			ctx.fillStyle="#FF0000";
			ctx.fillRect(x[0],x[1],3,3);
		}

		this.setState({last:i})
		

	}




	componentDidMount()
	{
		
	}


	render() {
		return (
			<div className="canvasTweets">
			<canvas id="myCanvas" width="600" height="600"></canvas>
			
			</div>);
	}
}


