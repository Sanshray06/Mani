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
    back
}



export const products = [
    {
      id: 1,
      name: "Classic Necklace Set",
      price: 1200,
      currency: '₹',
      description: "Elegant necklace set with matching earrings.",
      mainImage: asset.mainProduct1,
      images: [
        mainProduct1_1,
        mainProduct1_2,
        mainProduct1_3,
        mainProduct1_4,
      ],
      category: "Jewelry",
      inStock: true,
    },
    {
      id: 2,
      name: "Gold Plated Bangles",
      price: 800,
      currency: '₹',
      description: "Stylish gold-plated bangles for every occasion.",
      mainImage: asset.mainPic,
      images: [
        mainProduct1_2,
        mainProduct1_3,
      ],
      category: "Jewelry",
      inStock: true,
    },
    {
      id: 3,
      name: "Premium Earrings",
      price: 500,
      currency: '₹',
      description: "Beautiful earrings for a perfect ethnic look.",
      mainImage: asset.mainProduct1_4,
      images: [
        mainProduct1_1,
        mainProduct1_3,
      ],
      category: "Jewelry",
      inStock: false,
    },
  ];
