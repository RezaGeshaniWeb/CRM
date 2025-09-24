import FormInput from "./FormInput";
import ItemList from "./ItemList";
import { useTheme } from "@/app/context/ThemeContext";

export default function Form({ form, setForm }) {
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className={`p-4 rounded-md ${isDark ? "bg-gray-800" : "bg-gray-100"}`}>
      <div className="grid gap-4 md:grid-cols-2">
        <FormInput
          name="name"
          label="Name"
          type="text"
          value={form.name}
          onChange={changeHandler}
        />
        <FormInput
          name="lastName"
          label="Last Name"
          type="text"
          value={form.lastName}
          onChange={changeHandler}
        />
        <FormInput
          name="email"
          label="Email"
          type="email"
          value={form.email}
          onChange={changeHandler}
        />
        <FormInput
          name="phoneNumber"
          label="Phone Number"
          type="text"
          value={form.phoneNumber}
          onChange={changeHandler}
        />
        <FormInput
          name="address"
          label="Address"
          type="text"
          value={form.address}
          onChange={changeHandler}
        />
        <FormInput
          name="postalCode"
          label="Postal Code"
          type="text"
          value={form.postalCode}
          onChange={changeHandler}
        />
        <FormInput
          name="date"
          label="Date"
          type="date"
          value={form.date}
          onChange={changeHandler}
        />
      </div>
      <ItemList form={form} setForm={setForm} />
    </div>
  );
}
