import Backdrop from "@/components/Backdrop";
import AccountLayout from "@/components/layout/AccountLayout";
import ProductCard from "@/components/layout/ProductCard";
import axios from "axios";
import { AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function UserProductPage() {
  const session = useSession();
  const userId = session?.data?.user.id;

  const [products, setProducts] = useState([]);
  const [confirm, setConfirm] = useState(false);

  async function handleDelete() {
    await axios.delete("/api/products/?id=" + confirm);
    toast.success("Product deleted successfully");
    setConfirm(false);
    router.push("/products");
  }

  useEffect(() => {
    if (session.status === "authenticated") {
      axios.get("/api/products?userId=" + userId).then((response) => {
        setProducts(response.data);
      });
    }
  }, [userId, session]);

  return (
    <>
      <AnimatePresence>
        {confirm && (
          <Backdrop>
            <h3>Are you sure you want to delate this product?</h3>
            <div className="flex gap-3 justify-center">
              <button className="delete">Yes, delete!</button>
              <button className="">No, cancel</button>
            </div>
          </Backdrop>
        )}
      </AnimatePresence>
      <AccountLayout title="Your products">
        <div className="mt-5 flex flex-col sm:mx-10 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {products.map((product, index) => (
            <ProductCard
              {...product}
              index={index}
              setConfirm={() => setConfirm(product._id)}
            />
          ))}
        </div>
      </AccountLayout>
    </>
  );
}
