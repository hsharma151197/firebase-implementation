import React, { Component } from "react";
import moment from "moment";

import "./App.css";
import Header from "./Calendar/Header";
import Events from "./Calendar/Events";
import MainHeader from "./Calendar/MainHeader";
import fire from "./config/Fire";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      selectedDate: moment().format("D"),
      selectedMonth: moment().format("M"),
      selectedYear: moment().format("YYYY"),
      reminders: {}
    };

    this.db = fire
      .database()
      .ref()
      .child("users");
  }

  componentWillMount() {
    this.authListener();
  }

  authListener = () => {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        
        this.setState({ user }, () => {
          this.db.child(this.state.user.uid).on("value", snap => {
            
            if (snap.val()) {
              console.log(
                "sdjvbnds ",
                this.state.user.uid
              );
              this.setState(
                {
                  reminders: snap.val()
                },
                () => {
                  console.log("after second srtState ", this.state.reminders);
                }
              );
            } else {
              this.setState(
                {
                  reminders: {}
                });
              console.log("No previous reminders");
            }
          });
        });
      } else {
        this.setState({ user: null });
      }
    });
  };


  uiConfig = {
    signInFlow: "popup",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccess: () => false
    }
  };

  changeReminders = reminders => {
    this.setState(
      {
        reminders
      },
      () => {
        console.log("uId ", this.state.user.uid);
        const uid = this.state.user.uid;
        this.db.child(uid).update(this.state.reminders);

        // if (this.db.child(this.state.user.uid)) {
        //   console.log(this.state.user.uid);
        //   this.db.child(this.state.user.uid);
        // }else{
        //   this.db.child(this.state.user.uid).set(this.state.reminders);
        // }
      }
    );
  };

  changeSelected = (date, month, year) => {
    this.setState({
      selectedDate: date,
      selectedMonth: month,
      selectedYear: year
    });
  };

  render() {
    return (
      <div className="App">
        {this.state.user ? (
          <div className="container">
            <div
              style={{
                position: "absolute",
                left: "0",
                fontSize: "2.6rem",
                backgroundColor: "#55c57a",
                color: "white",
                borderRadius: "1.6rem",
                fontFamily: "inherit",
                zIndex: "1000",
                top: "0"
              }}
            >
              Welcome, {fire.auth().currentUser.displayName}
            </div>
            <button
              onClick={() => fire.auth().signOut()}
              style={{
                backgroundColor: "#55c57a",
                color: "white",
                borderRadius: "1.6rem",
                fontFamily: "inherit",
                position: "absolute",
                right: "0",
                fontSize: "3.2rem",
                zIndex: "1000"
              }}
            >
              Logout
            </button>
            <header className="header">
              <Header
                selectedDate={this.state.selectedDate}
                selectedMonth={this.state.selectedMonth}
                selectedYear={this.state.selectedYear}
              />
              <Events
                selectedDate={this.state.selectedDate}
                selectedMonth={this.state.selectedMonth}
                selectedYear={this.state.selectedYear}
                changeReminders={this.changeReminders}
                reminders={this.state.reminders}
              />
            </header>

            <main>
              <MainHeader
                changeSelected={this.changeSelected}
                reminders={this.state.reminders}
              />
            </main>
          </div>
        ) : (
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={fire.auth()}
          />
        )}
      </div>
    );
  }
}

export default App;
