import { useState, useEffect } from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [values, setValues] = useState({ 
        email: '', 
        password: '' 
    });
    const [error, setError] = useState('');
    // const [item, setItem] = useState('');
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    const handleInput = (e) => {
        setValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    useEffect(() => {
        axios.get('http://localhost:8001/home')
        .then( res => {
          if(res.data.valid){
            navigate('/');
          }else{
            navigate('/login')
          }
        })
        .catch(err => console.log(err))
      }, [])

      const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8001/login', values);
            // Check the response format from the server
            if (response.data.Login === true) {
                const { userId, username } = response.data;
                // If login attempt is successful, navigate to the desired location
                localStorage.setItem('userId', userId); // Store user ID in localStorage
                localStorage.setItem('username', username);
                navigate('/');
                window.location.reload();
            } else {
                // If login attempt fails, display an error message
                setError('Invalid email or password');
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setError('Invalid email or password');
            } else {
                setError('An error occurred. Please try again later.');
            }
        }
    }
    

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
            <div className="max-w-md w-full bg-white p-8 rounded shadow-lg">
                <h2 className="text-3xl font-bold text-center mb-4">Login</h2>
                {error && <div className="text-red-500 text-center mb-4">{error}</div>}
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
                        <input
                            id="email"
                            type="text"
                            name='email'
                            value={values.email}
                            onChange={handleInput}
                            placeholder="Enter your email"
                            className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
                        <input
                            id="password"
                            type="password"
                            name='password'
                            value={values.password}
                            onChange={handleInput}
                            placeholder="Enter your password"
                            className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="flex justify-between items-center mb-4">
                        <button
                            type="submit"
                            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-500"
                        >
                            Sign In
                        </button>
                        <Link to="/forgot-password" className="text-gray-600 text-sm">Forgot Password?</Link>
                    </div>
                    <div className="text-center">
                        <span className="text-gray-600">Don&apos;t have an account?</span>
                        <Link to="/signup" className="text-red-500 font-semibold ml-1">Sign Up</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
