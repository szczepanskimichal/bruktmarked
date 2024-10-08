import { useSession } from "next-auth/react";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
import CartIcon from "../icons/CartIcon";
import EditIcon from "../icons/EditIcon";
import DeleteIcon from "../icons/DeleteIcon";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";

export default function ProductCard({
  _id,
  title,
  setConfirm,
  category,
  images,
  price,
  user,
  index,
}) {
  const session = useSession();

  return (
    // prowadzi do products/edit/[id] i products/[id]
    <motion.div
      variants={fadeIn("down", "spring", 0.1 * index, 1)}
      initial="hidden"
      whileInView="show"
      className="box"
      id={index}
    >
      <div className="bg-white h-[200px] mb-2 rounded-t-lg flex justify-center items-center">
        <Link href={"/products/" + _id}>
          {images?.length > 0 ? (
            <img src={images[0]} className="max-h-[180px] rounded-lg" /> // trzymam wysokosci wszystkich obrazow w jednej wysokosci
          ) : (
            <img
              src="https://vilo.krakow.pl/wp-content/uploads/2020/07/emptyimagee.jpg"
              className="rounded-lg p-1"
            />
          )}
        </Link>
      </div>
      <div className="p-3">
        <div className="flex justify-between items-center">
          <Link href={"/products/" + _id}>
            <h3 className="text-lg hover:text-primary hover:decoration-primary decoration-gray-100 underline transition-all delay-150 duration-300">
              {title}
            </h3>
          </Link>
          {session?.data?.user.id !== user && ( // Serduszko
            <FaRegHeart className="size-5 mb-3 cursor-pointer text-red-600" />
          )}
        </div>
        <div className="flex gap-3 justify-between items-center mt-3">
          <p className="text-2xl font-bold">${price}</p>
          {session?.data?.user.id !== user ? ( // jesli jestesm zalogowany ale mogo dostac polajkowac produkt tylko innego uzytkownika
            <button className="primary">
              <CartIcon className="size-5" />
              Add to Cart
            </button>
          ) : (
            // jesli jestesm zalogowany i jestem wlascicielem produktu
            <div className="flex gap-3 items-center">
              <Link href={"/products/edit/" + _id}>
                <button className="cancel">
                  <EditIcon className="size-5" />
                </button>
              </Link>
              <button onClick={() => setConfirm(true)} className="delete">
                <DeleteIcon className="size-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
