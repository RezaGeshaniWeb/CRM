import Customer from "../../models/Customer";
import Card from "./components/Card";
import connectDB from "./utils/connectDB";
import { Suspense } from "react";

export default async function Home() {
  let customers = [];

  try {
    await connectDB();

    const rawCustomers = await Customer.find().lean();

    customers = rawCustomers.map((c) => ({
      ...c,
      _id: c._id.toString(),
      createdAt: c.createdAt?.toISOString?.() ?? c.createdAt,
      updatedAt: c.updatedAt?.toISOString?.() ?? c.updatedAt,
    }));
  } catch (error) {
    console.error(error);
    return (
      <p className="text-red-600 font-medium mt-6 text-center">
        Error fetching data from the server!
      </p>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {customers.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">No customers found.</p>
      ) : (
        <Suspense
          fallback={
            <div className="flex justify-center items-center mt-10">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          }
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {customers.map((item) => (
              <Card key={item._id} customer={item} />
            ))}
          </div>
        </Suspense>
      )}
    </div>
  );
}
