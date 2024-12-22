import React, { useState } from 'react';
import { Mail, ArrowLeft, Check } from 'lucide-react';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const [resetError, setResetError] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    // Handle login/signup logic here
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setResetError('');
    
    try {
      // Here you would typically make an API call to your backend
      // For demo, we'll simulate a successful password reset email
      await new Promise(resolve => setTimeout(resolve, 1000));
      setResetSent(true);
    } catch (error) {
      setResetError('Failed to send reset email. Please try again.');
    }
  };

  const renderForgotPassword = () => (
    <div className="w-full">
      <button 
        onClick={() => setCurrentState('Login')}
        className="mb-6 inline-flex items-center text-gray-600 hover:text-gray-800"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Login
      </button>
      
      {resetSent ? (
        <div className="text-center">
          <div className="mb-4 mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <Check className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Check your email</h3>
          <p className="text-gray-600 mb-4">
            We've sent password reset instructions to {resetEmail}
          </p>
          <button
            onClick={() => {
              setCurrentState('Login');
              setResetSent(false);
              setResetEmail('');
            }}
            className="text-blue-600 hover:text-blue-800"
          >
            Back to Login
          </button>
        </div>
      ) : (
        <form onSubmit={handleForgotPassword} className="space-y-4">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold mb-2">Forgot Password?</h3>
            <p className="text-gray-600">
              Enter your email address and we'll send you instructions to reset your password.
            </p>
          </div>
          
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              className="w-full px-10 py-2 border border-gray-800"
              placeholder="Enter your email"
              required
            />
          </div>
          
          {resetError && (
            <p className="text-red-500 text-sm">{resetError}</p>
          )}
          
          <button
            type="submit"
            className="w-full bg-black text-white font-light py-2 hover:bg-gray-800 transition-colors"
          >
            Send Reset Instructions
          </button>
        </form>
      )}
    </div>
  );

  const renderLoginForm = () => (
    <form onSubmit={onSubmitHandler} className="w-full space-y-4">
      <div className="inline-flex items-center gap-2 mb-2">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      
      {currentState === 'Sign Up' && (
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
          required
        />
      )}
      
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        required
      />
      
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        required
      />
      
      <div className="w-full flex justify-between text-sm">
        <p
          className="cursor-pointer hover:text-gray-600"
          onClick={() => setCurrentState('ForgotPassword')}
        >
          Forgot your Password?
        </p>
        {currentState === 'Login' ? (
          <p
            className="cursor-pointer hover:text-gray-600"
            onClick={() => setCurrentState('Sign Up')}
          >
            Create Account
          </p>
        ) : (
          <p
            className="cursor-pointer hover:text-gray-600"
            onClick={() => setCurrentState('Login')}
          >
            Login Here
          </p>
        )}
      </div>
      
      <button className="w-full bg-black text-white font-light py-2 hover:bg-gray-800 transition-colors">
        {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  );

  return (
    <div className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
      {currentState === 'ForgotPassword' ? renderForgotPassword() : renderLoginForm()}
    </div>
  );
};

export default Login;