import { useState } from "react";
import { usePathname } from "next/navigation";
import EditableImage from "./EditableImage";
import path from "path";

export default function UserForm({ user, onSubmit, setFullImage }) {
  const [userName, setUserName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [image, setImage] = useState(user?.image || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [streetAddress, setStreetAddress] = useState(user?.streetAddress || "");
  const [postalCode, setPostalCode] = useState(user?.postalCode || "");
  const [city, setCity] = useState(user?.city || "");
  const [country, setCountry] = useState(user?.country || "");

  const pathname = usePathname();

  return (
    <form
      onSubmit={(e) =>
        onSubmit(e, {
          name: userName,
          image,
          phone,
          streetAddress,
          postalCode,
          city,
          country,
        })
      }
      className={`${
        pathname.includes("account") && "flex flex-col sm:flex-row gap-5 p-3"
      }`}
    >
      <div className="flex justify-center">
        {pathname.includes("account") && (
          <EditableImage
            image={image}
            setImage={setImage}
            setFullImage={setFullImage}
          />
        )}
      </div>
      <div>
        <label>Name:</label>
        <input
          type="text"
          placeholder="e.g. John Doe"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <label>Email:</label>
        {pathname.includes("account") && (
          <input type="email" value={user?.email} disabled />
        )}
        {pathname.includes("cart") && (
          <input
            type="email"
            placeholder="e.g. johndoe@example.com"
            value={email}
            onChange={(e) => setUserName(e.target.value)}
          />
        )}

        <label>Telepohone:</label>
        <input
          type="tel"
          placeholder="e.g. 123 456 789"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        {pathname.includes("account") && (
          <button type="submit" className="mt-3 primary hidden sm:flex">
            Save all changes
          </button>
        )}
      </div>
    </form>
  );
}
