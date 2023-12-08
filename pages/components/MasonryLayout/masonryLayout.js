import React from "react";
import Masonry from "react-masonry-css";
import styles from "./masonry.module.css";
import Image from "next/image";
import { useNavigate } from "react-router-dom";
import { useRouter } from "next/router";

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

const MasonryLayout = ({ items }) => {
  const router = useRouter();
  const handleClick = (pdfUrl, type) => {
    if (type.toLowerCase() === "breakfast") {
      pdfUrl = "http://127.0.0.1:8888/breakfast/description/" + pdfUrl;
    } else if (type.toLowerCase() === "dinner") {
      pdfUrl = "http://127.0.0.1:8888/dinner/description/" + pdfUrl;
    } else if (type.toLowerCase() === "lunch") {
      pdfUrl = "http://127.0.0.1:8888/lunch/description/" + pdfUrl;
    } else if (type.toLowerCase() === "snack") {
      pdfUrl = "http://127.0.0.1:8888/snack/description/" + pdfUrl;
    }
    console.log("pdfid: ", pdfUrl);
    router.push(`/recipt/description?fileId=${encodeURIComponent(pdfUrl)}`);
  };
  // Accept items as a prop
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className={styles.myMasonryGrid}
      columnClassName={styles.myMasonryGridColumn}
    >
      {items.map((item, index) => (
        <div key={index} className={styles.masonryItem}>
          {console.log(item)}
          <Image
            src={"http://127.0.0.1:8888/breakfast/showimage/" + item.pictureUrl}
            width={350}
            height={350}
            alt={item.name}
            onClick={() => handleClick(item.pdfUrl, item.type)}
            // className={styles.masonryImage} // Apply CSS class to image
          />
          <p className={styles.masonryText}>{item.name}</p>{" "}
          {/* Apply CSS class to paragraph */}
        </div>
      ))}
    </Masonry>
  );
};

export default MasonryLayout;
