import React, { Component } from "react";

class Timer extends Component {
  constructor() {
    super();
    this.timer = React.createRef();
    this.state = {
      time: 0,
      color: "#" + Math.floor(Math.random() * 16777215).toString(16)
    };
  }

  //Your code here
    // a good place to include setInterval or setTimeout functions, 
  // allowing you to delay something from happening on a component or cause some repeating change. 
  componentDidMount() {
    // To create a setInterval, the best practice is to assign it to a variable within the scope of our class:
    // // this.interval = setInterval(...)
    this.interval = setInterval(this.clockTick, 1000)
  }

  componentWillUnmount() {
    // To clear an interval, we use the built in clearInterval method, passing in the local variable:
    // // clearInterval(this.interval);
    clearInterval(this.interval);
  }

  componentDidMount() {
    this.interval = setInterval(
      this.clockTick,
      this.props.updateInterval * 1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { time, color, logText } = this.state;
    return (
      <section className="Timer" style={{ background: color }} ref={this.timer}>
        <h1>{time}</h1>
        <button onClick={this.stopClock}>Stop</button>
        <aside className="logText">{logText}</aside>
        <small onClick={this.handleClose}>X</small>
      </section>
    );
  }

  clockTick = () => {
    this.setState(prevState => ({
      time: prevState.time + this.props.updateInterval
    }));
  };

  stopClock = () => {
    clearInterval(this.interval);
    this.setState({ className: "hidden" });
  };

  // for the 'x' button,
  handleClose = () => {
    this.props.removeTimer(this.props.id);
  };
}

export default Timer;
