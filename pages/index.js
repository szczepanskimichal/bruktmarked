import { Inter } from "next/font/google";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Layout>
      <div className="w-full h-full flex justify-center items-center">
        <motion.div
          variants={fadeIn("right", "spring", 0.5, 1)}
          initial="hidden"
          whileInView="show"
          className="fixed bottom-0 left-[200px] w-[400px]"
        >
          <img src="1.png" alt="nike" />
        </motion.div>
        <motion.div
          variants={fadeIn("left", "spring", 0.7, 1)}
          initial="hidden"
          whileInView="show"
          className="fixed top-[50px] right-[200px]"
        >
          <img src="2.png" alt="nike" className="w-[400px]" />
        </motion.div>
      </div>
    </Layout>
  );
}
