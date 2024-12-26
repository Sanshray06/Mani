import { useContext, useState , useEffect} from 'react';
import { Mail, ArrowLeft, Check } from 'lucide-react';
import { ShopContext } from '../context/shopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const [resetError, setResetError] = useState('');

  useEffect(() => {
    if(token){
      navigate('/')
    }
  })

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      let response;

      if (currentState === 'Sign Up') {
        response = await axios.post(`http://localhost:4000/api/user/register`, { name, email, password });
      } else {
        response = await axios.post(`http://localhost:4000/api/user/login`, { email, password });
      }

      if (response.data.success) {
        const { token } = response.data;
        setToken(token);
        localStorage.setItem('token', token);
        toast.success(`${currentState === 'Sign Up' ? 'Registered' : 'Logged in'} successfully!`);
        navigate('/'); // Replace '/dashboard' with your desired route after login
      } else {
        toast.error(response.data.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again later.');
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setResetError('');

    try {
      await axios.post(`${backendUrl}/api/user/forgot-password`, { email: resetEmail });
      setResetSent(true);
      toast.success('Password reset instructions sent. Check your email.');
    } catch (error) {
      console.error('Error:', error);
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

          {resetError && <p className="text-red-500 text-sm">{resetError}</p>}

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
          name = "name"
          autoComplete="name"
          required
        />
      )}

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        name="email"
        autoComplete="email"
        required
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        name="password"
        autoComplete="password"
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
