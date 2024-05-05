import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUser, toggleBookmark } from "../redux/userSlice";
import UserCard from "../components/UserCard";
import PullToRefresh from "react-pull-to-refresh";
import useSearch from "../hooks/useSearch";
import { produce } from "immer";
import { Pagination } from "@mui/material";

function User() {
  const dispatch = useDispatch();
  const { userData, status, bookMarkData } = useSelector((state) => state.user);
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 12;

  useEffect(() => {
    dispatch(fetchAllUser());
  }, [dispatch]);

  const { filteredData, setSearch } = useSearch(userData);

  const pageCount = Math.ceil(filteredData.length / usersPerPage);

  const handlePageChange = (event, value) => {
    setPageNumber(value - 1);
  };

  const offset = pageNumber * usersPerPage;
  const currentPageData = filteredData.slice(offset, offset + usersPerPage);
  const isBookmarked = (userId) => bookMarkData.includes(userId);

  const handleBookmark = (id) => {
    dispatch(toggleBookmark(id));
  };

  const handleRefresh = () => {
    dispatch(fetchAllUser());
  };

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="container mx-auto">
        <div className="py-16 text-center text-white bg-gray-800 hero-section">
          <h1 className="text-4xl font-bold">Welcome to User Management</h1>
          <p className="mt-4">Search and manage users easily.</p>
        </div>
        <div className="flex items-center justify-center my-4 ">
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border border-gray-600 rounded-md focus:outline-none "
          />
        </div>
        <div className="flex flex-wrap justify-center">
          {status === "loading" ? (
            <div className="spinner"></div>
          ) : (
            produce(currentPageData, (draft) => {
              if (status === "failed") {
                draft.push({ id: -2, name: "Failed to fetch users." });
              }
            }).map((user) => (
              <UserCard
                key={user.id}
                user={user}
                isBookmarked={isBookmarked}
                handleBookmark={handleBookgitmark}
              />
            ))
          )}
        </div>
        <div className="flex justify-center mt-8">
          <Pagination
            count={pageCount}
            page={pageNumber + 1}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
          />
        </div>
      </div>
    </PullToRefresh>
  );
}

export default User;
