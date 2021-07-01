import "./index.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

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
      <ul className="">
        {images.map((product) => {
          return (
            <li className="h-18 w-10" key={product.id}>
              <img src={product.thumbnail} />
            </li>
          );
        })}
      </ul>
      {images.length && <img className="" src={images[4].main} />}
    </div>
  );
};

export default Images;
