// routes/products.js  Categories 클릭 라우터
const express = require('express');
const router = express.Router();

const products = {
  Phones: [
    { id: 1, name: 'iPhone 15', price: 999, imageUrl: '/images/iphone15.jpg' },
    { id: 2, name: 'Galaxy S24', price: 899, imageUrl: '/images/galaxyS24.jpg' }
  ],
  Computers: [
    { id: 3, name: 'ASUS FHD Gaming Laptop', price: 700, imageUrl: '/images/laptop.jpg' },
  ],
  SmartWatch: [
    { id: 4, name: 'Apple Watch 9', price: 399, imageUrl: '/images/applewatch9.jpg' }
  ],
  Camera: [
    { id: 5, name: 'Sony Alpha 7C', price: 1499, imageUrl: '/images/sonyalpha7c.jpg' }
  ],
  HeadPhones: [
    { id: 6, name: 'Sony WH-1000XM5', price: 349, imageUrl: '/images/sonywh1000xm5.jpg' }
  ],
  Gaming: [
    { id: 7, name: 'PS5 Console', price: 499, imageUrl: '/images/ps5.jpg' }
  ]
};

// GET /server-api/products?category=Phones
router.get('/', (req, res) => {
  const category = req.query.category;
  if (!category || !products[category]) {
    return res.status(404).send([]);
  }
  res.send(products[category]);
});

module.exports = router;
