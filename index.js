import express from "express";
import { z } from "zod";
import bbparser from "body-parser";

// const schema = z.object({
//   title: z.string(),
//   price: z.number(),
//   description: z.string(),
//   categoryId: z.number(),
//   //  images: z.array(z.string().url({ require_tld: false }))
// });

const app = express();

app.use(bbparser.json());

app.get("/products", async (req, res) => {
  try {
    //https://api.escuelajs.co/api/v1/products
    const dd = await fetch("https://api.escuelajs.co/api/v1/products");
    const ttt = await dd.json();

    //console.log(ttt)
    res.json(ttt);
    // res.send ('Hello world')
  } catch (error) {
    console.log(error);
    res.status(500).send("error");
  }
});

app.get("/products/:id", async (req, res) => {
  const arr = [];

  const sentdata = req.body;
  console.log(typeof sentdata);

  const sec = req.params.id;
 
//    const validate = schema.parse(req.body);
  console.log(req.body);
  // console.log(validate);
  console.log(sec);
  try {
    const dd = await fetch(`https://fakestoreapi.com/products/${sec}`);
    const ttt = await dd.json();

    //console.log(ttt)
    res.json(ttt);
    // res.send ('Hello world')
  } catch (error) {
    console.log(error);
    res.status(500).send("error");
  }
});
app.post("/products/:id", async (req, res) => {
  const arr = [];

  const sentdata = req.body;
  console.log(typeof sentdata);

  const sec = req.params.id;

  /// const validate = schema.parse(req.body);
  console.log(req.body);
  // console.log(validate);
  console.log(sec);
  try {
    const dd = await fetch(`https://fakestoreapi.com/products/${sec}`);
    const ttt = await dd.json();

    //console.log(ttt)
    res.json(ttt);
    // res.send ('Hello world')
  } catch (error) {
    console.log(error);
    res.status(500).send("error");
  }
});

app.put("/products/:id", async (req, res) => {
  const arr = [];

  const sentdata = req.body;
  console.log(typeof sentdata);

  const sec = req.params.id;

  /// const validate = schema.parse(req.body);
  console.log(req.body);
  // console.log(validate);
  console.log(sec);
  try {
    const dd = await fetch(`https://fakestoreapi.com/products/${sec}`, {
      method: "PUT",
      body: JSON.stringify(sentdata),
    });
    const ttt = await dd.json();
    res.json(ttt);
    console.log(ttt);

    // res.send ('Hello world')
  } catch (error) {
    console.log(error);
    res.status(500).send("error");
  }
});

app.patch("/products/:id", async (req, res) => {
  const arr = [];

  const sentdata = req.body;
  console.log(typeof sentdata);

  const sec = req.params.id;

  /// const validate = schema.parse(req.body);
  console.log(req.body);
  // console.log(validate);
  console.log(sec);
  try {
    const dd = await fetch(`https://fakestoreapi.com/products/${sec}`, {
      method: "PATCH",
      body: JSON.stringify(sentdata),
    });
    const ttt = await dd.json();

    //console.log(ttt)
    res.json(ttt);
    // res.send ('Hello world')
  } catch (error) {
    console.log(error);
    res.status(500).send("error");
  }
});

app.delete("/products/:id", async (req, res) => {
  const arr = [];

  const sentdata = req.body;
  console.log(typeof sentdata);

  const sec = req.params.id;

  /// const validate = schema.parse(req.body);
  console.log(req.body);
  // console.log(validate);
  console.log(sec);
  try {
    const dd = await fetch(`https://fakestoreapi.com/products/${sec}`, {
      method: "DELETE",
    });
    const ttt = await dd.json();

    //console.log(ttt)
    res.json(ttt);
    // res.send ('Hello world')
  } catch (error) {
    console.log(error);
    res.status(500).send("error");
  }
});

app.listen(8080, () => {
  console.log(" server is listening on port 8080");
});
