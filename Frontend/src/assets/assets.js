import mainPic from './MainPic.jpg'
import mainProduct1 from './MainProduct1.png'
import mainProduct1_1 from './MainProduct1_1.png'
import mainProduct1_2 from './MainProduct1_2.png'
import mainProduct1_3 from './MainProduct1_3.png'
import mainProduct1_4 from './MainProduct1_4.png'
import Logo from './MainPic3.png'
import home from './home.png'
import menu from './menu.png'
import star from './star.png'
import user from './user.png'
import back from './back.png'
import th123 from './th123.jpg'
import close from './close.png'
import OIP from './OIP.jpg'
import download from './download.jpg'
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
import childrenAnkle from './childrenAnkle.jpg'
import childrenAnkle1 from './childrenAnkle1.jpg'
import childrenNecklace1 from './childrenNecklace1.jpg'
import childrenNecklace1_1 from './childrenNecklace1_1.jpg'
import childrenNecklace1_2 from './childrenNecklace1_2.jpg'
import loupe from './loupe.png'
import down from './down.png'
import service from './service.png'
import support from './support.png'
import trade from './trade.png'
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
    trade,
    service,
    support,
    down,
    close,
    star,
    childrenNecklace1_1,
    childrenNecklace1_2,
    childrenNecklace1,
    th123,
    download,
    OIP
}



