import React from 'react';
import { asset } from '../assets/assets';
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin, ArrowUpCircle } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: "#" },
    { icon: <Instagram className="w-5 h-5" />, href: "#" },
    { icon: <Twitter className="w-5 h-5" />, href: "#" },
  ];

  const companyLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Delivery", href: "/delivery" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms & Conditions", href: "/terms" },
  ];

  const contactInfo = [
    { icon: <Phone className="w-4 h-4" />, text: "+91 8427722017" },
    { icon: <Phone className="w-4 h-4" />, text: "+91 9417857266" },
    { icon: <Mail className="w-4 h-4" />, text: "sanshraymittu6@gmail.com" },
    { icon: <MapPin className="w-4 h-4" />, text: "Sector 99, Mohali, Punjab" },
  ];

  return (
    <footer className="bg-gray-50 pt-16 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <img src={asset.Logo} className="w-32" alt="Mani Jewelers Logo" />
            <p className="text-gray-600">
              Crafting timeless elegance since 1990. Experience the perfect blend of tradition and contemporary design with our exquisite jewelry collection.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow duration-300 text-gray-600 hover:text-gray-800"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Quick Links</h3>
            <ul className="space-y-3">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-gray-900 transition-colors duration-300 inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Contact Us</h3>
            <ul className="space-y-4">
              {contactInfo.map((info, index) => (
                <li key={index} className="flex items-center space-x-3 text-gray-600">
                  <span className="text-gray-400">{info.icon}</span>
                  <span>{info.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Stay Updated</h3>
            <p className="text-gray-600">
              Subscribe to our newsletter for exclusive offers and updates.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
              />
              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Mani Jewelers. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Privacy Policy</a>
              <span className="text-gray-300">|</span>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Terms of Service</a>
            </div>
            <button
              onClick={scrollToTop}
              className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all duration-300 text-gray-600 hover:text-gray-800"
            >
              <ArrowUpCircle className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;