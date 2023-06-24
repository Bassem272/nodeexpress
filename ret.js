import express from "express";
import fetch from 'node-fetch';

import { object, string, number, array } from "zod";

const app = express();
app.use(express.json());

let products = [
  {
    id: 245,
    title: "kachu",
    price: 1,
    description: "A descriptionhhuhu",
    images: ["https://placeimg.com/640/480/any"],
    creationAt: "2023-06-21T07:54:25.000Z",
    updatedAt: "2023-06-21T10:49:16.000Z",
    category: {
      id: 1,
      name: "Clothes",
      image: "https://picsum.photos/640/640?r=4763",
      creationAt: "2023-06-21T06:37:02.000Z",
      updatedAt: "2023-06-21T06:37:02.000Z",
    },
  },
  {
    id: 276,
    title: "New Product",
    price: 10,
    description: "A description",
    images: ["https://placeimg.com/640/480/any"],
    creationAt: "2023-06-21T08:21:12.000Z",
    updatedAt: "2023-06-21T08:21:12.000Z",
    category: {
      id: 1,
      name: "Clothes",
      image: "https://picsum.photos/640/640?r=4763",
      creationAt: "2023-06-21T06:37:02.000Z",
      updatedAt: "2023-06-21T06:37:02.000Z",
    },
  },
  {
    id: 277,
    title: "New Product",
    price: 10,
    description: "A description",
    images: ["https://placeimg.com/640/480/any"],
    creationAt: "2023-06-21T08:21:13.000Z",
    updatedAt: "2023-06-21T08:21:13.000Z",
    category: {
      id: 1,
      name: "Clothes",
      image: "https://picsum.photos/640/640?r=4763",
      creationAt: "2023-06-21T06:37:02.000Z",
      updatedAt: "2023-06-21T06:37:02.000Z",
    },
  },
];

// Routes
app.put("/products/:id", async (req, res) => {
  const schema2 = object({
    title: string(),
    price: number(),
  });

  function validate2(product) {
    return schema2.parse(product);
  }

  const id = parseInt(req.params.id);
  const { title, price } = req.body;

  try {
    validate2(req.body);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
// ${id}
  try {
    const response = await fetch(`https://api.escuelajs.co/api/v1/products/`);
    const productData = await response.json();

    console.log("Fetched data:", productData);

    const product = productData.find((p) => p.id === id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    product.title = productData.title || title || product.title;
    product.price = productData.price || price || product.price;
    product.updatedAt = new Date();

    return res.json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
