import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Navbar = ({ size, roles }) => {
  const handleLogout = () => {
    axios.get('http://localhost:8001/logout')
      .then(res => {
        window.location.href = '/login';
      })
      .catch(error => {
        console.error('Error logging out:', error);
      });
  };

  return (
    <nav className="bg-[#8B4513] text-white py-3">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-white font-semibold text-lg">Delicious Buffet</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/" className="text-white hover:bg-[#A0522D] hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
              {
                roles === "driver" || roles === "admin" || roles === "visitor" &&
                <Link to="/menu" className="text-white hover:bg-[#A0522D] hover:text-white px-3 py-2 rounded-md text-sm font-medium">Menu</Link>
              }
              {
                roles === "admin" &&
                <Link to="/admin" className="text-white hover:bg-[#A0522D] hover:text-white px-3 py-2 rounded-md text-sm font-medium">Dashboard</Link>
              }
              {
                roles === "driver" &&
                <Link to="/delivery" className="text-white hover:bg-[#A0522D] hover:text-white px-3 py-2 rounded-md text-sm font-medium">Deliveries</Link>
              }
            </div>
          </div>
          <div className="hidden sm:flex sm:items-center sm:ml-6">
            {
              roles === "driver" || roles === "admin" || roles === "visitor" &&
              <>
                <Link to="/Cart" className="text-white hover:bg-[#A0522D] hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
                  <FaShoppingCart className="mr-2" />
                  <span>{size}</span>
                </Link>
                <Link to="/track" className="text-white hover:bg-[#A0522D] hover:text-white px-3 py-2 rounded-md text-sm font-medium">My Orders</Link>
              </>
            }
            {
              !roles ? (
                <Link to="/login" className="text-white hover:bg-[#A0522D] hover:text-white px-3 py-2 rounded-md text-sm font-medium">Sign in</Link>
              ) : (
                <button onClick={handleLogout} className="text-white hover:bg-[#A0522D] hover:text-white px-3 py-2 rounded-md text-sm font-medium">Sign out</button>
              )
            }
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;