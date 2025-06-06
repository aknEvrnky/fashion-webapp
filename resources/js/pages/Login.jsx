import React from 'react';
import { useForm } from '@inertiajs/react';
import AppLayout from '../layouts/AppLayout';

const Login = () => {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('login'));
  };

  return (
    <AppLayout>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'
      >
        <div className='inline-flex items-center gap-2 mb-2 mt-10'>
          <p className='prata-regular text-3xl'>Sign In</p>
          <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
        </div>

        <div className='w-full'>
          <input
            type='email'
            className='w-full px-3 py-2 border border-gray-800'
            placeholder='Email'
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            required
          />
          {errors.email && <div className='text-red-500 text-sm mt-1'>{errors.email}</div>}
        </div>

        <div className='w-full'>
          <input
            type='password'
            className='w-full px-3 py-2 border border-gray-800'
            placeholder='Password'
            value={data.password}
            onChange={(e) => setData('password', e.target.value)}
            required
          />
          {errors.password && <div className='text-red-500 text-sm mt-1'>{errors.password}</div>}
        </div>

        <button
          type='submit'
          disabled={processing}
          className='w-full bg-black text-white py-2 mt-2 hover:bg-gray-800 transition disabled:opacity-50'
        >
          {processing ? 'Signing in...' : 'Sign In'}
        </button>

        <p className='text-sm text-gray-600 mt-2'>
          Don't have an account?{' '}
          <a href='/register' className='underline cursor-pointer'>
            Sign Up
          </a>
        </p>

        <a
          href='/forgot-password'
          className='text-sm text-gray-600 underline cursor-pointer'
        >
          Forgot your password?
        </a>
      </form>
    </AppLayout>
  );
};

export default Login;
