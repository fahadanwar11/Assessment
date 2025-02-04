import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { shuffle } from "lodash";

const spring = {
  type: "spring",
  damping: 20,
  stiffness: 300,
};

export const Loader = () => {
  const [colors, setColors] = useState(initialColors);

  useEffect(() => {
    setTimeout(() => setColors(shuffle(colors)), 1000);
  }, [colors]);

  return (
    <div className="appLoader">
      <ul>
        {colors.map((background) => (
          <motion.li
            key={background}
            layout
            transition={spring}
            style={{ background }}
          />
        ))}
      </ul>
    </div>
  );
};

const initialColors = ["#ffffff", "#673ab7", "#b39ddb", "#2196f3"];
