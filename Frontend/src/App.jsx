
import './App.css'
import { Route , Routes } from 'react-router-dom'
import Home from './pages/home'
import About from './pages/About'
import Cart from './pages/cart'
import Collection from './pages/collection'
import Contact from './pages/contact'
import Login from './pages/login'
import Order from './pages/Order'
import Placeorder from './pages/Placeorder'
import Product from './pages/product'
import Navbar from './components/Navbar'
import SearchBar from './components/SearchBar'
import Footer from './components/Footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
 

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <SearchBar />
      <div className = 'px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] '>
        
        <Routes>
          <Route path='/'   element = {< Home/>} />
          <Route path='/About'   element = {< About/>} />
          <Route path='/Cart'   element = {< Cart/>} />
          <Route path='/Collection'   element = {<Collection/>} />
          <Route path='/Contact'   element = {<Contact/>} />
          <Route path='/Login'   element = {<Login/>} />
          <Route path='/Order'   element = {<Order/>} />
          <Route path='/Placeorder'   element = {<Placeorder/>} />
          <Route path='/Product/:productId'   element = {<Product/>} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
