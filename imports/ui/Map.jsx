import React, {Component} from "react";
import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import {Tweets} from "../api/Tweets.js";
import { Meteor } from "meteor/meteor";
export default class Map extends TrackerReact( Component) {


	constructor(props) {
		super(props);
		var d=new Date();
		this.state={ctx:null,lasDate:d,canvasData:null};

		
	}

	componentWillReceiveProps(nextProps)
	{
		this.drawDot(nextProps)
		
	}

	drawDot(tweets)
	{
		
		for(count = 0; count < tweets.length; count++)
		{
			console.log(this.props.geProje()(tweets[0].coordinates.coordinates))
			console.log(count);
			
		}

	}

	drawPixel (x, y, r, g, b, a) 
	{
		var index = (x + y * 600) * 4;
		var canvasData=this.state.canvasData;
		canvasData.data[index + 0] = r;
		canvasData.data[index + 1] = g;
		canvasData.data[index + 2] = b;
		canvasData.data[index + 3] = a;

	}



	componentDidMount()
	{
		var canvas = document.getElementById("myCanvas");
		var canvasWidth = canvas.width;
		var canvasHeight = canvas.height;
		var ctx = canvas.getContext("2d");
		this.setState({ctx:ctx});
		var canvasData = ctx.getImageData(0, 0, 600, 600);
		this.setState({canvasData:canvasData});
		
	}


	render() {
		return (
			<div className="canvasTweets">
			<canvas id="myCanvas" width="600" height="600"></canvas>
			
			</div>);
	}
}


