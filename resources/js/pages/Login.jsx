import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import AppLayout from '../layouts/AppLayout';

const Login = () => {
  const [currentState, setCurrentState] = useState('Sign In');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (token) router.visit('/profile');
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('auth-token', 'dummy-token');
    localStorage.setItem(
      'user-info',
      JSON.stringify({ name, email })
    );
    router.visit('/profile');
  };

  return (
    <AppLayout>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'
      >
        <div className='inline-flex items-center gap-2 mb-2 mt-10'>
          <p className='prata-regular text-3xl'>{currentState}</p>
          <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
        </div>

        {currentState === 'Sign Up' && (
          <input
            type='text'
            className='w-full px-3 py-2 border border-gray-800'
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}

        <input
          type='email'
          className='w-full px-3 py-2 border border-gray-800'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type='password'
          className='w-full px-3 py-2 border border-gray-800'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type='submit'
          className='w-full bg-black text-white py-2 mt-2 hover:bg-gray-800 transition'
        >
          {currentState}
        </button>

        <p
          onClick={() =>
            setCurrentState(currentState === 'Sign Up' ? 'Sign In' : 'Sign Up')
          }
          className='text-sm text-gray-600 cursor-pointer underline mt-2'
        >
          {currentState === 'Sign Up'
            ? 'Already have an account? Sign In'
            : "Don't have an account? Sign Up"}
        </p>

        {currentState === 'Sign In' && (
          <p
            onClick={() => router.visit('/forgot-password')}
            className='text-sm text-gray-600 cursor-pointer underline mt-2'
          >
            Forgot your password?
          </p>
        )}
      </form>
    </AppLayout>
  );
};

export default Login;
