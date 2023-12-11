import React from "react";
import axios from "./request";
import MasonryLayout from "../components/MasonryLayout/masonryLayout";
import Link from "next/link";
import NavBar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/footer";
export default class Dinner extends React.Component {
  constructor() {
    super();
    this.state = {
      images: [],
      names: [],
      files: [],
      types: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://127.0.0.1:8888/toronto/show")
      .then((res) => {
        if (res.data && Array.isArray(res.data)) {
          const images = res.data.map((item) => item.pictureUrl);
          const names = res.data.map((item) => item.name);
          const files = res.data.map((item) => item.detailUrl);
          const types = res.data.map((item) => item.type);

          this.setState(
            {
              images: images,
              names: names,
              files: files,
              types: types,
            },
            () => {
              console.log(" files", this.state.files); // This will log the updated state
            }
          );
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const items = this.state.images.map((image, index) => ({
      pictureUrl: image,
      name: this.state.names[index],
      pdfUrl: this.state.files[index],
      type: this.state.types[index],
    }));

    return (
      <>
        <NavBar />
        <div className="container">
          <MasonryLayout items={items} />
        </div>
        <Footer />
      </>
    );
  }
}
