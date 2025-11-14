import { config } from 'dotenv';
config({ path: '../.env.local' });

import connectDB from '../src/lib/mongoose.js';
import Product from '../src/models/Product.js';


const products = [
  {
    name: 'Mastering Next.js 14: Advanced Web Development',
    price: 49.99,
    description: 'Take your web development skills to the next level with our Mastering Next.js 14 course. Dive deep into the latest features and functionalities of Next.js, including server-side rendering, API routes, and dynamic routing.',
    image: 'https://via.placeholder.com/300x200.png?text=Next.js+14',
    category: 'TECH',
  },
  {
    name: 'Web Development Bootcamp: Build Modern Websites',
    price: 39.99,
    description: 'Build stunning, modern websites with hands-on projects. Learn HTML, CSS, JS, and React.',
    image: 'https://via.placeholder.com/300x200.png?text=Web+Bootcamp',
    category: 'TECH',
  },
  {
    name: 'Complete Python Programming',
    price: 19.99,
    description: 'Master Python from basics to advanced.',
    image: 'https://via.placeholder.com/300x200.png?text=Python',
    category: 'TECH',
  },
  {
    name: 'Machine Learning for Beginners',
    price: 29.99,
    description: 'Intro to ML with practical examples.',
    image: 'https://via.placeholder.com/300x200.png?text=ML',
    category: 'TECH',
  },
];

async function seed() {
  await connectDB();
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log('Products seeded!');
  process.exit();
}

seed();