// Footer.js
import React from "react";
import styles from "./Footer.module.css"; // Import css modules stylesheet as styles

const Footer = () => {
  return (
    <div class="container">
      <footer>
        {
          <div class="row">
            <p class="col-3 float-right">
              Purpose:
              <br />
              This website serves as a platform for individuals to share their
              experiences with roasting and related activities.
            </p>
            <p class="col-3 float-left">
              About:
              <br />
              The developer and maintainer of this website disclaim legal
              responsibility for the content published on it.
            </p>
          </div>
        }
      </footer>
    </div>
  );
};

export default Footer;
