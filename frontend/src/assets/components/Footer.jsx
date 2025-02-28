const Footer = () => {
  return (
    <footer className="bg-[#8B4513] text-white py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p>
              Delicious Buffet is a family-owned restaurant that has been serving the community for over 20 years. We pride ourselves on offering a wide variety of delicious dishes made with fresh, high-quality ingredients.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Opening Hours</h3>
            <ul className="space-y-2">
              <li>Monday - Friday: 11:00 AM - 9:00 PM</li>
              <li>Saturday: 12:00 PM - 10:00 PM</li>
              <li>Sunday: 12:00 PM - 8:00 PM</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li>Phone: +27 73 371 9228</li>
              <li>Email: info@deliciousbuffet.com</li>
              <li>Address: 1711 Block H, Soshanguve, Pretoria, South Africa</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-[#000]">Facebook</a>
              </li>
              <li>
                <a href="#" className="hover:text-[#000]">Twitter</a>
              </li>
              <li>
                <a href="#" className="hover:text-[#000]">Instagram</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-8 sm:mt-12 border-t border-[#000] pt-4 sm:pt-6">
        <div className="container mx-auto px-4 sm:px-0 flex justify-between items-center">
          <p>&copy; 2024 Delicious Buffet. All rights reserved.</p>
          <p>
            Designed and developed by{' '}
            <a href="#" className="hover:text-[#A0522D]">Your Company</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;