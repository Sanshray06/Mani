import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';

const NewsletterBox = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setStatus('loading');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStatus('success');
      setEmail('');
    } catch (error) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg mb-4">
        <div className="text-center space-y-4">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
          <h3 className="text-2xl font-semibold text-gray-800">Thank you for subscribing!</h3>
          <p className="text-gray-600">
            Welcome to our community! We're excited to share our latest updates and exclusive content with you.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg mb-4">
      <div className="text-center space-y-6">
        <h2 className="text-3xl font-semibold text-gray-800">
          Stay in the Loop
        </h2>
        
        <p className="text-gray-600 max-w-lg mx-auto">
          Join our newsletter to receive the latest updates, exclusive content, and insider news delivered directly to your inbox.
        </p>

        <form onSubmit={onSubmitHandler} className="max-w-md mx-auto space-y-4">
          <div className="relative">
            <input
              className={`w-full px-4 py-3 border-2 rounded-lg outline-none transition-all duration-300
                ${status === 'error' ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'}
                pr-12`}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              disabled={status === 'loading'}
            />
            <Send className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>

          {status === 'error' && (
            <div className="flex items-center gap-2 text-red-500 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>Something went wrong. Please try again.</span>
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className={`w-full bg-black text-white py-3 rounded-lg font-medium
              transition-all duration-300 transform hover:bg-gray-800
              ${status === 'loading' ? 'opacity-75 cursor-not-allowed' : 'hover:-translate-y-0.5'}`}
          >
            {status === 'loading' ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Subscribing...</span>
              </div>
            ) : (
              'Subscribe to Newsletter'
            )}
          </button>
        </form>

        <p className="text-sm text-gray-500 max-w-sm mx-auto">
          By subscribing, you agree to receive email communications from us. 
          Don't worry, we respect your privacy.
        </p>
      </div>
    </div>
  );
};

export default NewsletterBox;