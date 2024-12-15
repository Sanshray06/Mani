import mainPic from './MainPic.jpg'
import mainProduct1 from './MainProduct1.png'
import mainProduct1_1 from './MainProduct1_1.png'
import mainProduct1_2 from './MainProduct1_2.png'
import mainProduct1_3 from './MainProduct1_3.png'
import mainProduct1_4 from './MainProduct1_4.png'
import Logo from './MainPic3.png'
import home from './home.png'
import menu from './menu.png'
import user from './user.png'
import back from './back.png'
import Product1 from './Product1.jpg'
import Product2 from './Product2.jpg'
import Product3 from './Product3.jpg'
import Product4 from './Product4.jpg'
import Product5 from './Product5.jpg'
import Product6 from './Product6.jpg'
import Product7 from './Product7.jpg'
import Product8 from './Product8.jpg'
import Product9 from './Product9.jpg'
import Product10 from './Product10.jpg'
import loupe from './loupe.png'
import customerservice from './customer-service.png'
import aboutus from './group.png'
import category from './category.png'
import shoppingbag from './shopping-bag.png'

export const asset= {
    mainPic,
    mainProduct1,
    mainProduct1_1,
    mainProduct1_2,
    mainProduct1_3,
    mainProduct1_4,
    Logo,
    home,
    aboutus,
    shoppingbag,
    category,
    customerservice,
    loupe,
    user,
    menu,
    back,
    Product1, 
    Product2, 
    Product3, 
    Product4, 
    Product5, 
    Product6, 
    Product7, 
    Product8, 
    Product9, 
    Product10, 
}



export const products = [
    {
      id: 1,
      name: "Classic Necklace Set",
      price: 1200,
      currency: '₹',
      description: "Elegant necklace set with matching earrings.",
      mainImage: [Product1, mainProduct1_1],
      images: [
        mainProduct1_1,
        mainProduct1_2,
        mainProduct1_3,
        mainProduct1_4,
      ],
      category: "Jewelry",
      inStock: true,
      bestseller: true,
    },
    {
      id: 2,
      name: "Gold Plated Bangles",
      price: 800,
      currency: '₹',
      description: "Stylish gold-plated bangles for every occasion.",
      mainImage: [Product2, mainProduct1_2],
      images: [
        mainProduct1_2,
        mainProduct1_3,
      ],
      category: "Jewelry",
      inStock: true,
      bestseller: false,
    },
    {
      id: 3,
      name: "Premium Earrings",
      price: 500,
      currency: '₹',
      description: "Beautiful earrings for a perfect ethnic look.",
      mainImage: [Product3, mainProduct1_3],
      images: [
        mainProduct1_1,
        mainProduct1_3,
      ],
      category: "Jewelry",
      inStock: false,
      bestseller: true,
    },
    {
      id: 4,
      name: "Premium Earrings",
      price: 700,
      currency: '₹',
      description: "Beautiful earrings for a perfect ethnic look.",
      mainImage: [Product4, mainProduct1_4],
      images: [
        mainProduct1_1,
        mainProduct1_3,
      ],
      category: "Jewelry",
      inStock: false,
      bestseller: false,
    },
    {
      id: 10,
      name: "Premium Earrings",
      price: 500,
      currency: '₹',
      description: "Beautiful earrings for a perfect ethnic look.",
      mainImage: [Product10, mainProduct1_1],
      images: [
        mainProduct1_1,
        mainProduct1_3,
      ],
      category: "Jewelry",
      inStock: false,
      bestseller: true,
    },
    {
      id: 5,
      name: "Premium Earrings",
      price: 500,
      currency: '₹',
      description: "Beautiful earrings for a perfect ethnic look.",
      mainImage: [Product5, mainProduct1_2],
      images: [
        mainProduct1_1,
        mainProduct1_3,
      ],
      category: "Jewelry",
      inStock: false,
      bestseller: false,
    },
    {
      id: 6,
      name: "Premium Earrings",
      price: 500,
      currency: '₹',
      description: "Beautiful earrings for a perfect ethnic look.",
      mainImage: [Product6, mainProduct1_3],
      images: [
        mainProduct1_1,
        mainProduct1_3,
      ],
      category: "Jewelry",
      inStock: false,
      bestseller: true,
    },
    {
      id: 7,
      name: "Premium Earrings",
      price: 500,
      currency: '₹',
      description: "Beautiful earrings for a perfect ethnic look.",
      mainImage: [Product7, mainProduct1_4],
      images: [
        mainProduct1_1,
        mainProduct1_3,
      ],
      category: "Jewelry",
      inStock: false,
      bestseller: false,
    },
    {
      id: 8,
      name: "Premium Earrings",
      price: 500,
      currency: '₹',
      description: "Beautiful earrings for a perfect ethnic look.",
      mainImage: [Product8, mainProduct1_1],
      images: [
        mainProduct1_1,
        mainProduct1_3,
      ],
      category: "Jewelry",
      inStock: false,
      bestseller: true,
    },
    {
      id: 9,
      name: "Premium Earrings",
      price: 500,
      currency: '₹',
      description: "Beautiful earrings for a perfect ethnic look.",
      mainImage: [Product9, mainProduct1_2],
      images: [
        mainProduct1_1,
        mainProduct1_3,
      ],
      category: "Jewelry",
      inStock: false,
      bestseller: false,
    },
  ];
