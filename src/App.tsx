import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

function App() {
  const [isShow, setIsShow] = useState(true);
  const [isAnimate, setIsAnimate] = useState(true);

  const list = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const item = {
    visible: { opacity: 1, x: 0, color: "red" },
    hidden: { opacity: 0, x: -100 },
  };

  return (
    <div className="max-w-72 m-auto">
      <button
        onClick={() => {
          setIsShow(!isShow);
        }}
      >
        hide
      </button>
      {/* <div className="mb-[1200px]"></div> */}
      {/* <div className="mb-8">
        <AnimatePresence>
          {isShow && (
            <motion.div
              animate={{ x: 100, y: 300, background: "blue" }}
              className="w-32 h-32 border border-red-500"
              transition={{ ease: "easeOut", duration: 2 }}
              exit={{ scale: 2, opacity: 0 }}
              initial={false}
            ></motion.div>
          )}
        </AnimatePresence>
      </div> */}
      {/* <motion.div
        className="bg-blue-400 w-36 h-36"
        animate={{
          scale: [1, 3, 2, 1, 0.5],
          rotate: [0, 0, 180, 180, 0],
          borderRadius: ["0%", "0%", "50%", "50%", "0%"],
        }}
        transition={{
          duration: 5,
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1],
          repeat: Infinity,
          repeatDelay: 1,
        }}
      /> */}
      {/* <motion.circle
        cx={500}
        animate={{ cx: [null, 100, 200] }}
        transition={{ duration: 3, times: [0, 0.2, 1] }}
      /> */}
      {/* <motion.button
        className="w-32 h-32 bg-blue-500 text-green-50 "
        whileHover={{
          scale: 1.2,
          transition: { duration: 1 },
        }}
        whileTap={{ scale: 0.9 }}
        whileInView={{
          scale: [1, 3, 2, 1, 0.5],
          rotate: [0, 0, 180, 180, 0],
          borderRadius: ["0%", "0%", "50%", "50%", "0%"],

          transition: {
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            repeatDelay: 1,
          },
        }}
      >
        button
      </motion.button> */}

      <motion.ul initial="hidden" animate="visible" variants={list}>
        <motion.li variants={item}>test1</motion.li>
        <motion.li variants={item}>test2</motion.li>
        <motion.li variants={item}>test3</motion.li>
      </motion.ul>
    </div>
  );
}

export default App;
