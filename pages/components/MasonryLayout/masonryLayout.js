import React from "react";
import { Masonry, MasonryAbsoluteItem } from "react-masonry-component2";
import styles from "./masonry.module.css";
import Image from "next/image";
import { useNavigate } from "react-router-dom";
import { useRouter } from "next/router";
import axios from "axios"; // Ensure axios is installed
const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

const MasonryLayout = ({ items = [], flag = false }) => {
  const router = useRouter();
  const handleClick = (pdfUrl, type) => {
    if (type.toLowerCase() === "waterloo") {
      pdfUrl = "http://127.0.0.1:8888/waterloo/description/" + pdfUrl;
    } else if (type.toLowerCase() === "toronto") {
      pdfUrl = "http://127.0.0.1:8888/toronto/description/" + pdfUrl;
    } else if (type.toLowerCase() === "kitchener") {
      pdfUrl = "http://127.0.0.1:8888/kitchener/description/" + pdfUrl;
    } else if (type.toLowerCase() === "mississauga") {
      pdfUrl = "http://127.0.0.1:8888/mississauga/description/" + pdfUrl;
    }
    console.log("pdfid: ", pdfUrl);
    router.push(`/recipt/description?fileId=${encodeURIComponent(pdfUrl)}`);
  };
  // Accept items as a prop
  const handleDelete = async (itemId) => {
    // 调用删除API
    axios
      .delete("http://127.0.0.1:8888/myUpload/delete/" + itemId)
      .then((response) => {
        console.log(response);
        alert("delete successful");
        // Handle response
      })
      .catch((error) => {
        console.error(error);
        // Handle error
      });
  };

  return (
    <Masonry
      style={{ marginTop: "2%" }}
      direction="column"
      columnsCountBreakPoints={{ 1400: 5, 1000: 4, 700: 3 }}
    >
      {Array.isArray(items) &&
        items.map((item, index) => (
          <div key={index} className={styles.masonryItem}>
            <Image
              src={`http://127.0.0.1:8888/${item.type.toLowerCase()}/showimage/${
                item.pictureUrl
              }`}
              width={350}
              height={350}
              alt={item.name}
              onClick={() => handleClick(item.pdfUrl, item.type)}
            />
            <p className={styles.masonryText}>{item.name}</p>
            {console.log("time", item)}
            {flag && (
              <button onClick={() => handleDelete(item.itemId)}>删除</button>
            )}
            {/* 添加删除按钮 */}
          </div>
        ))}
    </Masonry>
  );
};

export default MasonryLayout;
