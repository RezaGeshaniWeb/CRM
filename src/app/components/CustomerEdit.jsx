"use client";

import { useState } from "react";
import Form from "./Form";
import { useRouter } from "next/navigation";
import moment from "moment";
import { useTheme } from "@/app/context/ThemeContext";

export default function CustomerEdit({ data, id }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const router = useRouter();

  const date = data.date ? moment(data.date).utc().format("YYYY-MM-DD") : "";

  const [form, setForm] = useState({
    name: data.name,
    lastName: data.lastName,
    email: data.email,
    phoneNumber: data.phoneNumber || "",
    address: data.address || "",
    postalCode: data.postalCode || "",
    products: data.products || [],
    date,
  });

  const cancelHandler = () => router.push("/");

  const saveHandler = async () => {
    const res = await fetch(`/api/customer/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ data: form }),
      headers: { "Content-type": "application/json" },
    });
    const json = await res.json();

    if (json.status === "success") router.push("/");
  };

  return (
    <div
      className={`mx-auto p-6 rounded-xl shadow-md transition 
        ${isDark ? "bg-gray-800 text-gray-200" : "bg-gray-100 text-gray-700"}`}
    >
      {/* Header */}
      <h4
        className={`text-2xl font-bold mb-6 
          ${isDark ? "text-white" : "text-gray-900"}`}
      >
        Edit Customer
      </h4>

      {/* Form */}
      <Form form={form} setForm={setForm} />

      {/* Buttons */}
      <div className="flex gap-4 mt-6">
        <button
          onClick={cancelHandler}
          className={`px-5 py-2 rounded-md font-medium transition-colors cursor-pointer
            ${
              isDark
                ? "bg-gray-600 text-white hover:bg-gray-500"
                : "bg-gray-300 text-gray-900 hover:bg-gray-400"
            }`}
        >
          Cancel
        </button>
        <button
          onClick={saveHandler}
          className={`px-5 py-2 rounded-md font-medium transition-transform cursor-pointer 
            ${
              isDark
                ? "bg-blue-600 text-white hover:bg-blue-500"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }
            hover:scale-105`}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
