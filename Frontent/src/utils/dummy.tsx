import React from 'react'
import { FaFacebook, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
    <div className="container mx-auto py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1 */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold mb-4">Explore</h2>
          <ul className="text-sm">
            <li className="mb-2"><a href="#">About Us</a></li>
            <li className="mb-2"><a href="#">Careers</a></li>
            <li className="mb-2"><a href="#">Contact Us</a></li>
          </ul>
        </div>

        {/* Column 2 */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold mb-4">Help</h2>
          <ul className="text-sm">
            <li className="mb-2"><a href="#">FAQ</a></li>
            <li className="mb-2"><a href="#">Terms & Conditions</a></li>
            <li className="mb-2"><a href="#">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold mb-4">Follow Us</h2>
          <ul className="flex justify-center md:justify-start space-x-4">
            <li><FaFacebook/></li>
            <li><FaLinkedinIn/></li>
            <li><FaInstagram/></li>
          </ul>
        </div>
      </div>
    </div>

    {/* Bottom Bar */}
    <div className="bg-gray-800 py-4">
      <div className="container mx-auto text-center text-sm">
        &copy; 2023 Yummi. All rights reserved.
      </div>
    </div>
  </footer>
  )
}

export default Footer