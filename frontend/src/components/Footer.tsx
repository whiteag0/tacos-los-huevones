import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-3xl">🌮</span>
              <span className="font-bold text-xl">Tacos Los Huevones</span>
            </div>
            <p className="text-gray-400">
              Authentic Mexican street food made with love in Parker, Colorado.
            </p>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-bold text-lg mb-4">Hours</h3>
            <div className="text-gray-400 space-y-1">
              <p>Monday - Saturday: 8am - 7pm</p>
              <p>Sunday: 8am - 3pm</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Find Us</h3>
            <div className="text-gray-400 space-y-2">
              <p>Parker, Colorado</p>
              <p>Near Stroh Soccer Park</p>
              <div className="flex space-x-4 mt-4">
                <a
                  href="https://www.instagram.com/huevonescafe/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-500 transition"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a
                  href="https://www.yelp.com/biz/tacos-los-huevones-parker"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-500 transition"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.16 12.594l-4.995 1.433c-.96.276-1.74-.8-1.176-1.63l2.905-4.308a1.072 1.072 0 011.596-.206 9.194 9.194 0 012.364 3.252 1.073 1.073 0 01-.694 1.459zm-3.87 5.376l-3.752-3.166c-.757-.64-.267-1.85.74-1.828l5.135.117c.58.014 1.03.496 1.012 1.078a9.234 9.234 0 01-.94 3.403 1.073 1.073 0 01-1.595.396zm-5.913 2.06l-.87-4.937c-.17-.962 1.03-1.56 1.81-.9l4.012 3.395c.45.38.492 1.063.095 1.494a9.19 9.19 0 01-3.106 2.159 1.073 1.073 0 01-1.441-.61zm-3.78-7.79c-.068-1.008 1.23-1.436 1.87-.614l3.223 4.13c.37.476.217 1.166-.31 1.47a9.2 9.2 0 01-3.628.912 1.073 1.073 0 01-1.068-1.09l-.087-4.808zm.814-3.2l4.23 2.9c.81.554.55 1.79-.394 1.87l-4.823.407c-.545.046-1.032-.36-1.092-.908a9.19 9.19 0 01.753-4.156 1.073 1.073 0 011.326-.514z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Tacos Los Huevones. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
