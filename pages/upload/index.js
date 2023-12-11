import React from "react";
import Link from "next/link";
import Head from "next/head";
import axios from "axios"; // Ensure axios is installed
import NavBar from "../components/Navbar/Navbar";
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
    formData.append("type", typeOfRecipes);

    const recipeTypeUrls = {
      Waterloo: "/waterloo",
      Kitchener: "/kitchener",
      Toronto: "/toronto",
      Mississauga: "/mississauga",
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
    } else if (name === "typeOfRecipes") {
      this.setState({ typeOfRecipes: value });
    } else {
      this.setState({ nameOfRecipes: value });
    }
  };
  render() {
    const { typeOfRecipes, nameOfRecipes } = this.state;
    return (
      <>
        <NavBar />
        <div className="container">
          <h1>Welcome User! Please Upload the Recipes</h1>
          <form onSubmit={this.handleSubmit} encType="multipart/form-data">
            <div className="form-group">
              <p>
                Choose the Location (Waterloo Kitchener Toronto Mississauga):
              </p>
              <input
                type="text"
                name="typeOfRecipes"
                placeholder="Location"
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
