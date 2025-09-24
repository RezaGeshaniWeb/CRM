import { useTheme } from "@/app/context/ThemeContext";

export default function FormInput({ name, label, type, value, onChange }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-semibold">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        id={name}
        name={name}
        className={`px-3 py-2 rounded-md border focus:outline-none focus:ring-2 transition
          ${
            isDark
              ? "bg-gray-700 border-gray-600 text-gray-200 focus:ring-blue-500"
              : "bg-white border-gray-300 text-gray-800 focus:ring-blue-400"
          }`}
      />
    </div>
  );
}
