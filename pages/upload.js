import React from "react";
import Link from "next/link";
import Head from "next/head";
import axios from "axios"; // Ensure axios is installed
// Import any additional necessary modules
const base = {
  baseUrl: "http://127.0.0.1:8888/",
  uplaod: "/upload",
};
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
    if (!recipesFile || !coverPage) {
      console.error("File or image not selected");
      return;
    }
    const formData = new FormData();
    console.log("name", nameOfRecipes);

    formData.append("name", nameOfRecipes);
    formData.append("file", recipesFile);
    formData.append("image", coverPage);

    const recipeTypeUrls = {
      Breakfast: "/breakfast",
      Lunch: "/lunch",
      Dinner: "/dinner",
      Snack: "/snack",
    };

    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    let url =
      "http://localhost:8888/" + recipeTypeUrls[typeOfRecipes] + "/upload"; // 默认路径作为后备

    axios
      .post(url, formData)
      .then((response) => {
        console.log(response);
        alert("submit successful");
        // Handle response
      })
      .catch((error) => {
        console.error(error);
        // Handle error
      });
  };

  handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "file") {
      this.setState({ recipesFile: files[0] });
    } else if (name === "image") {
      this.setState({ coverPage: files[0] });
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
                name="file"
                onChange={this.handleChange}
                accept="application/pdf"
              />
            </div>
            <div className="form-group">
              <p>Choose the cover picture for this file:</p>
              <input
                type="file"
                name="image"
                accept="image/*"
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
