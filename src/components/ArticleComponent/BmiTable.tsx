import React from "react";
import { motion } from "framer-motion";

const BmiTable = () => {
  const tableVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.div
      className="overflow-x-auto max-w-md mx-auto mt-10"
      variants={tableVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.table className="min-w-full border border-gray-300 rounded-lg shadow-md">
        <motion.thead className="bg-[#34D399] text-white">
          <motion.tr variants={rowVariants}>
            <th className="px-4 py-2 text-left">BMI</th>
            <th className="px-4 py-2 text-left">Kategori</th>
          </motion.tr>
        </motion.thead>
        <motion.tbody>
          <motion.tr className="border-b" variants={rowVariants}>
            <td className="px-4 py-2">&lt; 18.5</td>
            <td className="px-4 py-2">Kurus</td>
          </motion.tr>
          <motion.tr className="border-b" variants={rowVariants}>
            <td className="px-4 py-2">18.5 – 24.9</td>
            <td className="px-4 py-2">Normal</td>
          </motion.tr>
          <motion.tr className="border-b" variants={rowVariants}>
            <td className="px-4 py-2">25 – 29.9</td>
            <td className="px-4 py-2">Kelebihan berat</td>
          </motion.tr>
          <motion.tr variants={rowVariants}>
            <td className="px-4 py-2">≥ 30</td>
            <td className="px-4 py-2">Obesitas</td>
          </motion.tr>
        </motion.tbody>
      </motion.table>
    </motion.div>
  );
};

export default BmiTable;
