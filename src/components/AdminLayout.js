// components/AdminLayout.js
import Link from 'next/link';

const AdminLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-200">
      <nav className="w-64 bg-gray-800 text-white p-4">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <ul className="mt-4">
          <li className="mt-2">
            <Link href="/admin/products">
              <p className="block p-2 rounded bg-gray-700 hover:bg-gray-600">Products</p>
            </Link>
          </li>
          <li className="mt-2">
            <Link href="/admin/orders">
              <p className="block p-2 rounded bg-gray-700 hover:bg-gray-600">Orders</p>
            </Link>
          </li>
          <li className="mt-2">
            <Link href="/">
              <p className="block p-2 rounded bg-gray-700 hover:bg-gray-600">Home</p>
            </Link>
          </li>
        </ul>
      </nav>
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
