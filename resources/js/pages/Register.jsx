import React from 'react';
import {Link, useForm} from '@inertiajs/react';
import AppLayout from '../layouts/AppLayout';

const Register = () => {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/register');
  };

  return (
    <AppLayout>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'
      >
        <div className='inline-flex items-center gap-2 mb-2 mt-10'>
          <p className='prata-regular text-3xl'>Sign Up</p>
          <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
        </div>

        <div className='w-full'>
          <input
            type='text'
            className='w-full px-3 py-2 border border-gray-800'
            placeholder='Name'
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            required
          />
          {errors.name && <div className='text-red-500 text-sm mt-1'>{errors.name}</div>}
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

        <div className='w-full'>
          <input
            type='password'
            className='w-full px-3 py-2 border border-gray-800'
            placeholder='Confirm Password'
            value={data.password_confirmation}
            onChange={(e) => setData('password_confirmation', e.target.value)}
            required
          />
        </div>

        <button
          type='submit'
          disabled={processing}
          className='w-full bg-black text-white py-2 mt-2 hover:bg-gray-800 transition disabled:opacity-50'
        >
          {processing ? 'Signing up...' : 'Sign Up'}
        </button>

        <p className='text-sm text-gray-600 mt-2'>
          Already have an account?{' '}
          <Link href={route('login')} className='underline cursor-pointer'>
            Sign In
          </Link>
        </p>
      </form>
    </AppLayout>
  );
};

export default Register;
