import "./index.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
// import { arrowLeft } from "@heroicons/react";

const Images = (props) => {
  const [images, setImages] = useState([]);
  const [main, setMain] = useState("");
  const [size, setSize] = useState("");

  useEffect(() => {
    axios.get(`/products/${props.id}/styles`).then((response) => {
      console.log(response.data);
      setMain(response.data[0].main);

      setImages(response.data);
    });
  }, []);

  const handleClick = (e) => {
    setMain(e);
  };

  const left = () => {
    var current;
    images.forEach((image) => {
      if (image.main === main) {
        current = images.indexOf(image);
      }
    });
    if (current > 0) {
      setMain(images[current - 1].main);
    }
  };

  const right = () => {
    var current;
    images.forEach((image) => {
      if (image.main === main) {
        current = images.indexOf(image);
      }
    });
    if (current < images.length) {
      setMain(images[current + 1].main);
    }
  };

  return (
    <>
      <div className=" flex gap-4 h-full ">
        <div className="space-y-4 space-x-6">
          <ul className="space-y-4 space-x-4">
            {images.map((product) => {
              return (
                <li className="h-18 w-18 " key={product.id}>
                  <img
                    src={product.thumbnail}
                    onClick={() => handleClick(product.main)}
                    className="relative z-10 inline object-cover w-16 h-16 border-2 hover:border-black rounded-full"
                  />
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
          onClick={left}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        <div className="w-80">
          {images.length && (
            <img className="max-w-120 mx-auto max-h-80 " src={main} />
          )}
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="grey"
          onClick={right}
        >
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <select className="gap-2 w-20"></select>
      <div>{images.length && <h3>{images[0].name} </h3>}</div>
    </>
  );
};

export default Images;
