import React from "react";
import { motion } from "framer-motion";

const AktivitasTable = () => {
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
            <th className="px-4 py-2 text-left">Level Aktivitas</th>
            <th className="px-4 py-2 text-left">Deskripsi</th>
            <th className="px-4 py-2 text-left">Faktor</th>
          </motion.tr>
        </motion.thead>
        <motion.tbody>
          <motion.tr className="border-b" variants={rowVariants}>
            <td className="px-4 py-2">Sedentary</td>
            <td className="px-4 py-2">Hampir tidak berolahraga</td>
            <td className="px-4 py-2">1.2</td>
          </motion.tr>
          <motion.tr className="border-b" variants={rowVariants}>
            <td className="px-4 py-2">Lightly Active</td>
            <td className="px-4 py-2">Olahraga ringan 1-3x/minggu</td>
            <td className="px-4 py-2">1.375</td>
          </motion.tr>
          <motion.tr className="border-b" variants={rowVariants}>
            <td className="px-4 py-2">Moderately Active</td>
            <td className="px-4 py-2">Olahraga sedang 3-5x/minggu</td>
            <td className="px-4 py-2">1.55</td>
          </motion.tr>
          <motion.tr className="border-b" variants={rowVariants}>
            <td className="px-4 py-2">Very Active</td>
            <td className="px-4 py-2">Olahraga berat 6-7x/minggu</td>
            <td className="px-4 py-2">1.725</td>
          </motion.tr>
          <motion.tr variants={rowVariants}>
            <td className="px-4 py-2">Extra Active</td>
            <td className="px-4 py-2">Olahraga sangat berat, pekerja fisik</td>
            <td className="px-4 py-2">1.9</td>
          </motion.tr>
        </motion.tbody>
      </motion.table>
    </motion.div>
  );
};

export default AktivitasTable;
