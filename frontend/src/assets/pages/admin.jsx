import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MenuTable = ({roles}) => {
  const [menuItems, setMenuItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

//fetching menu items
  useEffect(() => {
    axios.get('http://localhost:8001/admin')
      .then(response => {
        setMenuItems(response.data);
        calculateTotalItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching menu items:', error);
      });
  }, [])
  //fetching orders
  useEffect(() => {
    axios.get('http://localhost:8001/orders')
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error('Error fetching order items:', error);
      });
  }, [])
  //menu delete item
  const handleMenuDelete = (id) => {
    axios.delete(`http://localhost:8001/delete/${id}`)
        .then(() => {
            location.reload();
            setMenuItems(prevMenuItems => prevMenuItems.filter(item => item.id !== id));
        })
        .catch(err => console.log(err));
  };
   // Function to handle status change
   const handleStatusChange = (orderIndex, newStatus) => {
    // Update the status of the order in the state
    const updatedOrders = [...orders];
    updatedOrders[orderIndex].status = newStatus;
    setOrders(updatedOrders);

    // Make API call to update the status in the database
    const orderId = updatedOrders[orderIndex].order_id;
    axios.put(`http://localhost:8001/orders/${orderId}/status`, { status: newStatus })
      .then(response => {
        console.log('Status updated successfully:', response.data);
      })
      .catch(error => {
        console.error('Error updating status:', error);
      });
  };
   //order delete item
  const handleOrderDelete = (order_id) => {
    axios.delete(`http://localhost:8001/delete_order/${order_id}`)
        .then(() => {
            location.reload();
            setOrders(prevOrders => prevOrders.filter(orders => orders.order_id !== order_id));
        })
        .catch(err => console.log(err));
  };

  const calculateTotalItems = (items) => {
    const total = items.reduce((acc, curr) => acc + curr.quantity, 0);
    setTotalItems(total);
  };
 

  return (
    roles === "admin" ?
    <div className="container mt-4">
    <div className="flex justify-between items-center mb-3">
      <h2 className="text-2xl font-bold">Menu Items</h2>
      <div className="text-gray-500">Total Items: {totalItems}</div>
    </div>
    <div className="flex justify-end mb-3">
      <Link to="/adding" className="inline-block px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Add</Link>
    </div>
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items in stock</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price per Item</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {menuItems.map((item, index) => (
          <tr key={item.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
            <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
            <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
            <td className="px-6 py-4 whitespace-nowrap">{item.category}</td>
            <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
            <td className="px-6 py-4 whitespace-nowrap">R{item.price}</td>
            {/* <td className="px-6 py-4 whitespace-nowrap">{formatDateTime(item.created_at)}</td>
            <td className="px-6 py-4 whitespace-nowrap">{formatDateTime(item.updated_at)}</td> */}
            <td className="px-6 py-4 whitespace-nowrap">
              <Link to={`/edit/${item.id}`} className="inline-block px-2 py-1 mr-2 text-xs font-semibold leading-none text-white bg-blue-500 rounded hover:bg-blue-600">Edit</Link>
              <Link to={`/view/${item.id}`} className="inline-block px-2 py-1 mr-2 text-xs font-semibold leading-none text-white bg-blue-500 rounded hover:bg-blue-600">View</Link>
              <button onClick={() => handleMenuDelete(item.id)} className="inline-block px-2 py-1 text-xs font-semibold leading-none text-white bg-red-500 rounded hover:bg-red-600">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    {/* Orders Table */}
    <div>
        <h2 className="text-2xl font-bold mb-3">Orders</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items Remaining</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order, index) => (
              <tr key={order.order_id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                {/* <td className="px-6 py-4 whitespace-nowrap">{order.order_id}</td> */}
                <td className="px-6 py-4 whitespace-nowrap">{order.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.quantity - order.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap">
              <Link to={`/edit_order/${order.order_id}`} className="inline-block px-2 py-1 mr-2 text-xs font-semibold leading-none text-white bg-blue-500 rounded hover:bg-blue-600">Edit</Link>
              <Link to={`/view_order/${order.order_id}/${order.user_id}`} className="inline-block px-2 py-1 mr-2 text-xs font-semibold leading-none text-white bg-blue-500 rounded hover:bg-blue-600">View</Link>
              <button onClick={() => handleOrderDelete(order.order_id)} className="inline-block px-2 py-1 text-xs font-semibold leading-none text-white bg-red-500 rounded hover:bg-red-600">Delete</button>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    className="px-2 py-1 mr-2 text-xs font-semibold leading-none text-white bg-blue-500 rounded hover:bg-blue-600"
                    value={order.status}
                    onChange={(e) => handleStatusChange(index, e.target.value)}
                  >
                    <option value="">{order.status}</option>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="completed">Completed</option>
                    <option value="deliverd">Deliverd</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  </div>
  : <div>
    <h1>You are not authorized</h1>
  </div>
  );
};

export default MenuTable;
