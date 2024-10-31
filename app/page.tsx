"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SplashScreen = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/register");
    }, 3000);
  }, []);
  return (
    <div className="flex px-4 justify-center flex-col gap-2 items-center min-h-screen">
      <motion.h1
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-5xl font-bold"
      >
        IX A
      </motion.h1>
    </div>
  );
};

export default SplashScreen;
