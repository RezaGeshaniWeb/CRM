"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HiOutlineTrash, HiOutlinePencil, HiOutlineEye } from "react-icons/hi";
import { useTheme } from "@/app/context/ThemeContext";

export default function Card({ customer }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const deleteHandler = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/customer/${customer._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log(data);
      if (data.status === "success") {
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`rounded-xl overflow-hidden hover:-translate-y-1 transition transform duration-200 shadow-md hover:shadow-lg
        ${isDark ? "bg-gray-800" : "bg-white"}
      `}
    >
      {/* Header with gradient */}
      <div
        className={`px-4 py-3 ${
          isDark
            ? "bg-gradient-to-r from-blue-600 to-indigo-600"
            : "bg-gradient-to-r from-blue-500 to-indigo-500"
        }`}
      >
        <p className="font-bold text-lg text-white truncate capitalize">
          {customer.name} {customer.lastName}
        </p>
        <p className="text-blue-100 text-sm truncate">{customer.email}</p>
      </div>

      {/* Actions */}
      <div className="p-4 flex items-center justify-between">
        {/* Delete */}
        <button
          onClick={deleteHandler}
          disabled={loading}
          className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium shadow-sm transition-colors cursor-pointer
            ${
              loading
                ? isDark
                  ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-red-500 text-white hover:bg-red-600"
            }
          `}
        >
          <HiOutlineTrash size={16} />
          {loading ? "Deleting..." : "Delete"}
        </button>

        {/* Edit */}
        <Link
          href={`/edit/${customer._id}`}
          className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium border transition-colors
            ${
              isDark
                ? "border-blue-400 text-blue-400 hover:bg-blue-900"
                : "border-blue-500 text-blue-500 hover:bg-blue-50"
            }
          `}
        >
          <HiOutlinePencil size={16} />
          Edit
        </Link>

        {/* Details */}
        <Link
          href={`/customer/${customer._id}`}
          className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium border transition-colors
            ${
              isDark
                ? "border-green-400 text-green-400 hover:bg-green-900"
                : "border-green-500 text-green-500 hover:bg-green-50"
            }
          `}
        >
          <HiOutlineEye size={16} />
          Details
        </Link>
      </div>
    </div>
  );
}
