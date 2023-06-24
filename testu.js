import express from "express";
import fetch from 'node-fetch';

import { object, string, number, array } from "zod";

const app = express();
app.use(express.json());

let products = [];

const schema2 = object({
  title: string(),
  price: number(),
});

function validate2(product) {
  return schema2.parse(product);
}

function getProductById(id) {
  return products.find((p) => p.id === id);
}

async function fetchProductData(id) {
  try {
    const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
    const productData = await response.json();
    return productData;
  } catch (error) {
    console.error("Error fetching product data:", error);
    return null;
  }
}

async function updateProduct(id, updatedFields) {
  try {
    const productData = await fetchProductData(id);

    console.log("Fetched data:", productData);

    const product = getProductById(id);

    if (!product) {
      return null;
    }

    product.title = productData.title || updatedFields.title || product.title;
    product.price = productData.price || updatedFields.price || product.price;
    product.updatedAt = new Date();

    return product;
  } catch (error) {
    console.error("Error updating product:", error);
    return null;
  }
}

// Routes
app.put("/products/:id", async (req, res) => {
  try {
    validate2(req.body);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }

  const id = parseInt(req.params.id);
  const { title, price } = req.body;

  const updatedProduct = await updateProduct(id, { title, price });

  if (!updatedProduct) {
    res.status(404).json({ error: "Product not found" });
  } else {
    res.json(updatedProduct);
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
