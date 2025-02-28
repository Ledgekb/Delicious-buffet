import axios from "axios"
import { useNavigate } from "react-router-dom"
import Header from "./assets/components/Header"
import { Route, Routes } from "react-router-dom"
import { useEffect, useState } from "react";
import Home from './assets/pages/Home';
import Menu from './assets/pages/Menu';
import Cart from './assets/pages/Cart';
import Signup from './assets/pages/Signup';
import Login from './assets/pages/Login';
import Admin from "./assets/pages/admin";
import View from "./assets/pages/View";
import Adding from "./assets/pages/adding";
import Edit from "./assets/pages/Edit";
import EditOrder from "./assets/pages/edit_order";
import ViewOrder from "./assets/pages/view_order";
import Footer from './assets/components/Footer';
import Payment from './assets/pages/payment';
import Delivery from './assets/pages/delivery';
import Track from './assets/pages/track';

function App() {
const [cart, setCart] = useState([]);
const [warning, setWarning] = useState(false);
const [role, setRole] = useState('');
const [userId, setUserId] = useState('');
const navigate = useNavigate();

axios.defaults.withCredentials = true;

useEffect(() => {
  axios.get('http://localhost:8001/user')
    .then(res => {
      if (res.data.valid) {
        setRole(res.data.role);
        setUserId(res.data.userId);

      } else {
        navigate('/');
      }
    })
    .catch(err => console.error(err));
}, []);

// Now you can access both role and userId separately


const handleClick = (item) =>{
  // console.log(item);
  let isPresent = false;
  cart.forEach((product)=>{
    if (item.id ===product.id)
    isPresent = true;
  })
  if (isPresent){
    setWarning(true);
    setTimeout( ()=>{
      setWarning(false);
    }, 2000);
  return;
  }
setCart([...cart, item]);
}
const handleChange = (item, d) =>{
  let ind = -1;
  cart.forEach((data, index)=>{
    if (data.id === item.id)
      ind = index;
  });
  const tempArr = cart;
  tempArr[ind].amount += d;
  
  if (tempArr[ind].amount === 0)
    tempArr[ind].amount = 1;
  setCart([...tempArr])
}

  return (
    <div className="mx-w-4 mx-auto">
      <Header size={cart.length} roles={role}/>
      <div className="max-w-7xl mx-auto mt-6">
        <Routes>
          <Route path="/" element={<Home roles={role}/>} />
          <Route path="/menu" element={<Menu handleClick={handleClick} warning={warning} roles={role}  />} />
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} handleChange={handleChange} userIds={userId}/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/cart/payment" element={<Payment userId={userId}/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/admin" element={<Admin roles={role}/>} />
          <Route path="/delivery" element={<Delivery roles={role} userIds={userId}/>}/>
          <Route path='/adding' element={<Adding/>} />
          <Route path='/View/:id' element={<View />} />
          <Route path='/edit_order/:order_id' element={<EditOrder />} />
          <Route path='/view_order/:order_id/:user_id' element={<ViewOrder roles={role}/>} />
          <Route path='/edit/:id' element={<Edit />} />
          <Route path='/track' element={<Track userIds={userId}/>} />
        </Routes>
      </div>
      <Footer/>
    </div>
  )
}

export default App
