const { default: axios } = require("axios");
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const app = express();
const port = process.env.PORT || 3001;
require("dotenv").config();

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "../public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//fetching the average of reviews

app.get("/reviews/:product_id", (req, res) => {
  axios
    .get(`https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/reviews/`, {
      headers: {
        Authorization: process.env.API_KEY,
      },
      params: {
        product_id: req.params.product_id,
      },
    })
    .then((result) => {
      // console.log("oooo weeee", result.data);
      let ratesData = result.data.results;
      let avreageRating = ratesData.reduce((acc, obj) => {
        return acc + obj.rating;
      }, 0);
      res.status(200).json(avreageRating / ratesData.length);
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
    });
});

//fetching product details

app.get("/products/:product_id", (req, res) => {
  axios
    .get(
      `https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/products/${req.params.product_id}`,
      {
        headers: {
          Authorization: process.env.API_KEY,
        },
      }
    )
    .then((result) => {
      res.status(200).send(result.data);
    })
    .catch((err) => {
      console.log(err);
    });
});

//fetching product images and thumbnails

app.get(`/products/:product_id/styles/`, (req, res) => {
  axios
    .get(
      `https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/products/${req.params.product_id}/styles`,
      {
        headers: {
          Authorization: process.env.API_KEY,
        },
      }
    )
    .then((result) => {
      res.status(200).send(result.data);

      log(result.data);
    })
    .catch((err) => console.log(err));
});

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
