import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-teal rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <span className="text-xl font-semibold text-dark-gray">CityCare</span>
            </div>
            <p className="text-gray-600 mb-4 max-w-md">
              Making cities better, one complaint at a time. Your voice matters in building a better community.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-text mb-4">Citizens</h4>
            <ul className="space-y-2 text-gray-600">
              <li><Link to="/login" className="text-mid-gray hover:text-teal transition-colors">Login</Link></li>
              <li><Link to="/register" className="text-mid-gray hover:text-teal transition-colors">Register</Link></li>
              <li><Link to="/complaint" className="text-mid-gray hover:text-teal transition-colors">Raise Complaint</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-text mb-4">Staff Access</h4>
            <ul className="space-y-2 text-gray-600">
              <li><Link to="/officer/login" className="text-mid-gray hover:text-teal transition-colors">Officer Login</Link></li>
              <li><Link to="/admin/login" className="text-mid-gray hover:text-teal transition-colors">Admin Login</Link></li>
              <li><a href="#" className="text-mid-gray hover:text-teal transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-mid-gray hover:text-teal transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-mid-gray">&copy; 2024 CityCare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
