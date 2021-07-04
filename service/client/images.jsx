import "./index.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
// import { arrowLeft } from "@heroicons/react";

const Images = (props) => {
  const [images, setImages] = useState([]);
  const [main, setMain] = useState("");
  const [size, setSize] = useState("");
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [style, setStyle] = useState("");
  const [slogan, setSlogan] = useState("");
  let [index, setIndex] = useState(0);
  let [styleIndex, setStyleIndex] = useState(index);

  useEffect(() => {
    axios
      .get(`/products/${props.id}`)
      .then((response) => {
        setCategory(response.data.category);
        setName(response.data.name);
        setPrice(response.data.default_price);
        setStyle(response.data.style);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    axios.get(`/products/${props.id}/styles`).then((response) => {
      // console.log(response.data);
      setMain(response.data[0].main);
      setSize(
        response.data.map((element) => {
          return element.skus;
        })
      );
      setImages(response.data);
    });
  }, []);

  const handleClick = (e) => {
    setMain(e);
    images.forEach((image) => {
      if (image.main === main) {
        setIndex(images.indexOf(image));
      }
    });
  };

  const changeSize = (e) => {
    setStyleIndex(e);
    console.log(styleIndex);
  };

  const left = () => {
    images.forEach((image) => {
      if (image.main === main) {
        setIndex(images.indexOf(image));
      }
    });
    if (index > 0) {
      setIndex(index--);
      setMain(images[index].main);
    }
    console.log(images[index].price);
  };

  const right = () => {
    images.forEach((image) => {
      if (image.main === main) {
        setIndex(images.indexOf(image));
      }
    });
    if (index < images.length - 1) {
      setIndex(index++);
      setMain(images[index].main);
    }
    console.log(Object.entries(size[index])[0][0]);
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
        <div className="w-96">
          {images.length && <img className=" mx-auto max-h-160 " src={main} />}
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
            d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
          />
        </svg>
      </div>

      <div>
        <h3>{category}</h3>
        <h2>{name}</h2>
        {images.length && (
          <h2>{images[index].salePrice || images[index].price} $</h2>
        )}
        {images.length && (
          <h3 className="flex">selected style: {images[index].name} </h3>
        )}
        <ul className=" flex flex-wrap space-y-4 space-x-4">
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
        {Object.entries(size).length && (
          <select className="gap-2 w-20 h-12">
            {Object.entries(size[index]).map((taille) => {
              return (
                <option onClick={() => changeSize(6)} key={taille[0]}>
                  {taille[1].size}
                </option>
              );
            })}
          </select>
        )}
        <select className=""></select>
      </div>
    </>
  );
};

export default Images;
