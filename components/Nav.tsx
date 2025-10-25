'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-center items-center h-16 gap-1">
          <Link
            href="/"
            className={`px-8 py-3 font-semibold transition-all duration-200 ${
              isActive('/')
                ? 'bg-white text-blue-600 rounded-lg shadow-md'
                : 'text-white hover:bg-white/10 rounded-lg'
            }`}
          >
            Home
          </Link>
          <Link
            href="/dashboard"
            className={`px-8 py-3 font-semibold transition-all duration-200 ${
              isActive('/dashboard')
                ? 'bg-white text-blue-600 rounded-lg shadow-md'
                : 'text-white hover:bg-white/10 rounded-lg'
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/about"
            className={`px-8 py-3 font-semibold transition-all duration-200 ${
              isActive('/about')
                ? 'bg-white text-blue-600 rounded-lg shadow-md'
                : 'text-white hover:bg-white/10 rounded-lg'
            }`}
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}
