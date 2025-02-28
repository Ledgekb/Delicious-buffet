import { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

const OrdersPage = ({ userIds }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (userIds) {
      axios.get(`http://localhost:8001/orders/${userIds}`)
        .then(response => {
          const formattedOrders = response.data.map(order => ({
            ...order,
            created_at: format(new Date(order.created_at), 'yyyy-MM-dd HH:mm:ss')
          }));
          setOrders(formattedOrders);
        })
        .catch(error => {
          console.error('Error fetching orders:', error);
        });
    } else {
      console.error('User ID not found');
    }
  }, [userIds]);

  return (
    <div className="container mx-auto px-4 sm:px-0 py-8">
      <h1 className="text-3xl font-semibold mb-6">Your Ordered Items</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map(order => (
          <div key={order.order_id} className="bg-white shadow-md rounded-lg overflow-hidden transition duration-300 hover:shadow-lg hover:bg-gray-100">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-lg font-semibold">Order ID: {order.order_id}</p>
                  <p className="text-gray-600">Status: {order.status}</p>
                </div>
                <div className="text-gray-600">
                  <p>Name: {order.name}</p>
                  <p>Price: {order.price}</p>
                  <p>Date: {order.created_at}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;