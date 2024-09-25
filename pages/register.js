import Layout from "@/components/layout/Layout";
import { fadeIn } from "@/utils/motion";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useEffect, useState } from "react";
import FormInput from "@/components/inputs/FormInput";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);
  const [password2, setPassword2] = useState("");
  const [password2Error, setPassword2Error] = useState(null);

  const [creatingUser, setCreatingUser] = useState(false); // Prevents multiple submissions

  useEffect(() => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // wchodzi na kazda koncowke
    if (email !== "") {
      if (!regex.test(email)) {
        setEmailError(true);
      } else {
        setEmailError(false);
      }
    } else {
      setEmailError(null);
    }
  }, [email]);

  useEffect(() => {
    if (password !== "") {
      if (password.length > 0 && password.length < 8) {
        setPasswordError(true);
      } else {
        setPasswordError(false);
      }
    } else {
      setPasswordError(null);
    }
  }, [password]);

  useEffect(() => {
    if (password2 !== "") {
      if (password2 !== password) {
        setPassword2Error(true);
      } else {
        setPassword2Error(false);
      }
    } else {
      setPassword2Error(null);
    }
  }, [password, password2]);

  return (
    <Layout>
      <div className="flex justify-center items-center h-full">
        <motion.form
          variants={fadeIn("down", "spring", 0, 1)}
          initial="hidden"
          whileInView="show"
          className="box p-4 w-[25rem]"
        >
          <FormInput
            type="email"
            label="Email"
            value={email}
            onChange={setEmail} // Fixed typo: ooChange -> onChange
            error={emailError}
            incorrect="Your email is invalid."
            correct="Your email is correct."
          />
          <FormInput
            type="password"
            label="Password"
            value={password}
            onChange={setPassword} // Fixed typo
            error={passwordError}
            incorrect="Your password is invalid."
            correct="Your password is correct."
          />
          <FormInput
            type="password"
            label="Repeat Password"
            value={password2}
            onChange={setPassword2} // Fixed typo
            error={password2Error}
            incorrect="Your passwords should match."
            correct="Your passwords are correct."
          />
          <button
            className="primary mt-3 w-full flex justify-center"
            type="submit"
            disabled={creatingUser}
          >
            Register
          </button>
          <div className="my-4 text-center text-gray-500">
            or login with provider
          </div>
          <button
            className="border border-black flex justify-center items-center gap-2 w-full"
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/" })}
          >
            <FcGoogle />
            Login with Google
          </button>
          <div className="text-center mt-5 text-gray-500 border-color-800 border-t pt-3">
            Already have an account? Login{" "}
            <Link
              href={"/login"}
              className="hover:text-primary transition-all delay-100 duration-300 hover:decoration-primary underline"
            >
              here
            </Link>
          </div>
        </motion.form>
      </div>
    </Layout>
  );
}
