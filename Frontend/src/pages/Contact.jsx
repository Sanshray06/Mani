import React from 'react';
import Title from '../components/Title';
import { asset } from '../assets/assets';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Us",
      details: ["GBH-202 One Rise", "Sector 99, Mohali"]
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      details: ["Tel: 9417857266"]
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      details: ["sanshraymittu6@gmail.com"]
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Business Hours",
      details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat - Sun: 10:00 AM - 4:00 PM"]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center py-12 border-t">
        <Title text1={'CONTACT'} text2={'US'} />
        <p className="mt-4 text-lg text-gray-600">We'd love to hear from you. Please get in touch!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div className="relative">
          <img 
            src={asset.th1} 
            alt="Store front" 
            className="w-full h-[400px] object-cover rounded-lg shadow-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 rounded-lg"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {contactInfo.map((info, index) => (
            <div 
              key={index}
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                  {info.icon}
                </div>
                <h3 className="font-semibold text-xl text-gray-800">{info.title}</h3>
              </div>
              {info.details.map((detail, idx) => (
                <p key={idx} className="text-gray-600 ml-12">{detail}</p>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <div className="max-w-2xl mx-auto mb-16 p-8 bg-white rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Send us a Message</h3>
        <form className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="your@email.com"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your message"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;