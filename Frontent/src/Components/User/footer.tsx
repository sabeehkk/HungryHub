import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p className="text-lg font-bold">HungryHub</p>
          <div className="text-center md:text-left">
          <h5 className="text-lg font-bold mb-4">Follow Us</h5>
          <ul className="flex justify-center md:justify-start space-x-4">
            <li><FaFacebook/></li>
            <li><FaLinkedinIn/></li>
            <li><FaInstagram/></li>
          </ul>
        </div>
        </div>

        <div>
          <p className="text-lg font-bold mb-2">Quick Links</p>
          <ul>
            <li>
              <Link to={`/`} className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to={`/`} className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link to={`/`} className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-lg font-bold mb-2">Restaurent</p>
          <p>
            If you have a restatuerent,{" "}
            <Link to={`/restaurent/login`} className="hover:underline">
              log in here
            </Link>
            .
          </p>
        </div>
      </div>
       {/* Bottom Bar */}
    <div className="bg-gray-900 py-4">
      <div className="container mx-auto text-center text-sm">
        &copy; 2023 HungryHub. All rights reserved.
      </div>
    </div>
    </footer>
  );
};

export default Footer;
