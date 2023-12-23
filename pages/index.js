import React from "react";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import Carousel from "react-bootstrap/Carousel";
import Footer from "./components/Footer/footer";
import NavBar from "./components/Navbar/Navbar";

// Import any additional necessary modules
export default class Welcome extends React.Component {
  render() {
    return (
      <>
        <NavBar />
        <div class="container">
          <Carousel class="carousel-inner">
            <Carousel.Item>
              <div
                style={{
                  width: "100%",
                  height: "1080px",
                  position: "relative",
                }}
              >
                <Image
                  className="d-block w-100 h-100"
                  src="/static/pictures/1.jpg"
                  layout="fill" // This tells Next.js to fill the parent container
                  objectFit="cover"
                  alt="First slide"
                />
              </div>
              <Carousel.Caption>
                <h3>Vegetable</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <div
                style={{
                  width: "100%",
                  height: "1080px",
                  position: "relative",
                }}
              >
                <Image
                  className="d-block w-100 h-100"
                  src="/static/pictures/2.jpg"
                  layout="fill" // This tells Next.js to fill the parent container
                  objectFit="cover"
                  alt="First slide"
                />
              </div>
              <Carousel.Caption>
                <h3>Vegetable</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <div
                style={{
                  width: "100%",
                  height: "1080px",
                  position: "relative",
                }}
              >
                <Image
                  className="d-block w-100 h-100"
                  src="/static/pictures/3.jpg"
                  layout="fill" // This tells Next.js to fill the parent container
                  objectFit="cover"
                  alt="First slide"
                />
              </div>
              <Carousel.Caption>
                <h3>Vegetable</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
        <Footer />
      </>
    );
  }
}
