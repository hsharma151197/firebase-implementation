import React, { Component } from "react";
import fire from "../config/Fire";

import "./Form.css";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  login = (e) => {
    e.preventDefault();
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(()=>{}).catch(error=>{
        console.log(error);
    });
    
  };

  render() {
    return (
      <div className="form">
        <img src="http://www.androidpolice.com/wp-content/themes/ap2/ap_resize/ap_resize.php?src=http%3A%2F%2Fwww.androidpolice.com%2Fwp-content%2Fuploads%2F2015%2F10%2Fnexus2cee_Search-Thumb-150x150.png&w=150&h=150&zc=3" />

        <input
          type="email"
          name="email"
          onChange={this.handleChange}
          placeholder="Email"
        />

        <input
          type="password"
          name="Password"
          onChange={this.handleChange}
          placeholder="Password"
        />

        <button type="submit" onClick={this.login}>
          Sign in
        </button>

        <a href="https://www.google.com/">Create account</a>
      </div>
    );
  }
}

export default Form;
