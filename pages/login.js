import React from "react";
import axios from "./request";
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";

const base = {
  baseUrl: "http://127.0.0.1:8888",
  login: "/login",
};

export default class SignupForm extends React.Component {
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
    axios
      .post(base.baseUrl + base.login, formData, {
        "Access-Control-Allow-Origin": "*",
      })
      .then((res) => {
        console.log("guanjie wang1", res.data.success);
        console.log("guanjie wang2", res.data);

        if (res.data.success == true) {
          this.setState({ loginsuccess: true, show: false });
          window.open("/upload", "_blank");
          // alert("login successfulm, transfer to upload page");
        } else {
          this.setState({ show: true, loginsuccess: false });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(this.state);
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
        <div class="container h-100">
          <div class="row h-100 justify-content-center align-items-center">
            <div class="col-6">
              <div class="card-body">
                <h5 class="card-title text-center">Sign In</h5>
                {this.state.loginsuccess && (
                  <h6 class="card-title text-center">Login successful!</h6>
                )}
                {this.state.show && (
                  <h6 class="card-title text-center">Login unsuccessful!</h6>
                )}
                <form onSubmit={this.onSubmit}>
                  <div class="form-label-group">
                    <label for="inputEmail">Username</label>
                    <input
                      type="username"
                      id="inputEmail"
                      name="username"
                      class="form-control"
                      placeholder="Username"
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
                    Sign in
                  </button>
                  <p>Don't have an account yet?</p>
                  <a href="/register" class="btn btn-lg btn-primary btn-block">
                    Create an Account
                  </a>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
