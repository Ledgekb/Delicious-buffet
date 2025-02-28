import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const View = ({ roles }) => {
  const { order_id, user_id } = useParams();
  const [orderItem, setOrderItem] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState(null);

  // useEffect(() => {
  //   axios.get(`http://localhost:8001/view_order/${order_id}/${user_id}`)
  //     .then(res => {
  //       setOrderItem(res.data.orderItem);
  //       setPaymentDetails(res.data.paymentDetails);
  //     })
  //     .catch(err => console.error(err));
  // }, [order_id, user_id]);
  useEffect(() => {
    axios.get(`http://localhost:8001/view_order/${order_id}`)
      .then(res => {
        setOrderItem(res.data[0]);
      })
      .catch(err => console.error(err));
  }, [order_id]);
  
  useEffect(() => {
    axios.get(`http://localhost:8001/payment/${user_id}`)
      .then(res => {
        setPaymentDetails(res.data[0]);
      })
      .catch(err => console.error(err));
  }, [user_id]);
  
  // Function to convert ISO date format to a readable format
  const formatDateTime = (dateTimeString) => {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Africa/Johannesburg' // South African time zone
    };
    return new Date(dateTimeString).toLocaleString('en-ZA', options);
};


  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Order Details</h1>
      {orderItem && paymentDetails && (
        <div className="flex flex-col items-center">
          <div className="bg-gray-200 p-4 rounded shadow-md w-3/4">
            <h2 className="text-xl font-bold mb-2">{orderItem.name}</h2>
            <p className="text-gray-600 mb-2">Category: {orderItem.category}</p>
            <p className="text-gray-600 mb-2">Quantity: {orderItem.quantity}</p>
            <p className="text-gray-600 mb-2">Status: {orderItem.status}</p>
            <p className="text-gray-600 mb-2">Amount: {orderItem.amount}</p>
            <p className="text-gray-600 mb-2">Price: R{orderItem.price}</p>
            <p className="text-gray-600 mb-2">Paid: R{orderItem.price * orderItem.amount}</p>
            <p className="text-gray-600 mb-2">Created At: {formatDateTime(orderItem.created_at)}</p>
            <p className="text-gray-600 mb-2">Updated At: {formatDateTime(orderItem.updated_at)}</p>
            <div className="flex space-x-2">
              {/* Conditionally render buttons based on user roles */}
              {roles === 'admin' ? (
                <>
                  <Link to="/admin" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:bg-green-600">
                    Back
                  </Link>
                  <Link to={`/edit_order/${orderItem.order_id}`} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                    Edit
                  </Link>
                </>
              ) : (
                <Link to="/delivery" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                  Back
                </Link>
              )}
            </div>
          </div>
          <div className="bg-gray-200 p-4 rounded shadow-md w-3/4 mt-4">
            <h2 className="text-xl font-bold mb-2">Payment Details</h2>
            <p className="text-gray-600 mb-2">Payment Method: {paymentDetails.payment_method}</p>
            <p className="text-gray-600 mb-2">Address: {paymentDetails.delivery_address}</p>
            <p className="text-gray-600 mb-2">Phone: {paymentDetails.phone_number}</p>
            <p className="text-gray-600 mb-2">Transaction ID: {paymentDetails.payment_id}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default View;
