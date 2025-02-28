import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Delivery({ roles }) {
  const [orders, setOrders] = useState([]);

  // Fetching orders
  useEffect(() => {
    axios.get('http://localhost:8001/orders')
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error('Error fetching order items:', error);
      });
  }, []);

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

  return (
    roles === "driver" ? (
      <div>
        <h2 className="text-2xl font-bold mb-3">Orders</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order, index) => (
              <tr key={order.order_id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link to={`/view_order/${order.order_id}/${order.user_id}`} className="inline-block px-2 py-1 mr-2 text-xs font-semibold leading-none text-white bg-blue-500 rounded hover:bg-blue-600">View</Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    className="px-2 py-1 mr-2 text-xs font-semibold leading-none text-white bg-blue-500 rounded hover:bg-blue-600"
                    value={order.status}
                    onChange={(e) => handleStatusChange(index, e.target.value)}
                  >
                    <option value="">{order.status}</option>
                    <option value="delivering">Delivering</option>
                    <option value="deliverd">Deliverd</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <div>
        <h1>You are not authorized</h1>
      </div>
    )
  );
}

export default Delivery;
