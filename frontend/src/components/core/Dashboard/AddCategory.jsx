import React, { useState } from "react";
import axios from "axios";
import IconBtn from "../../common/IconBtn";
import { RiEditBoxLine } from "react-icons/ri";
import { useSelector } from "react-redux";

function AddCategory() {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);

  const handleSaveCategory = async () => {
    console.log("Might is right");
    if (!categoryName.trim() || !categoryDescription.trim()) {
      alert("Both fields are required.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/v1/category/createCategory",
        {
          token,
          name: categoryName,
          description: categoryDescription,
        }
      );

      if (response.data.success) {
        alert("✅ Category saved successfully!");
        setCategoryName("");
        setCategoryDescription("");
      } else {
        alert("❌ Failed to save category");
      }
    } catch (error) {
      console.error("API Error:", error);
      alert("❌ Something went wrong while saving the category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="my-10 flex flex-col gap-y-10 rounded-2xl border-[1px] border-richblack-700 bg-richblack-800 p-8 px-7 sm:px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">Add Category</p>
          <IconBtn
            text={loading ? "Saving..." : "Save"}
            onclick={handleSaveCategory}
            disabled={loading}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>

        <div className="flex max-w-[500px] justify-between">
          <div className="flex flex-col gap-y-5 w-full">
            <div>
              <p className="mb-2 text-sm text-richblack-600">Category Name</p>
              <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Enter category name"
                className="w-full rounded-lg bg-richblack-700 p-2 text-richblack-5 text-sm outline-none border border-richblack-600"
              />
            </div>

            <div>
              <p className="mb-2 text-sm text-richblack-600">
                Category Description
              </p>
              <textarea
                value={categoryDescription}
                onChange={(e) => setCategoryDescription(e.target.value)}
                placeholder="Enter category description"
                rows={4}
                className="w-full rounded-lg bg-richblack-700 p-2 text-richblack-5 text-sm outline-none border border-richblack-600 resize-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCategory;
