import React from "react";
import axios from "./request";
import NavBar from "../components/Navbar/Navbar";

const base = {
  baseUrl: "http://127.0.0.1:8888",
  login: "/register",
};

export default class Register extends React.Component {
  componentDidMount() {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css";
    document.head.appendChild(link);
  }

  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      loginsuccess: false,
      show: false,
    };
  }
  onSubmit = (e) => {
    e.preventDefault();

    const formData = {
      username: this.state.username,
      password: this.state.password,
    };
    var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    // Test the email against the regular expression
    if (regex.test(formData.username)) {
      axios
        .post(base.baseUrl + base.login, formData, {
          "Access-Control-Allow-Origin": "*",
        })
        .then((res) => {
          if (res.data.success == true) {
            this.setState({ loginsuccess: true, show: false });
            localStorage.setItem("token", res.data.data);
            window.close();
            window.location.href = "../welcome/";
            // alert("login successfulm, transfer to upload page");
          } else {
            this.setState({ show: true, loginsuccess: false });
          }
        })
        .catch((error) => {
          console.log(error);
        });

      console.log(this.state);
    } else {
      this.setState({ show: true, loginsuccess: false });
    }
  };

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { username, password } = this.state;
    return (
      <>
        <NavBar></NavBar>
        <div class="container h-100">
          <div class="row h-100 justify-content-center align-items-center">
            <div class="col-6">
              <div class="card-body">
                <h5 class="card-title text-center">Create A Account </h5>
                {this.state.loginsuccess && (
                  <h6 class="card-title text-center">
                    Account Create Successful!
                  </h6>
                )}
                {this.state.show && (
                  <h6 class="card-title text-center">
                    Account Create Unsuccessful! Username must be the valid
                    email address!
                  </h6>
                )}
                <form onSubmit={this.onSubmit}>
                  <div class="form-label-group">
                    <label for="inputEmail">Username</label>
                    <input
                      type="username"
                      id="inputEmail"
                      name="username"
                      class="form-control"
                      placeholder="Email Address"
                      required
                      autoFocus
                      onChange={this.changeHandler}
                    />
                  </div>
                  <div class="form-label-group">
                    <label for="inputPassword">Password</label>
                    <input
                      type="password"
                      id="inputPassword"
                      name="password"
                      class="form-control"
                      placeholder="Password"
                      required
                      onChange={this.changeHandler}
                    />
                  </div>
                  <br />
                  <br />
                  <button
                    class="btn btn-lg btn-primary btn-block"
                    type="submit"
                  >
                    Create
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
