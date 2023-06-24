import { object, string, number, array } from "zod";

let products = [];
const schema1 = object({
  title: string(),
  price: number(),
  description: string(),
  categoryId: number(),
  images: array(string().url()),
});
const schema2 = object({
  title: string(),
  price: number(),
});

export default {
  getProducts() {
    return products;
  },

  setProducts(data) {
    products = data;
  },

  addProduct(product) {
    products.push(product);
  },

  async updateProduct(id, updatedFields) {
    try {
      // Fetch the updated product data from an external API or source
      const response = await fetch(`https://api.escuelajs.co/api/v1/products/`);
      const products = await response.json();

      // const product = this.getProductById(id);
      const product = products.find((p) => p.id === id);
      if (!product) {
        return null;
      }
      console.log("Fetched data:", product);
      console.log("Fetched data:", product.title);
      console.log("Fetched data:", updatedFields.price);
      console.log("Fetched data:", updatedFields.title);

      // Update the product fields with the fetched data or use the existing values
      product.title = updatedFields.title || product.title;
      product.price = updatedFields.price || product.price;
      product.updatedAt = new Date();
      console.log("Fetched data:", product);
      return product;
    } catch (error) {
      // Handle any errors that occur during the fetch request
      console.error("Error fetching updated product data:", error);
      return null;
    }
  },
  async deleteProduct(id) {
    console.log("Fetched data:", id);

    try {
      // Fetch the updated product data from an external API or source
      const response = await fetch(`https://api.escuelajs.co/api/v1/products/`);
      const products = await response.json();
      const product = products.find((p) => p.id === id);
      const index = products.findIndex((p) => p.id === id);
    if (index === -1) {
      return null;
    }
      console.log("Fetched data:", index);
      console.log("Fetched data:", product);

      
      if (!product) {
        return null;
      }
      console.log("before:", products.length);
      const deletedProduct = products[index];
      products.splice(index, 1);
      console.log("Fetched data:", product);
      console.log("after:", products.length);

      return deletedProduct;
    } catch (error) {
      // Handle any errors that occur during the fetch request
      console.error("Error fetching updated product data:", error);
      return null;
    }
  },

  validate1(product) {
    return schema1.parse(product);
  },

  validate2(product) {
    return schema2.parse(product);
  },
};
