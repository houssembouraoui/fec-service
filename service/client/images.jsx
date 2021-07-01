import "./index.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
// import { arrowLeft } from "@heroicons/react";

const Images = () => {
  const [images, setImages] = useState([]);

  const [product_id, setId] = useState(11001);

  useEffect(() => {
    axios.get(`/products/${product_id}/styles`).then((response) => {
      let display = response.data.results.map((item) => {
        return {
          thumbnail: item.photos.map((photo) => {
            return photo.thumbnail_url;
          }),
          main: item.photos.map((photo) => {
            return photo.url;
          }),
          id: item.style_id,
        };
      });
      console.log(display);
      setImages(display);
    });
  }, []);
  return (
    <div className=" flex gap-4">
      <div className="space-y-4 space-x-6">
        <ul className="space-y-4 space-x-4">
          {images.map((product) => {
            return (
              <li className="h-18 w-10 " key={product.id}>
                <img src={product.thumbnail} />
              </li>
            );
          })}
        </ul>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="grey"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 space-y-40"
        fill="none"
        viewBox="0 0 24 24"
        stroke="grey"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
      {images.length && <img className="" src={images[4].main} />}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="grey"
      >
        <path
          fillRule="evenodd"
          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
};

export default Images;
