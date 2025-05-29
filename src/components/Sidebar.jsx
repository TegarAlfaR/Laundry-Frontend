import React from 'react';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-[#21B7E2] min-h-screen text-white p-6">
      <h2 className="text-2xl font-bold mb-6">Admin Laundry</h2>
      <nav>
        <ul>
          <li className="mb-4"><a href="#" className="hover:underline">Dashboard</a></li>
          <li className="mb-4"><a href="#" className="hover:underline font-semibold">Pesanan</a></li>
          <li className="mb-4"><a href="#" className="hover:underline">Logout</a></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
