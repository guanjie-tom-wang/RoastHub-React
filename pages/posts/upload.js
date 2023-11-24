import React from "react";
import Link from "next/link";
import Head from "next/head";
import axios from "axios"; // Ensure axios is installed
// Import any additional necessary modules

export default class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      typeOfRecipes: "",
      nameOfRecipes: "",
      recipesFile: null,
      coverPage: null,
      // Add other state variables as necessary
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { typeOfRecipes, nameOfRecipes, recipesFile, coverPage } = this.state;
    const formData = new FormData();
    formData.append("TypeOfRecipes", typeOfRecipes);
    formData.append("NameOfRecipes", nameOfRecipes);
    formData.append("Recipes", recipesFile);
    formData.append("coverPage", coverPage);

    // Adjust the POST URL and configuration as necessary
    axios
      .post("/upload", formData)
      .then((response) => {
        console.log(response);
        // Handle response
      })
      .catch((error) => {
        console.error(error);
        // Handle error
      });
  };

  handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "Recipes" || name === "coverPage") {
      this.setState({ [name]: files[0] });
    } else {
      this.setState({ [name]: value });
    }
  };

  render() {
    const { typeOfRecipes, nameOfRecipes } = this.state;
    return (
      <>
        <Head>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
            integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2"
            crossorigin="anonymous"
          />
        </Head>

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <Link className="navbar-brand" href="/">
              Food Lover
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav m-auto">
                <li className="nav-item active">
                  <Link className="nav-link" href="/breakfast">
                    Breakfast
                  </Link>
                </li>
                <li className="nav-item active">
                  <Link className="nav-link" href="/lunch">
                    Lunch
                  </Link>
                </li>
                <li className="nav-item active">
                  <Link className="nav-link" href="/dinner">
                    Dinner
                  </Link>
                </li>
                <li className="nav-item active">
                  <Link className="nav-link" href="/snack">
                    Snack
                  </Link>
                </li>
              </ul>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                  <Link className="nav-link" href="/login">
                    Login
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container">
          <h1>Welcome User! Please Upload the Recipes</h1>
          <form onSubmit={this.handleSubmit} encType="multipart/form-data">
            <div className="form-group">
              <p>
                Choose the type of recipes (Breakfast, Lunch, Dinner, Snack):
              </p>
              <input
                type="text"
                name="typeOfRecipes"
                placeholder="Type of Recipes"
                value={typeOfRecipes}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <p>Choose the PDF file you want to upload:</p>
              <input
                type="file"
                name="recipesFile"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <p>Choose the cover picture for this file:</p>
              <input
                type="file"
                name="coverPage"
                accept="image/png, image/jpeg"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <p>Give a name for this file:</p>
              <input
                type="text"
                name="nameOfRecipes"
                placeholder="Name of File"
                value={nameOfRecipes}
                onChange={this.handleChange}
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </>
    );
  }
}
