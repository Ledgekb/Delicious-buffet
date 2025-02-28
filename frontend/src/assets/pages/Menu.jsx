import { useEffect, useState } from 'react';
import axios from 'axios';

const Menu = ({ handleClick, warning, roles }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [countdown, setCountdown] = useState(null);
  const [timerID, setTimerID] = useState(null); // To keep track of the interval timer
  const [success, setSuccess] = useState('');


  useEffect(() => {
    axios.get('http://localhost:8001/admin')
      .then(res => {
        setMenuItems(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleHoursChange = (e) => {
    setHours(parseInt(e.target.value));
  };

  const handleMinutesChange = (e) => {
    setMinutes(parseInt(e.target.value));
  };

  const handleSecondsChange = (e) => {
    setSeconds(parseInt(e.target.value));
  };

  const handleDiscountPercentageChange = (e) => {
    setDiscountPercentage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert hours, minutes, and seconds to total seconds
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    // Start countdown
    startCountdown(totalSeconds);
  };

  const startCountdown = (duration) => {
    setCountdown(duration); // Set countdown duration
    const timer = setInterval(() => {
      setCountdown(prevCountdown => {
        if (prevCountdown <= 0) {
          clearInterval(timer);
          applyDiscount(); // Apply discount when countdown reaches zero
          return 0;
        }
        return prevCountdown - 1; // Decrement countdown every second
      });
    }, 1000);
    setTimerID(timer); // Save timer ID
  };

  const stopCountdown = () => {
    clearInterval(timerID); // Clear interval timer
    setCountdown(null); // Reset countdown
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Function to calculate discounted price
  const calculateDiscountedPrice = (price, discountPercentage) => {
    const discountAmount = price * (discountPercentage / 100);
    const discountedPrice = price - discountAmount;
    return discountedPrice.toFixed(2); // Round to 2 decimal places
  };

  const applyDiscount = () => {
    // Update prices in menuItems array
    const updatedMenuItems = menuItems.map(item => {
      const discountedPrice = calculateDiscountedPrice(item.price, discountPercentage);
      return { ...item, price: discountedPrice };
    });
    setMenuItems(updatedMenuItems); // Update menuItems state
  
    // Send PATCH request to update discounts on the server
    axios.patch('http://localhost:8001/updateDiscounts', updatedMenuItems)
      .then(res => {
        console.log('Discounts updated successfully:', res.data);
        setSuccess("Discounts updated successfully");
        // window.location.reload();
      })
      .catch(err => {
        console.error('Error updating discounts:', err);
      });
  };
  

  const filteredMenuItems = menuItems.filter(item => {
    return item.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="container mx-auto py-8">
      {roles === "admin" ?
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-3">Add Time and Discount Percentage</h2>
          {success && 
          (
            <div className="text-green-500 text-center mb-4">
              {success}
            </div>
          )}
          <div className="mb-3">
            <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
            <div className="flex">
              <input
                type="number"
                className="mt-1 p-2 w-1/3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm mr-2"
                id="hours"
                name="hours"
                placeholder="HH"
                min="0"
                
                onChange={handleHoursChange}
              />
              <span className="mt-1">:</span>
              <input
                type="number"
                className="mt-1 p-2 w-1/3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm mx-2"
                id="minutes"
                name="minutes"
                placeholder="MM"
                min="0"
                max="59"
                
                onChange={handleMinutesChange}
              />
              <span className="mt-1">:</span>
              <input
                type="number"
                className="mt-1 p-2 w-1/3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm ml-2"
                id="seconds"
                name="seconds"
                placeholder="SS"
                min="0"
                max="59"
                
                onChange={handleSecondsChange}
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="discountPercentage" className="block text-sm font-medium text-gray-700">Discount Percentage</label>
            <input
              type="number"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              id="discountPercentage"
              name="discountPercentage"
              placeholder="Enter discount percentage"
              value={discountPercentage}
              onChange={handleDiscountPercentageChange}
            />
          </div>

          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>

          {/* Stop button */}
          {countdown !== null && (
            <button
              onClick={stopCountdown}
              className="inline-flex justify-center ml-4 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Stop
            </button>
          )}
        </form>
        :
        <></>
      }

      {/* Display countdown */}
      {countdown !== null && (
        <div className="text-red-600 font-semibold mt-3">
          Countdown: {formatTime(countdown)}
        </div>
      )}

      {/* warning notification */}
      {warning && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Warning!</strong>
          <span className="block sm:inline"> Item already exists in the cart.</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg
              className="fill-current h-6 w-6 text-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path
                fillRule="evenodd"
                d="M14.354 5.646a.5.5 0 0 1 0 .708L10.707 10l3.647 3.646a.5.5 0 0 1-.708.708L10 10.707l-3.646 3.647a.5.5 0 1 1-.708-.708L9.293 10 5.646 6.354a.5.5 0 0 1 .708-.708L10 9.293l3.646-3.647a.5.5 0 0 1 .708 0z"
              />
            </svg>
          </span>
        </div>
      )}
      {/* ends here */}
      <h1 className="text-3xl font-bold mb-4">Menu</h1>
      <input
        type="text"
        className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-700 sm:text-sm mb-4"
        placeholder="Search Menu"
        value={searchQuery}
        onChange={handleSearch}
      />

<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
  {filteredMenuItems.map(item => (
    <div key={item.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
      <img src={`http://localhost:8001/images/${item.image}`} alt={item.name} className="w-full h-40 object-cover mb-4 rounded-t-lg" />
      <h2 className="text-xl font-bold mb-2">{item.name}</h2>
      <p className="text-gray-500 mb-2">{item.category}</p>
      <p className="text-gray-500 mb-4">Price: R{item.price}</p>
      <button
        onClick={() => handleClick(item)}
        className="bg-[#8B4513] hover:bg-[#A0522D] text-white py-3 px-6 font-semibold rounded-full focus:outline-none focus:ring focus:ring-[#A0522D] transition duration-300"
      >
        Add to Cart
      </button>
    </div>
  ))}
</div>
    </div>
  );
};

export default Menu;
