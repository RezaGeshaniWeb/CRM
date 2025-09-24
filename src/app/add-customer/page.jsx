"use client";

import { useState } from "react";
import Form from "../components/Form";
import { useRouter } from "next/navigation";
import { useTheme } from "@/app/context/ThemeContext";

export default function AddCustomerPage() {
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    postalCode: "",
    date: "",
    products: [],
  });

  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const saveHandler = async () => {
    const res = await fetch("/api/customer", {
      method: "POST",
      body: JSON.stringify({ data: form }),
      headers: { "Content-type": "application/json" },
    });

    const data = await res.json();

    if (data.status === "success") router.push("/");
  };

  const cancelHandler = () => {
    setForm({
      name: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      address: "",
      postalCode: "",
      date: "",
      products: [],
    });
    router.push("/");
  };

  return (
    <div
      className={`min-h-screen px-6 py-8 ${
        isDark ? "bg-gray-900 text-gray-200" : "bg-white text-gray-800"
      }`}
    >
      <h3 className="text-2xl font-bold mb-6">Add New Customer</h3>

      <Form form={form} setForm={setForm} />

      <div className="flex gap-4 mt-6">
        <button
          onClick={cancelHandler}
          className={`px-4 py-2 rounded-md font-medium transition-colors cursor-pointer
            ${
              isDark
                ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
        >
          Cancel
        </button>
        <button
          onClick={saveHandler}
          className={`px-4 py-2 rounded-md font-medium transition-colors cursor-pointer
            ${
              isDark
                ? "bg-blue-600 text-white hover:bg-blue-500"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
        >
          Save
        </button>
      </div>
    </div>
  );
}
