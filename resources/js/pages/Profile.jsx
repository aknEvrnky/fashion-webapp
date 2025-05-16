import React from 'react';
import { useForm } from '@inertiajs/react';
import AppLayout from '../layouts/AppLayout';

const Profile = ({ auth }) => {
  const { post } = useForm();

  const handleLogout = (e) => {
    e.preventDefault();
    post('/logout');
  };

  return (
    <AppLayout>
      <div className='max-w-2xl mx-auto mt-10 p-6'>
        <h1 className='text-3xl font-bold mb-6'>Profile</h1>
        
        <div className='bg-white shadow rounded-lg p-6'>
          <div className='mb-4'>
            <h2 className='text-xl font-semibold mb-2'>Welcome, {auth.user.name}!</h2>
            <p className='text-gray-600'>{auth.user.email}</p>
          </div>

          <button
            onClick={handleLogout}
            className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition'
          >
            Logout
          </button>
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;
