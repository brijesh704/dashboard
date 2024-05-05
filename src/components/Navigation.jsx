import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="p-4 bg-gray-800">
      <div className="container flex items-center justify-between mx-auto">
        <ul className="flex space-x-4">
          <li>
            <Link
              to="/user"
              className="text-white transition duration-300 hover:text-pink-500"
            >
              User
            </Link>
          </li>
          <li>
            <Link
              to="/bookmarkedUser"
              className="text-white transition duration-300 hover:text-pink-500"
            >
              Bookmarked User
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