export const products = [
    {
      id: 1,
      name: "Classic Necklace Set",
      price: 1200,
      originalPrice:2500,
      currency: '₹',
      description: "Elegant necklace set with matching earrings.",
      mainImage: [Product1, mainProduct1_1],
      images: [
        mainProduct1_1,
        mainProduct1_2,
        mainProduct1_3,
        mainProduct1_4,
      ],
      category: "Women",
      type: "Necklace",
      inStock: true,
      bestseller: true,
    },
    {
      id: 2,
      name: "Gold Plated Bangles",
      price: 800,
      originalPrice:2000,
      currency: '₹',
      description: "Stylish gold-plated bangles for every occasion.",
      mainImage: [Product2, mainProduct1_2],
      images: [
        mainProduct1_2,
        mainProduct1_3,
      ],
      category: "Women",
      type: "Bracelets",
      inStock: true,
      bestseller: false,
    },
    {
      id: 3,
      name: "Premium Earrings",
      price: 500,
      originalPrice:1500,
      currency: '₹',
      description: "Beautiful earrings for a perfect ethnic look.",
      mainImage: [Product3, mainProduct1_3],
      images: [
        mainProduct1_1,
        mainProduct1_3,
      ],
      category: "Women",
      type: "Earrings",
      inStock: false,
      bestseller: true,
    },
    {
      id: 4,
      name: "Elegant Ring",
      price: 700,
      originalPrice:1500,
      currency: '₹',
      description: "Stylish ring for a perfect look.",
      mainImage: [Product4, mainProduct1_4],
      images: [
        mainProduct1_1,
        mainProduct1_3,
      ],
      category: "Women",
      type: "Rings",
      inStock: false,
      bestseller: false,
    },

    {
      id: 10,
      name: "Premium Earrings",
      price: 500,
      originalPrice:1500,
      currency: '₹',
      description: "Beautiful earrings for a perfect ethnic look.",
      mainImage: [Product10, mainProduct1_1],
      images: [
        mainProduct1_1,
        mainProduct1_3,
      ],
      category: "Women",
      type:"Rings",
      inStock: false,
      bestseller: true,
    },
    {
      id: 17,
      name: "Premium Earrings",
      price: 500,
      originalPrice:3500,
      currency: '₹',
      description: "Beautiful earrings for a perfect ethnic look.",
      mainImage: [Product5, mainProduct1_2],
      images: [
        mainProduct1_1,
        mainProduct1_3,
      ],
      category: "Women",
      type: "anklets",
      inStock: false,
      bestseller: false,
    },
    {
      id: 6,
      name: "Premium Earrings",
      price: 500,
      originalPrice:1500,
      currency: '₹',
      description: "Beautiful earrings for a perfect ethnic look.",
      mainImage: [Product6, mainProduct1_3],
      images: [
        mainProduct1_1,
        mainProduct1_3,
      ],
      category: "Women",
      type: "Anklets",
      inStock: false,
      bestseller: true,
    },
    {
      id: 7,
      name: "Premium Earrings",
      price: 500,
      originalPrice:1700,
      currency: '₹',
      description: "Beautiful earrings for a perfect ethnic look.",
      mainImage: [Product7, mainProduct1_4],
      images: [
        mainProduct1_1,
        mainProduct1_3,
      ],
      category: "Women",
      type: "Necklace",
      inStock: false,
      bestseller: false,
    },
    {
      id: 8,
      name: "Premium Earrings",
      price: 500,
      originalPrice:2400,
      currency: '₹',
      description: "Beautiful earrings for a perfect ethnic look.",
      mainImage: [Product8, mainProduct1_1],
      images: [
        mainProduct1_1,
        mainProduct1_3,
      ],
      category: "Women",
      type: "Necklace",
      inStock: false,
      bestseller: true,
    },
    {
      id: 9,
      name: "Premium Earrings",
      price: 500,
      originalPrice:3500,
      currency: '₹',
      description: "Beautiful earrings for a perfect ethnic look.",
      mainImage: [Product9, mainProduct1_2],
      images: [
        mainProduct1_1,
        mainProduct1_3,
      ],
      category: "Women",
      type: "Bracelets",
      inStock: false,
      bestseller: false,
    },
    // {
    //   id: 15,
    //   name: "Elegant Gold Bangle Set",
    //   price: 1500,
    //   originalPrice: 2200,
    //   currency: '₹',
    //   description: "Sophisticated gold bangle set that adds a touch of luxury.",
    //   mainImage: [womenBangles1, womenBangles1_1],
    //   images: [
    //     womenBangles1,
    //     womenBangles1_1,
    //     womenBangles1_2
    //   ],
    //   category: "Women",
    //   type: "Bangles",
    //   inStock: true,
    //   bestseller: true
    // },
    // {
    //   id: 16,
    //   name: "Men's Leather Cord Necklace",
    //   price: 400,
    //   originalPrice: 600,
    //   currency: '₹',
    //   description: "Rugged and stylish leather cord necklace for men.",
    //   mainImage: [menNecklace1, menNecklace1_1],
    //   images: [
    //     menNecklace1,
    //     menNecklace1_1,
    //     menNecklace1_2
    //   ],
    //   category: "Men",
    //   type: "Necklaces",
    //   inStock: true,
    //   bestseller: false
    // },
    {
      id: 5,
      name: "Children's Unicorn Pendant Necklace",
      price: 250,
      originalPrice: 350,
      currency: '₹',
      description: "Whimsical and enchanting unicorn necklace for little girls.",
      mainImage: [childrenNecklace1, childrenNecklace1_1],
      images: [
        childrenNecklace1,
        childrenNecklace1_1,
        childrenNecklace1_2
      ],
      category: "Kids",
      type: "Necklaces",
      inStock: true,
      bestseller: true
    },
    // {
    //   id: 18,
    //   name: "Women's Elegant Pearl Bracelet",
    //   price: 600,
    //   originalPrice: 900,
    //   currency: '₹',
    //   description: "Refined and classic pearl bracelet for any occasion.",
    //   mainImage: [womenBracelet1, womenBracelet1_1],
    //   images: [
    //     womenBraclet1,
    //     womenBraclet1_1,
    //     womenBraclet1_2
    //   ],
    //   category: "Women",
    //   type: "Bracelets",
    //   inStock: true,
    //   bestseller: true
    // },
    // {
    //   id: 19,
    //   name: "Men's Titanium Signet Ring",
    //   price: 1000,
    //   originalPrice: 1500,
    //   currency: '₹',
    //   description: "Sleek and durable titanium signet ring for the modern man.",
    //   mainImage: [menRing2, menRing2_1],
    //   images: [
    //     menRing2,
    //     menRing2_1,
    //     menRing2_2
    //   ],
    //   category: "Men",
    //   type: "Rings",
    //   inStock: true,
    //   bestseller: false
    // },
    // {
    //   id: 20,
    //   name: "Children's Beaded Anklet",
    //   price: 150,
    //   originalPrice: 200,
    //   currency: '₹',
    //   description: "Colorful and playful beaded anklet for kids.",
    //   mainImage: [childrenAnklet1, childrenAnklet1_1],
    //   images: [
    //     childrenAnkle,
    //     childrenAnkle1,
    //     childrenAnkle1_2
    //   ],
    //   category: "Children",
    //   type: "Anklets",
    //   inStock: true,
    //   bestseller: true
    // },
    // {
    //   id: 21,
    //   name: "Women's Diamond Stud Earrings",
    //   price: 1800,
    //   originalPrice: 2500,
    //   currency: '₹',
    //   description: "Timeless and elegant diamond stud earrings for everyday wear.",
    //   mainImage: [womenEarrings1, womenEarrings1_1],
    //   images: [
    //     womenEarrings1,
    //     womenEarrings1_1,
    //     womenEarrings1_2
    //   ],
    //   category: "Women",
    //   type: "Earrings",
    //   inStock: true,
    //   bestseller: true
    // },
    // {
    //   id: 22,
    //   name: "Men's Leather Bracelet",
    //   price: 350,
    //   originalPrice: 500,
    //   currency: '₹',
    //   description: "Rugged and stylish leather bracelet for the modern gentleman.",
    //   mainImage: [menBracelet1, menBracelet1_1],
    //   images: [
    //     menBracelet1,
    //     menBracelet1_1,
    //     menBracelet1_2
    //   ],
    //   category: "Men",
    //   type: "Bracelets",
    //   inStock: true,
    //   bestseller: false
    // },
    // {
    //   id: 23,
    //   name: "Children's Charm Bracelet",
    //   price: 200,
    //   originalPrice: 300,
    //   currency: '₹',
    //   description: "Fun and customizable charm bracelet for kids.",
    //   mainImage: [childrenBracelet1, childrenBracelet1_1],
    //   images: [
    //     childrenBracelet1,
    //     childrenBracelet1_1,
    //     childrenBracelet1_2
    //   ],
    //   category: "Children",
    //   type: "Bracelets",
    //   inStock: true,
    //   bestseller: true
    // },
    // {
    //   id: 24,
    //   name: "Women's Delicate Chain Necklace",
    //   price: 600,
    //   originalPrice: 900,
    //   currency: '₹',
    //   description: "Minimalist and versatile chain necklace for everyday wear.",
    //   mainImage: [womenNecklace1, womenNecklace1_1],
    //   images: [
    //     womenNecklace1,
    //     womenNecklace1_1,
    //     womenNecklace1_2
    //   ],
    //   category: "Women",
    //   type: "Necklaces",
    //   inStock: true,
    //   bestseller: true
    // }
  ];
