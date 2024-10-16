import { useState } from "react";
import { usePathname } from "next/navigation";
import EditableImage from "./EditableImage";

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
      <div></div>
    </form>
  );
}
