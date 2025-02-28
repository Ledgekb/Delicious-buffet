import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home({ roles }) {
  useEffect(() => {
    // Check if the page has already been refreshed
    const isFirstVisit = sessionStorage.getItem("isFirstVisit");

    if (!isFirstVisit) {
      // If it's the first visit, reload the page
      sessionStorage.setItem("isFirstVisit", true);
      window.location.reload();
    }
  }, []);

  return (
    <div>
      <div className="relative min-h-screen flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(../public/bg-img.jpg)" }}></div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Left Content */}
        <div className="container mx-auto px-4 flex justify-center lg:justify-start relative z-10">
          <div className="lg:w-2/3">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">Welcome to Delicious Eats</h1>
            <p className="text-xl lg:text-2xl text-white mb-8">Experience the most delicious dishes from around the world, prepared by our talented chefs with love and care.</p>
            {
          roles === "driver" || roles === "admin" || roles === "visitor" ?
            <Link to="/menu" className="bg-[#8B4513] hover:bg-[#A0522D] text-white py-3 px-6 rounded-full shadow-lg font-semibold text-lg">
              Order Now
            </Link>
            :
            <Link to="/Signup" className="bg-[#8B4513] hover:bg-[#A0522D] text-white py-3 px-6 rounded-full shadow-lg font-semibold text-lg">
              Get Started
            </Link>
        }
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <section className="container mx-auto px-4 py-8 text-gray-800 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-8">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">About Us</h2>
          <p className="mb-8 leading-relaxed">At Delicious Eats, we are passionate about creating exceptional dining experiences for our customers. Our restaurant combines the finest ingredients, talented chefs, and a welcoming atmosphere to ensure every visit is memorable.</p>
          <p className="leading-relaxed">We take pride in offering a diverse menu featuring dishes inspired by cuisines from around the world. Whether you're craving a comforting bowl of pasta, a juicy steak, or a refreshing salad, we have something to satisfy every palate.</p>
        </div>
        <div className="lg:w-1/2">
          <img src="../../../public/about us buffet.jfif" alt="About Us" className="w-full h-auto rounded-lg shadow-lg" />
        </div>
      </section>

      {/* Menu Section */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-3xl lg:text-4xl font-bold mb-6">Our Menu</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Add menu items here */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src="../../../public/chocolate.jpeg" alt="Chocolate Chip Cookies" className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="font-semibold text-lg mb-2">Chocolate Chip Cookies</h3>
              <p className="text-gray-600">Crispy on the outside, chewy on the inside, these classic cookies are packed with rich chocolate chips.</p>
              <p className="text-gray-600">Price: R100</p>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src="../../../public/strawberry.jpg" alt="Strawberry Banana Smoothie" className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="font-semibold text-lg mb-2">Strawberry Banana Smoothie</h3>
              <p className="text-gray-600">A refreshing blend of ripe strawberries and bananas, perfect for a healthy start to your day.</p>
              <p className="text-gray-600">Price: R150</p>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src="../../../public/avocado.jpg" alt="Avocado Toast" className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="font-semibold text-lg mb-2">Avocado Toast</h3>
              <p className="text-gray-600">Fresh avocado spread on toasted artisan bread, topped with a hint of lemon and chili flakes.</p>
              <p className="text-gray-600">Price: R200</p>
            </div>
          </div>
        </div>
      </section>

      {/* Specials Section */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-3xl lg:text-4xl font-bold mb-6">Specials</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Add special items here */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src="../../../public/meal buffet.jfif" alt="Family Platter" className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="font-semibold text-lg mb-2">Family Platter</h3>
              <p className="text-gray-600">A generous assortment of grilled meats, vegetables, and sides, perfect for sharing with family.</p>
              <p className="text-gray-600">Price: R50</p>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src="../../../public/bg-img.jpg" alt="Platter for 2" className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="font-semibold text-lg mb-2">Platter for 2</h3>
              <p className="text-gray-600">Enjoy a delightful mix of appetizers, main courses, and desserts, specially curated for two.</p>
              <p className="text-gray-600">Price: R75</p>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src="../../../public/pizza.jpg" alt="Pizza for 3" className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="font-semibold text-lg mb-2">Pizza for 3</h3>
              <p className="text-gray-600">A large pizza loaded with your favorite toppings, enough to satisfy three hungry appetites.</p>
              <p className="text-gray-600">Price: R100</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="container mx-auto px-4 py-8 bg-gray-100">
        <div className="lg:w-2/3">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Contact Us</h2>
          <p className="mb-4">Address: 123 str, Polokwane central, Limpopo, South Africa</p>
          <p className="mb-4">Phone: +27 73 371 9228</p>
          <p className="mb-8">Email: info@deliciouseats.com</p>
          {/* Replace 'YOUR_GOOGLE_MAPS_EMBED_URL' with your actual Google Maps embed URL */}
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              className="w-full h-full"
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d233433.06807095965!2d29.155741335924077!3d-23.91118033069461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sza!4v1721289204814!5m2!1sen!2sza"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      {/* <footer className="container mx-auto px-4 py-8 text-gray-800">
        <div className="lg:w-2/3">
          <p className="text-sm">Copyright 2024 Delicious Eats. All rights reserved.</p>
        </div>
      </footer> */}
    </div>
  );
}
