import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";
import IndexButton from "./IndexButton";

export default function UserInfoDiv() {
  return (
    <motion.div
      variants={fadeIn("down", "spring", 0.1, 1)}
      initial="hidden"
      whileInView="show"
      className="relative"
    >
      <div className="absolute inset-0 opacity-75 bg-gradient-to-r from-primary to-color-800 blur"></div>
      <div className="bg-white/60 sm:w-[500px] backdrop-blur-lg p-5 sm:p-10 rounded-xl shadow-xl">
        <h1 className="text-4xl mb-7 font-semibold text-color-800">
          Welcome guest!
        </h1>
        <div className="flex flex-col items-center gap-5">
          <h4 className="text-gray-500 text-xl">What are you up to today?</h4>
          <IndexButton
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path d="M5.566 4.657A4.505 4.505 0 0 1 6.75 4.5h10.5c.41 0 .806.055 1.183.157A3 3 0 0 0 15.75 3h-7.5a3 3 0 0 0-2.684 1.657ZM2.25 12a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3v-6ZM5.25 7.5c-.41 0-.806.055-1.184.157A3 3 0 0 1 6.75 6h10.5a3 3 0 0 1 2.683 1.657A4.505 4.505 0 0 0 18.75 7.5H5.25Z" />
              </svg>
            }
            text="See all the products"
            href="/products"
          />
        </div>
      </div>
    </motion.div>
  );
}
