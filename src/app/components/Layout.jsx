"use client";
import Link from "next/link";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { HiHome } from "react-icons/hi";
import { ThemeProvider, useTheme } from "../context/ThemeContext";

function LayoutContent({ children }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={`flex flex-col min-h-screen ${
        isDark ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-800"
      }`}
    >
      {/* Header */}
      <header className={`${isDark ? "bg-gray-800" : "bg-white"} shadow-md`}>
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <h2
            className={`text-xl font-bold ${
              isDark ? "text-blue-400" : "text-blue-600"
            }`}
          >
            CRM
          </h2>

          <div className="flex items-center gap-4">
            {/* Add Customer Button */}
            <Link
              href="/add-customer"
              className={`px-4 py-2 text-sm font-medium rounded shadow-sm ${
                isDark
                  ? "bg-blue-600 text-white hover:bg-blue-500"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Add Customer
            </Link>

            {/* Home Button */}
            <Link
              href="/"
              className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded shadow-sm ${
                isDark
                  ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              <HiHome size={18} />
              Home
            </Link>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full cursor-pointer ${
                isDark
                  ? "bg-gray-700 text-yellow-400 hover:bg-gray-600"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {isDark ? (
                <MdOutlineLightMode size={20} />
              ) : (
                <MdOutlineDarkMode size={20} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-grow container mx-auto px-4 py-6">{children}</main>

      {/* Footer */}
      <footer
        className={`${
          isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"
        } border-t`}
      >
        <div
          className={`container mx-auto px-4 py-3 text-sm text-center ${
            isDark ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Developed By{" "}
          <span className={isDark ? "text-gray-300" : "text-gray-700"}>
            Reza Geshani
          </span>
        </div>
      </footer>
    </div>
  );
}

export default function Layout({ children }) {
  return (
    <ThemeProvider>
      <LayoutContent>{children}</LayoutContent>
    </ThemeProvider>
  );
}
