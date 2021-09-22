/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDWZtmgjDekcmNHBBeOygBtkyoeKOfGo9A",
  authDomain: "todoapp-firebase-a4548.firebaseapp.com",
  projectId: "todoapp-firebase-a4548",
  storageBucket: "todoapp-firebase-a4548.appspot.com",
  messagingSenderId: "524978307342",
  appId: "1:524978307342:web:31ff4589fccbd1d709575f",
  databaseURL: " https://todoapp-firebase-a4548-default-rtdb.firebaseio.com/",
  measurementId: "G-V9GL05LFZ1",
};
const app = initializeApp(firebaseConfig);
//const db = getAnalytics(app);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInput: "",
      list: [],
    };
    this.addItem = this.addItem.bind(this);
  }
  writeUserData = () => {
    const db = getDatabase(app);

    set(ref(db, "todoapp/" + Date()), {
      userInput: this.state.userInput,
    }).then(() => {
      console.log("{ todo }");
    });
  };

  readUserData = () => {
    const db = getDatabase(app);

    const list = ref(db, "todoapp/");
    onValue(list, (snapshot) => {
      const data = snapshot.val();
      console.log(list, data);
    });
  };
  updateInput(value) {
    this.setState({
      userInput: value,
    });
  }
  addItem() {
    if (this.state.userInput !== "") {
      const userInput = {
        id: Date(),

        value: this.state.userInput,
      };

      const list = [...this.state.list];
      list.push(userInput);

      this.setState({
        userInput: "",
      });
    }
  }

  render() {
    return (
      <div>
        <div>
          <input
            type="text"
            placeholder="Enter todos..."
            value={this.state.userInput}
            onChange={(item) => this.updateInput(item.target.value)}
          />
          <button onClick={this.additem}>Add</button>
        </div>
        <div>
          {this.state.list.map((todo) => {
            return <div>{todo}</div>;
          })}
        </div>
      </div>
    );
  }
}
export default App;
