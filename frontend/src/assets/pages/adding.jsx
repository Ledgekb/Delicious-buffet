import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AddMenuItemForm = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState();
  const [successMessage, setSuccessMessage] = useState("");

  const upload = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("quantity", quantity);
    formData.append("price", price);
    formData.append("file", file);
    formData.append("amount", "1"); // Adding the hidden input field for amount with a default value of one

    axios.post('http://localhost:8001/adding', formData)
      .then((res) => {
        console.log(res);
        setSuccessMessage("Upload successful!");
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="container mt-4">
      <h2 className="text-xl font-bold mb-4">Add New Menu Item</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-semibold text-gray-600">Name</label>
          <input type="text" className="block w-full px-4 py-2 mt-1 text-sm text-gray-800 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500" id="name" name="name" onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-semibold text-gray-600">Category</label>
          <input type="text" className="block w-full px-4 py-2 mt-1 text-sm text-gray-800 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500" id="category" name="category" onChange={(e) => setCategory(e.target.value)} />
        </div>
        <div className="mb-4">
          <label htmlFor="quantity" className="block text-sm font-semibold text-gray-600">Quantity</label>
          <input type="number" className="block w-full px-4 py-2 mt-1 text-sm text-gray-800 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500" id="quantity" name="quantity" onChange={(e) => setQuantity(e.target.value)} />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-semibold text-gray-600">Price</label>
          <input type="text" className="block w-full px-4 py-2 mt-1 text-sm text-gray-800 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500" id="price" name="price" onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-semibold text-gray-600">Image</label>
          <input type="file" className="block w-full px-4 py-2 mt-1 text-sm text-gray-800 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500" id="image" name="image" onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <div className="mb-4">
          <Link to="/admin" className="inline-block px-4 py-2 text-sm font-semibold text-white bg-green-500 rounded hover:bg-green-600">Back</Link>
          <button type="button" className="inline-block px-4 py-2 ml-4 text-sm font-semibold text-green-500 border border-green-500 rounded hover:text-white hover:bg-green-500 focus:outline-none focus:border-green-700 focus:ring focus:ring-green-200" onClick={upload}>Add Item</button>
        </div>
        {successMessage && <div className="text-green-500">{successMessage}</div>}
      </form>
    </div>
  );
};

export default AddMenuItemForm;
