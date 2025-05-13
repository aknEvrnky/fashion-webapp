import React from 'react';
import Title from '../components/Title';

const Profile = () => {
  const user = {
    name: 'Mert Özkumanlar',
    email: 'mertozkumanlar@gmail.com',
    joined: 'March 2024',
    orders: 3,
  };

  const orderHistory = [
    {
      id: 'ORD-20250510-01',
      date: 'May 10, 2025',
      total: '₺1.250,00',
      status: 'Delivered',
    },
    {
      id: 'ORD-20250422-02',
      date: 'April 22, 2025',
      total: '₺840,00',
      status: 'Shipped',
    },
    {
      id: 'ORD-20250311-03',
      date: 'March 11, 2025',
      total: '₺2.300,00',
      status: 'Cancelled',
    },
  ];

  return (
    <div className="px-4 sm:px-10 py-8 max-w-5xl mx-auto">
      <Title text1="Your" text2="Profile" />

      <div className="bg-white shadow-md rounded-2xl p-6 space-y-6">
        {/* Kişisel Bilgiler */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700">Personal Information</h2>
          <p className="text-sm text-gray-500 mt-1">Basic details of your account.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <p className="font-medium">Name:</p>
            <p>{user.name}</p>
          </div>
          <div>
            <p className="font-medium">Email:</p>
            <p>{user.email}</p>
          </div>
          <div>
            <p className="font-medium">Joined:</p>
            <p>{user.joined}</p>
          </div>
          <div>
            <p className="font-medium">Total Orders:</p>
            <p>{user.orders}</p>
          </div>
        </div>

        {/* Order History */}
        <div className="pt-6 border-t border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Order History</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left border">
              <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3 border">Order ID</th>
                  <th className="px-4 py-3 border">Date</th>
                  <th className="px-4 py-3 border">Total</th>
                  <th className="px-4 py-3 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {orderHistory.map((order) => (
                  <tr key={order.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2 border">{order.id}</td>
                    <td className="px-4 py-2 border">{order.date}</td>
                    <td className="px-4 py-2 border">{order.total}</td>
                    <td className={`px-4 py-2 border font-medium ${
                      order.status === 'Delivered' ? 'text-green-600' :
                      order.status === 'Shipped' ? 'text-blue-600' :
                      'text-red-500'
                    }`}>
                      {order.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="pt-4">
          <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
