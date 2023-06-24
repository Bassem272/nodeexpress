import express from 'express';
const app = express();

// Middleware
app.use(express.json());

// Model
const products = [
  {
    id: 1,
    title: 'Handmade Fresh Table',
    price: 687,
    description: 'Andy shoes are designed to keeping in...',
    category: {
      id: 5,
      name: 'Others',
      image: 'https://placeimg.com/640/480/any?r=0.591926261873231'
    },
    images: [
      'https://placeimg.com/640/480/any?r=0.9178516507833767',
      'https://placeimg.com/640/480/any?r=0.9300320592588625',
      'https://placeimg.com/640/480/any?r=0.8807778235430017'
    ]
  }
  // Add more product data here
];

// Controller
const productsController = {
  getAllProducts(req, res) {
    res.json(products);
  },

  getProductById(req, res) {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);

    if (!product) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.json(product);
    }
  },

  createProduct(req, res) {
    const { title, price, description, categoryId, images } = req.body;
    // You can add validation here to ensure all required fields are present

    const newProduct = {
      id: products.length + 1,
      title,
      price,
      description,
      category: {
        id: categoryId,
        name: 'Clothes',
        image: 'https://api.lorem.space/image/fashion?w=640&h=480&r=4278',
        creationAt: new Date(),
        updatedAt: new Date()
      },
      images,
      creationAt: new Date(),
      updatedAt: new Date()
    };

    products.push(newProduct);

    res.status(201).json(newProduct);
  },

  updateProduct(req, res) {
    const id = parseInt(req.params.id);
    const { title, price } = req.body;

    const product = products.find(p => p.id === id);

    if (!product) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      product.title = title || product.title;
      product.price = price || product.price;
      product.updatedAt = new Date();

      res.json(product);
    }
  },

  deleteProduct(req, res) {
    const id = parseInt(req.params.id);

    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      products.splice(index, 1);
      res.json(true);
    }
  }
};

// Routes
app.get('/api/v1/products', productsController.getAllProducts);
app.get('/api/v1/products/:id', productsController.getProductById);
app.post('/api/v1/products', productsController.createProduct);
app.put('/api/v1/products/:id', productsController.updateProduct);
app.delete('/api/v1/products/:id', productsController.deleteProduct);

// Start the server
const port = 8080;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
