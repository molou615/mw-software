import { NavLink } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import config from '../config';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: '📊', roles: ['Admin', 'Manager', 'Customer'] },
  { path: '/upload', label: 'Upload', icon: '📤', roles: ['Admin', 'Manager'] },
  { path: '/documents', label: 'Documents', icon: '📄', roles: ['Admin', 'Manager', 'Customer'] },
  { path: '/admin', label: 'Admin', icon: '⚙️', roles: ['Admin'] },
];

export default function Sidebar({ open, onClose }) {
  const { user, logout } = useAuth();

  const visibleItems = navItems.filter((item) => item.roles.includes(user?.role));

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden" onClick={onClose} />
      )}
      <aside
        className={`fixed top-0 left-0 z-30 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out ${
          open ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:z-auto`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <h1 className="text-lg font-bold text-gray-800">{config.appName}</h1>
          <button className="lg:hidden text-gray-500 hover:text-gray-700" onClick={onClose}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="mt-4">
          {visibleItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-blue-600 bg-blue-50 border-r-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`
              }
            >
              <span>{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="text-sm text-gray-500 mb-2">
            {user?.name}
            <br />
            <span className="text-xs text-gray-400">{user?.role}</span>
          </div>
          <button
            onClick={logout}
            className="w-full text-left text-sm text-red-600 hover:text-red-800 py-1"
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
