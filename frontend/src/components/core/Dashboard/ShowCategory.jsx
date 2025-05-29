import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function ShowCategory() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          "http://localhost:5000/api/v1/category/showAllCategory",
          {}, // body (empty if not required)
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.success) {
            console.log(response)
          setCategories(response.data.data); // Adjust if different structure
        } else {
          setError("Failed to load categories");
        }
      } catch (err) {
        setError("Something went wrong while fetching categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="my-10 flex flex-col gap-y-10 rounded-2xl border-[1px] border-richblack-700 bg-richblack-800 p-8 px-7 sm:px-12 max-w-3xl mx-auto">
      <p className="text-lg font-semibold text-richblack-5 mb-6">
        All Categories
      </p>

      {loading && <p className="text-richblack-400">Loading categories...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && categories.length === 0 && (
        <p className="text-richblack-400">No categories found.</p>
      )}

      <div className="flex flex-col gap-6">
        {categories.map(({ _id, name, description }) => (
          <div
            key={_id}
            className="border border-richblack-600 rounded-lg bg-richblack-900 p-4"
          >
            <p className="text-sm text-richblack-600 mb-1">Category Name</p>
            <p className="text-sm font-semibold text-richblack-5 capitalize mb-3">
              {name}
            </p>

            <p className="text-sm text-richblack-600 mb-1">Description</p>
            <p className="text-sm text-richblack-5">{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShowCategory;
