import React, { useEffect, useState } from "react";
import axios from "../recipt/request";
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Footer from "../components/Footer/footer";
import NavBar from "../components/Navbar/Navbar";

const base = {
  baseUrl: "http://127.0.0.1:8888",
  logout: "/logout",
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
      token: localStorage.getItem("token"),
    };

    // Test the email against the regular expression

    axios
      .post(base.baseUrl + base.logout, formData, {
        "Access-Control-Allow-Origin": "*",
      })
      .then((res) => {
        if (res.data.success == true) {
          this.setState({ loginsuccess: true, show: false });
          localStorage.clear();
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
        <NavBar />
        <div class="container h-100">
          <div class="row h-100 justify-content-center align-items-center">
            <div class="col-6">
              <div class="card-body">
                {this.state.loginsuccess && (
                  <h6 class="card-title text-center">logout successful!</h6>
                )}
                {this.state.show && (
                  <h6 class="card-title text-center">logout unsuccessful!</h6>
                )}
                <form onSubmit={this.onSubmit}>
                  <button
                    class="btn btn-lg btn-primary btn-block"
                    type="submit"
                  >
                    logout
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <br></br>
        <br></br>

        <br></br>

        <Footer />
      </>
    );
  }
}
