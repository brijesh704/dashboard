import React from "react";

function UserCard({ user, isBookmarked, handleBookmark }) {
  return (
    <div className="w-full p-4 sm:w-1/2 md:w-1/3 lg:w-1/4">
      <div className="flex flex-col items-center border rounded-lg shadow-lg">
        <img
          src={user.avatar_url}
          alt={user.login}
          className="w-20 h-20 my-4 rounded-full"
        />
        <p className="font-semibold text-center">{user.login}</p>
        {isBookmarked(user.id) ? (
          <button
            onClick={() => handleBookmark(user.id)}
            className="px-4 py-2 mt-2 mb-2 font-semibold text-white bg-yellow-500 rounded"
          >
            Bookmarked
          </button>
        ) : (
          <button
            onClick={() => handleBookmark(user.id)}
            className="px-4 py-2 mt-2 mb-2 font-semibold text-white bg-blue-500 rounded"
          >
            Bookmark
          </button>
        )}
      </div>
    </div>
  );
}

export default UserCard;
