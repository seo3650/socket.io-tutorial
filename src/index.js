import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import styles from "./styles.js";

import socketio from "socket.io-client";
const socket = socketio.connect("http://localhost:3001");

class ChatForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", message: "" };
  }
  nameChanged(e) {
    this.setState({ name: e.target.value });
  }
  messageChanged(e) {
    this.setState({ message: e.target.value });
  }

  send() {
    socket.emit("chat-msg", {
      name: this.state.name,
      message: this.state.message,
    });
    this.setState({ message: "" });
  }

  render() {
    return (
      <div style={styles.form}>
        Name:
        <br />
        <input value={this.state.name} onChange={(e) => this.nameChanged(e)} />
        <br />
        Message:
        <br />
        <input
          value={this.state.message}
          onChange={(e) => this.messageChanged(e)}
        />
        <br />
        <button onClick={(e) => this.send()}>Send</button>
      </div>
    );
  }
}

class ChatApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: [],
    };
  }
  componentDidMount() {
    socket.on("chat-msg", (obj) => {
      obj.key = "key_" + (this.state.logs.legth + 1);
      console.log(obj);
      this.setState({ logs: this.state.logs.concat([obj]) });
    });
  }

  render() {
    const messages = this.state.logs.map((e) => (
      <div key={e.key} style={styles.log}>
        <span style={styles.name}>{e.name}</span>
        <span style={styles.msg}>: {e.message}</span>
        <p style={{ clear: "both" }} />
      </div>
    ));
    return (
      <div>
        <h1 style={styles.h1}>Realtime Chatting</h1>
        <ChatForm />
        <div>{messages}</div>
      </div>
    );
  }
}

ReactDOM.render(<ChatApp />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
