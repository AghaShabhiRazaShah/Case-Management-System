import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

import hcourtBg from '../assets/hcourt.jpg';
import logo from '../assets/logo.jpg';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = login(formData.email, formData.password);
      if (result.success) {
        // ✅ CORRECTED: Login successful hone par seedha Dashboard par jayega
        navigate('/dashboard'); 
      } else {
        setError(result.message || 'Invalid email or password');
      }
    } catch (err) {
      setError(err.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full relative overflow-hidden bg-gray-900">
      {/* Background Image - Full Screen */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${hcourtBg})`,
          filter: 'blur(2px)',
          transform: 'scale(1.05)'
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
      </div>

      {/* MOBILE LAYOUT: Vertical (Top: Branding, Bottom: Form) */}
      <div className="lg:hidden relative z-10 h-full flex flex-col">
        
        {/* Top: Branding Section (40% height) */}
        <div className="flex-none flex flex-col items-center justify-center px-6 pt-8 pb-4">
          {/* Logo */}
          <img 
            src={logo} 
            alt="Logo" 
            className="w-16 h-16 rounded-full border-2 border-yellow-400 shadow-xl object-cover mb-3"
          />
          
          {/* Name */}
          <h1 className="text-2xl font-serif font-bold text-white text-center leading-tight">
            M/s Meer Ahmed Mangrio <br />& Associates
          </h1>
          
          {/* Title */}
          <p className="text-sm text-yellow-400 font-semibold mt-2">
            Advocate Supreme Court
          </p>
          
          {/* Quote */}
          <div className="mt-3 px-3 py-1.5 bg-white/10 backdrop-blur-sm border-l-2 border-yellow-400 rounded">
            <p className="text-xs text-white italic text-center">
              "Justice delayed is justice denied"
            </p>
          </div>
        </div>

        {/* Bottom: Form Section (60% height) */}
        <div className="flex-grow flex items-center justify-center px-4 pb-6">
          <div className="w-full max-w-sm">
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-5 border border-white/40">
              
              {/* Header */}
              <div className="mb-4 text-center">
                <h2 className="text-xl font-bold text-gray-900">Welcome Back</h2>
                <p className="text-gray-600 text-xs mt-1">Login to access your dashboard</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="text-gray-400 text-xs" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="block w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all text-sm"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="text-gray-400 text-xs" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="block w-full pl-9 pr-10 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all text-sm"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? <FaEyeSlash className="text-gray-400 text-xs" /> : <FaEye className="text-gray-400 text-xs" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-2">
                    <p className="text-red-600 text-xs text-center font-medium">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 px-4 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-bold rounded-lg shadow-lg transition-all disabled:opacity-50 text-sm"
                >
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </form>

              {/* Signup Link */}
              <div className="mt-3 text-center">
                <p className="text-gray-600 text-xs">
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-yellow-600 font-semibold hover:text-yellow-700">
                    Sign up here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP LAYOUT: Split (Left: Branding, Right: Form) */}
      <div className="hidden lg:flex relative z-10 w-full h-full">
        {/* Left Side - Branding */}
        <div className="w-1/2 flex flex-col justify-center px-16 xl:px-24">
          <div className="max-w-xl">
            <div className="mb-6">
              <img 
                src={logo} 
                alt="Logo" 
                className="w-24 h-24 rounded-full border-4 border-yellow-400 shadow-2xl object-cover"
              />
            </div>

            <h1 className="text-5xl font-serif font-bold text-white mb-4 leading-tight">
              M/s Meer Ahmed Mangrio <br />& Associates
            </h1>

            <p className="text-2xl text-yellow-400 mb-8 font-semibold">
              Advocate Supreme Court
            </p>

            <div className="inline-flex items-center gap-3 px-5 py-3 bg-white/10 backdrop-blur-md border-l-4 border-yellow-400 rounded-lg">
              <p className="text-lg text-white italic">
                "Justice delayed is justice denied"
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-1/2 flex items-center justify-center px-12">
          <div className="w-full max-w-md">
            <div className="backdrop-blur-xl bg-white/95 rounded-2xl shadow-2xl p-6 border border-white/40">
              
              <div className="mb-5">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Welcome Back</h2>
                <p className="text-gray-600 text-sm">Login to access your dashboard</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="text-gray-400 text-sm" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all text-sm"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="text-gray-400 text-sm" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all text-sm"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? <FaEyeSlash className="text-gray-400 text-sm" /> : <FaEye className="text-gray-400 text-sm" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-2">
                    <p className="text-red-600 text-xs text-center font-medium">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 px-4 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-bold rounded-lg shadow-lg transition-all disabled:opacity-50 text-sm"
                >
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </form>

              <div className="mt-4 text-center">
                <p className="text-gray-600 text-sm">
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-yellow-600 font-semibold hover:text-yellow-700">
                    Sign up here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;