"use client";

import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "@/app/context/ThemeContext";
import { HiTrash, HiPencil } from "react-icons/hi";

export default function CustomerDetails({ data }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const router = useRouter();

  const deleteHandler = async () => {
    const res = await fetch(`/api/customer/${data._id}`, { method: "DELETE" });
    const json = await res.json();

    if (json.status === "success") router.push("/");
  };

  if (!data) return null;

  return (
    <div
      className={`mx-auto p-6 rounded-xl shadow-md transition 
        ${isDark ? "bg-gray-800 text-gray-200" : "bg-gray-100 text-gray-700"}`}
    >
      {/* Header */}
      <div
        className={`p-4 rounded-t-xl font-bold text-lg 
          ${
            isDark
              ? "bg-gradient-to-r from-blue-700 to-indigo-700 text-white"
              : "bg-gradient-to-r from-blue-400 to-indigo-400 text-white"
          }`}
      >
        Customer's Details
      </div>

      {/* Customer Info */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoItem label="Name" value={data.name} />
        <InfoItem label="Last Name" value={data.lastName} />
        <InfoItem label="Email" value={data.email} />
        <InfoItem label="Phone" value={data.phoneNumber || "-"} />
        <InfoItem label="Address" value={data.address || "-"} />
        <InfoItem label="Postal Code" value={data.postalCode || "-"} />
        <InfoItem
          label="Date"
          value={data.date ? moment(data.date).utc().format("YYYY-MM-DD") : "-"}
        />
      </div>

      {/* Products List */}
      <div className="p-4">
        <h4 className="font-semibold mb-2">Purchased Products</h4>
        <div
          className={`grid grid-cols-3 gap-4 font-bold 
            ${isDark ? "text-gray-300" : "text-gray-700"}`}
        >
          <p>Name</p>
          <p>Price</p>
          <p>Qty</p>
        </div>
        {data.products?.length > 0 ? (
          data.products.map((item, index) => (
            <div
              key={index}
              className={`grid grid-cols-3 gap-4 p-2 rounded-md mt-2 
                ${isDark ? "bg-gray-700" : "bg-gray-200"}`}
            >
              <p>{item.name}</p>
              <p>{item.price}</p>
              <p>{item.qty}</p>
            </div>
          ))
        ) : (
          <p className="mt-2 text-sm text-gray-500">No products found.</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-4 p-4">
        <button
          onClick={deleteHandler}
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors cursor-pointer
            ${
              isDark
                ? "bg-red-600 hover:bg-red-500 text-white"
                : "bg-red-500 hover:bg-red-600 text-white"
            }`}
        >
          <HiTrash /> Delete
        </button>
        <Link
          href={`/edit/${data._id}`}
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors 
            ${
              isDark
                ? "bg-blue-600 hover:bg-blue-500 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
        >
          <HiPencil /> Edit
        </Link>
      </div>
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div>
      <span className="font-semibold">{label}:</span>
      <p className="truncate">{value}</p>
    </div>
  );
}
