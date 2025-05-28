import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} CityCare. All rights reserved.
        </p>
        <ul className="flex justify-center space-x-6 mt-4">
          <li>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              Privacy Policy
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              Terms of Service
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              Contact Us
            </a>
          </li>
        </ul>

      <div className='mt-2 hover:underline'>
      <Link to="/Office">Officers Login</Link>
      </div>
      </div>
    </footer>
  );
};

export default Footer;