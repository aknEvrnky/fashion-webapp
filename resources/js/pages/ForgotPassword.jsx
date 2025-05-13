import React, { useState } from 'react';
import AppLayout from '../layouts/AppLayout';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleReset = (e) => {
    e.preventDefault();
    alert(`Password reset link sent to ${email}`);
  };

  return (
    <AppLayout>
      <form
        onSubmit={handleReset}
        className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'
      >
        <div className='inline-flex items-center gap-2 mb-2 mt-10'>
          <p className='prata-regular text-3xl'>Forgot Password</p>
          <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
        </div>

        <input
          type='email'
          className='w-full px-3 py-2 border border-gray-800'
          placeholder='Enter your email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type='submit'
          className='w-full bg-black text-white py-2 hover:bg-gray-800 transition'
        >
          Send Reset Link
        </button>
      </form>
    </AppLayout>
  );
};

export default ForgotPassword;
