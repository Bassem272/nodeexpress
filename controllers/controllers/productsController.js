import fetch from "node-fetch";
import productsModel from "../models/productsModel.js";
import { object, string, number, array } from "zod";
import fs from "fs/promises";
import jwt from "jsonwebtoken";
import groupBy from "array-group";

export default {
  async registerIn(req, res) {
    try {
      req.isAuthenticated();
      // Extract username and password from request body
      const { email, password } = req.body;

      // Check if user already exists
      const users = await productsModel.getUsers();
      const result = await productsModel.validRegister(req.body);
      if (!result) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      console.log(result);
      if (users.find((user) => user.email === email)) {
        return res.status(409).json({ message: "User already exists" });
      }

      // Add new user to database
      const newUser = { email, password };
      users.push(newUser);
      await productsModel.saveUsers(users);

      // Return success response
      res.status(201).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async logIn(req, res) {
    try {
      // Extract username and password from request body
      const { email, password } = req.body;

      // Check if user exists and password is correct
      const users = await productsModel.getUsers();
      const result = await productsModel.validLogin(req.body);
      if (!result) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      console.log(result);
      const user = users.find(
        (user) => user.email === email && user.password === password
      );
      console.log(user);
      if (!user) {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }

      // Generate JWT token and send it in the response
      // const token = jwt.sign(user,secretKey);
      //var token = jwt.sign(user, 'shhhhh'), { expiresIn: "1m" }

      const token = jwt.sign(user, "shhhhh");

      res.status(200).json(await productsModel.correctUser(user, token));
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async getAllProducts(req, res) {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const products = await response.json();
      productsModel.setProducts(products);

      // console.log(products)
      const inCats = await productsModel.saveCategories(products);
      console.log(inCats);
      const outCats = await productsModel.readCategories();
      console.log(outCats, "i am ");

      // fs.writeFile('categories.json',JSON.stringify(CategoryArray))
      // save it to products array in productsModel
      // fs.writeFile('output.json',JSON.stringify(data));
      res.json(productsModel.saveProducts(products)); // save the data to output.json file
    } catch (error) {
      res.status(500).json({ error: "Error fetching products" });
    }
  },
  async getAllCategories(req, res) {
    try {
      const outCats = await productsModel.readCategories();
      console.log(outCats);

      res.json(outCats);
    } catch (error) {
      res.status(500).json({ error: "Error fetching categories" });
    }
  },
  async getProductById(req, res) {
    const id = parseInt(req.params.id);
    console.log(id);
    const product = await productsModel.getProduct(id);

    if (!product) {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.json(product);
    }
  },
  async getProductById(req, res) {
    const id = parseInt(req.params.id);
    console.log(id);
    const product = await productsModel.getProduct(id);

    if (!product) {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.json(product);
    }
  },
  async getCategoryById(req, res) {
    const id = parseInt(req.params.id);
    console.log(id);
    const category = await productsModel.getCategory(id);
    console.log(category);
    if (!category) {
      res.status(404).json({ error: "category not found" });
    } else {
      res.json(category);
    }
  },
  createProduct(req, res) {
    try {
      productsModel.validate1(req.body);
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
    const { title, price, description, categoryId, images } = req.body;

    const newProduct = {
      id: productsModel.readProducts.length + 1,
      title,
      price,
      description,
      category: {
        id: categoryId,
        name: "Clothes",
        image: "https://api.lorem.space/image/fashion?w=640&h=480&r=4278",
        creationAt: new Date(),
        updatedAt: new Date(),
      },
      images,
      creationAt: new Date(),
      updatedAt: new Date(),
    };

    productsModel.addProduct(newProduct);

    res.status(201).json(newProduct);
  },
  async postCategory(req, res) {
    try {
      const { name } = req.body;
      console.log(name);
      const newProduct = productsModel.validCategory(req.body);
      if (!newProduct) {
        throw new Error("invalid category " + req.body);
      }
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
    const { name } = req.body;
    const newCategories = await productsModel.addCategory(name);
    console.log(newCategories, "sdd");
    const cats = await productsModel.saveCategories2(newCategories);
    console.log(cats, "yui");
    const catss = await productsModel.readCategories(newCategories);
    console.log(catss, "yuit");

    //  const cat ={
    //   name:name,
    //   id:categories.length+1
    //  }
    //productsModel.addProduct(newProduct);

    res.status(201).json(req.body);
  },
  async putCategory(req, res) {
    try {
      productsModel.validCategory(req.body);
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
    const id = parseInt(req.params.id);
    const { name } = req.body;
   
    const updatedProduct = await productsModel.updateCategory(id, {
      name,
    });
    console.log("update :", updatedProduct);
    if (!updatedProduct) {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.json(updatedProduct);
    }

  },
 async deleteCategory(req, res) {
    try {
     // productsModel.validCategory(req.body);
     const idw  = req.params.id;
    console.log(idw,'control');
    const deletedProduct = await productsModel.deleteCategory(idw);
    //productsModel.addProduct(newProduct);
    console.log("deleted category:", deletedProduct);

    res.status(201).json(deletedProduct);
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
    
  },
  async updateProduct(req, res) {
    try {
      productsModel.validate2(req.body);
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
    const id = parseInt(req.params.id);
    const { title, price } = req.body;

    const updatedProduct = await productsModel.updateProduct(id, {
      title,
      price,
    });
    console.log("update :", updatedProduct);
    if (!updatedProduct) {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.json(updatedProduct);
    }
  },

  async deleteProduct(req, res) {
    const id = parseInt(req.params.id);

    const deletedProduct = await productsModel.deleteProduct(id);

    if (!deletedProduct) {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.json(true);
    }
  },
};
