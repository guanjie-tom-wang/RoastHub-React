import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Footer from "../components/Footer/footer";
import NavBar from "../components/Navbar/Navbar";
import { withRouter } from "next/router";

class Description extends React.Component {
  render() {
    // Accessing router props using this.props
    const { router } = this.props;
    const data = router.query.fileId; // Assuming you pass the data as a query parameter

    return (
      <>
        {console.log("data", data)}
        <NavBar />
        <div className="container">
          <h1> Here is the recipe</h1>
          <iframe src={data} width="100%" height="1200px"></iframe>
        </div>
        <Footer />
      </>
    );
  }
}

export default withRouter(Description); // Wrapping the component with withRouter HOC
