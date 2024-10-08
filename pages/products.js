import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/layout/ProductCard";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import axios from "axios";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import Backdrop from "@/components/Backdrop";

export default function ProductsPage({ products }) {
  const [confirm, setConfirm] = useState(false);
  const session = useSession();
  const router = useRouter();

  function handleAddClick() {
    if (session.status === "authenticated") {
      router.push("/products/new");
    } else {
      toast.error("Log in to add products.");
    }
  }

  async function handleDelete() {
    await axios.delete("/api/products/?id=" + confirm);
    toast.success("Product deleted successfully!");
    setConfirm(false);
    router.push("/products");
  }

  return (
    <>
      <AnimatePresence>
        {confirm && (
          <Backdrop handleClose={() => setConfirm(false)}>
            <h3>Are you sure you want to delete this product?</h3>
            <div className="flex gap-3 justify-center">
              <button onClick={handleDelete} className="delete">
                Yes, delete!
              </button>
              <button onClick={() => setConfirm(false)} className="cancel">
                No, cancel.
              </button>
            </div>
          </Backdrop>
        )}
      </AnimatePresence>
      <Layout>
        <div className="w-full flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <h2 className="mb-0">All products</h2>
            <button onClick={handleAddClick} className="secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5"
              >
                <path
                  fillRule="evenodd"
                  d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                  clipRule="evenodd"
                />
              </svg>
              Add a product
            </button>
          </div>
          <div className="flex flex-col sm:mx-10 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {
              session.status === "authenticated" &&
                //     loading ? (
                // 	<Spinner />
                // ) : (
                products?.length > 0 &&
                products.map((product, index) => (
                  <ProductCard
                    key={product._id}
                    index={index}
                    setConfirm={() => setConfirm(product._id)}
                    {...product}
                  />
                  // <div key={index}>{product.title}</div>
                ))
              // )
            }
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const products = await Product.find();

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
