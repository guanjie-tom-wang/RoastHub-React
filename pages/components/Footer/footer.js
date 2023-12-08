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
              This is website used for food lover to share their recipes
            </p>
            <p class="col-3 float-left">
              About:
              <br />
              This webiste is created by: <br />
              Guanjie Wang
            </p>
          </div>
        }
      </footer>
    </div>
  );
};

export default Footer;
