import React from "react";
import axios from "./request";
import MasonryLayout from "../components/MasonryLayout/masonryLayout";
import Link from "next/link";
import NavBar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/footer";
export default class Lunch extends React.Component {
  constructor() {
    super();
    this.state = {
      images: [],
      names: [],
      files: [],
      types: [],
      itemId: [],
    };
  }

  componentDidMount() {
    let url =
      "http://127.0.0.1:8888/myUpload/show/" + localStorage.getItem("token");
    axios
      .get(url)
      .then((res) => {
        if (res.data && Array.isArray(res.data)) {
          const images = res.data.map((item) => item.pictureUrl);
          const names = res.data.map((item) => item.name);
          const files = res.data.map((item) => item.detailUrl);
          const types = res.data.map((item) => item.type);
          const itemId = res.data.map((item) => item.itemId);

          this.setState(
            {
              images: images,
              names: names,
              files: files,
              types: types,
              itemId: itemId,
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
      itemId: this.state.itemId[index],
    }));

    return (
      <>
        <NavBar />
        <div className="container">
          {console.log("wang: ", items)}
          <MasonryLayout items={items} flag={true} />
        </div>
        <Footer />
      </>
    );
  }
}
