import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleBookmark } from "../redux/userSlice";
import UserCard from "../components/UserCard";
import PullToRefresh from "react-pull-to-refresh";
import useSearch from "../hooks/useSearch";

function BookmarkedUser() {
  const dispatch = useDispatch();
  const bookMarkData = useSelector((state) => state.user.bookMarkData);
  const userData = useSelector((state) => state.user.userData);
  const [searchTerm, setSearchTerm] = useState("");

  const bookmarkedUsers = userData.filter((user) =>
    bookMarkData.includes(user.id)
  );

  const { filteredData, setSearch } = useSearch(bookmarkedUsers);

  const isBookmarked = (userId) => bookMarkData.includes(userId);

  const handleBookmark = (id) => {
    dispatch(toggleBookmark(id));
  };

  const fetchBookmarkedUsers = () => {
    const bookmarkedUserData = userData.filter((user) =>
      bookMarkData.includes(user.id)
    );
    return Promise.resolve(bookmarkedUserData);
  };

  const handleRefresh = async () => {
    const refreshedData = await fetchBookmarkedUsers();
  };

  useEffect(() => {
    fetchBookmarkedUsers();
  }, []);

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="container mx-auto">
        <div className="py-16 text-center text-black bg-gray-800 hero-section">
          <h1 className="text-4xl font-bold text-white">
            Your Bookmarked Users
          </h1>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setSearch(e.target.value);
              }}
              className="px-4 py-2 border border-gray-600 rounded-md focus:outline-none "
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-center">
          {filteredData.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              isBookmarked={isBookmarked}
              handleBookmark={handleBookmark}
            />
          ))}
        </div>
      </div>
    </PullToRefresh>
  );
}

export default BookmarkedUser;
