import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';

function Edit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [values, setFormData] = useState({
        name: '',
        category: '',
        quantity: 0,
        price: 0
    });

    useEffect(() => {
        axios.get(`http://localhost:8001/view/${id}`)
            .then(res => {
                console.log(res);
                const { name, category, quantity, price } = res.data[0];
                setFormData({ name, category, quantity, price });
            })
            .catch(err => console.error(err));
    }, [id]);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`http://localhost:8001/edit/${id}`, values)
            .then(res => {
                console.log(res);
                navigate('/admin');
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="container mt-4">
        <h2 className="text-2xl font-semibold">Update Menu Item</h2>
        <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                    type="text"
                    className="w-full px-4 py-2 mt-1 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={e => setFormData({ ...values, name: e.target.value })}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                <input
                    type="text"
                    className="w-full px-4 py-2 mt-1 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
                    id="category"
                    name="category"
                    value={values.category}
                    onChange={e => setFormData({ ...values, category: e.target.value })}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
                <input
                    type="number"
                    className="w-full px-4 py-2 mt-1 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
                    id="quantity"
                    name="quantity"
                    value={values.quantity}
                    onChange={e => setFormData({ ...values, quantity: e.target.value })}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                <input
                    type="number"
                    className="w-full px-4 py-2 mt-1 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
                    id="price"
                    name="price"
                    value={values.price}
                    onChange={e => setFormData({ ...values, price: e.target.value })}
                />
            </div>
            <div className="flex space-x-2">
                <Link to="/admin" className="flex items-center justify-center w-1/2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700">
                    Back
                </Link>
                <button type="submit" className="flex items-center justify-center w-1/2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700">
                    Update
                </button>
            </div>
        </form>
    </div>
    
    );
}

export default Edit;
