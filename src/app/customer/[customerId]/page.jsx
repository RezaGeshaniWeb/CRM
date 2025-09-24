"use client";
import CustomerDetails from "@/app/components/CustomerDetails";
import { useEffect, useState } from "react";

export default function Page({ params }) {
  const [data, setData] = useState(null);
  const [customerId, setCustomerId] = useState(null);

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

        if (mounted) {
          setCustomerId(parsed?.customerId ?? null);
        }
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

  useEffect(() => {
    if (!customerId) return;

    let mounted = true;

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
        console.error("Fetch error:", err);
      });

    return () => {
      mounted = false;
    };
  }, [customerId]);

  if (!customerId)
    return (
      <div className="flex justify-center items-center mt-10">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  if (!data)
    return (
      <div className="flex justify-center items-center mt-10">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return <CustomerDetails data={data} />;
}
