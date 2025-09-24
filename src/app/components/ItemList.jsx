import FormInput from "./FormInput";
import { useTheme } from "@/app/context/ThemeContext";

export default function ItemList({ form, setForm }) {
  const { products } = form;
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const addHandler = () => {
    setForm({
      ...form,
      products: [...products, { name: "", price: "", qty: "" }],
    });
  };

  const changeHandler = (e, index) => {
    const { name, value } = e.target;
    const newProducts = [...products];
    newProducts[index][name] = value;
    setForm({ ...form, products: newProducts });
  };

  const deleteHandler = (index) => {
    const newProducts = [...products];
    newProducts.splice(index, 1);
    setForm({ ...form, products: newProducts });
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4">Purchased Products</h3>
      <div className="flex flex-col gap-6">
        {products.map((item, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg shadow-sm transition
              ${isDark ? "bg-gray-700" : "bg-gray-200"}`}
          >
            {/* Product Name */}
            <FormInput
              name="name"
              label="Product Name"
              type="text"
              value={item.name}
              onChange={(e) => changeHandler(e, index)}
            />

            {/* Price and Quantity Row */}
            <div className="grid grid-cols-2 gap-4 mt-3">
              <FormInput
                name="price"
                label="Product Price"
                type="text"
                value={item.price}
                onChange={(e) => changeHandler(e, index)}
              />
              <FormInput
                name="qty"
                label="Product Quantity"
                type="number"
                value={item.qty}
                onChange={(e) => changeHandler(e, index)}
              />
            </div>

            {/* Remove Button */}
            <button
              onClick={() => deleteHandler(index)}
              className={`mt-4 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer
                ${
                  isDark
                    ? "bg-red-600 text-white hover:bg-red-500"
                    : "bg-red-500 text-white hover:bg-red-600"
                }`}
            >
              Remove
            </button>
          </div>
        ))}

        {/* Add Product Button */}
        <button
          onClick={addHandler}
          className={`px-4 py-2 rounded-md font-medium w-fit transition-colors cursor-pointer
            ${
              isDark
                ? "bg-green-600 text-white hover:bg-green-500"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
        >
          Add Item
        </button>
      </div>
    </div>
  );
}
