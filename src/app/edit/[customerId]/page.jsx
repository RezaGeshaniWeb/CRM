"use client";
import CustomerEdit from "@/app/components/CustomerEdit";
import { useEffect, useState } from "react";
import { useTheme } from "@/app/context/ThemeContext";

export default function CustomerEditPage({ params }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [data, setData] = useState(null);
  const [customerId, setCustomerId] = useState(null);
  const [error, setError] = useState(null);

  // Resolve params
  useEffect(() => {
    let mounted = true;

    async function resolveParams() {
      try {
        const resolved =
          typeof params?.then === "function" ? await params : params;
        const parsed =
          typeof resolved === "string"
            ? JSON.parse(resolved)
            : resolved?.value
            ? JSON.parse(resolved.value)
            : resolved;

        if (mounted) setCustomerId(parsed?.customerId ?? null);
      } catch (err) {
        console.error("Failed to resolve params:", err);
        if (mounted) setCustomerId(null);
      }
    }

    resolveParams();
    return () => {
      mounted = false;
    };
  }, [params]);

  // Fetch customer data
  useEffect(() => {
    if (!customerId) return;
    let mounted = true;

    setError(null);
    setData(null);

    fetch(`/api/customer/${customerId}`)
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`API error ${res.status}: ${text}`);
        }
        return res.json();
      })
      .then((json) => {
        if (mounted) setData(json.data);
      })
      .catch((err) => {
        setError(err.message);
        console.error("Fetch error:", err);
      });

    return () => {
      mounted = false;
    };
  }, [customerId]);

  // States
  if (!customerId)
    return (
      <p className={`p-4 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
        Resolving parameters...
      </p>
    );

  if (error)
    return (
      <p className={`p-4 ${isDark ? "text-red-400" : "text-red-600"}`}>
        Error: {error}
      </p>
    );

  if (!data)
    return (
      <div className="flex justify-center items-center mt-10">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  // Render Customer Edit Form
  return <CustomerEdit data={data} id={customerId} />;
}
