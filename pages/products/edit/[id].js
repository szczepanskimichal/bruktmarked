import { mongooseConnect } from "@/lib/mongoose";
import Layout from "@/components/layout/Layout";
import { Product } from "@/models/Product";

export default function EditProductPage({ product }) {
  return <Layout>{product && <productForm {...product} />}</Layout>;
}
export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.params;
  const product = await Product.findById(id);

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}
