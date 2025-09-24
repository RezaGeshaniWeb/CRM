"use client";
import Link from "next/link";
import { useTheme } from "@/app/context/ThemeContext";
import { HiHome } from "react-icons/hi";

export default function NotFound() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen p-6 text-center 
        ${isDark ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-800"}`}
    >
      <h1 className="text-9xl font-extrabold mb-4">404</h1>

      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="mb-6 max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>

      <Link
        href="/"
        className={`flex items-center gap-2 px-5 py-3 rounded-md text-lg font-medium transition
          ${
            isDark
              ? "bg-blue-600 hover:bg-blue-500 text-white"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
      >
        <HiHome /> Back to Home
      </Link>
    </div>
  );
}
