
const mongoose = require("mongoose");
const Product = require("./models/productModel");
require("dotenv").config({ path: "config/config.env" });

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const products = [
  {
    name: "iPhone 14",
    description: "Latest Apple phone",
    price: 79999,
    cuttedPrice: 89999,
    ratings: 4.5,
    user: "65f1a2b3c4d5e6f7890abcd1",
    brand: {
      name: "Apple",
      logo: {
        public_id: "apple_logo",
        url: "https://via.placeholder.com/50",
      },
    },
    images: [
      {
        public_id: "sample1",
        url: "https://via.placeholder.com/150",
      },
    ],
    category: "Mobiles",
    stock: 10,
    numOfReviews: 0,
    reviews: [],
  },
  {
    name: "Samsung Smart TV",
    description: "Smart LED TV with HD display",
    price: 45999,
    cuttedPrice: 55999,
    ratings: 4.2,
    user: "65f1a2b3c4d5e6f7890abcd1",
    brand: {
      name: "Samsung",
      logo: {
        public_id: "samsung_logo",
        url: "https://via.placeholder.com/50",
      },
    },
    images: [
      {
        public_id: "sample2",
        url: "https://via.placeholder.com/150",
      },
    ],
    category: "Electronics",
    stock: 5,
    numOfReviews: 0,
    reviews: [],
  },
];

const seedData = async () => {
  try {
    await Product.deleteMany();
    console.log("Old products deleted");

    await Product.insertMany(products);
    console.log("New products added");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

seedData();