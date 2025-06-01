import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { Button, Input, Textarea } from "@material-tailwind/react";

const EditMeal = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isLoading, setIsLoading] = useState(true);
  const [mealData, setMealData] = useState({
    date: "",
    calories: "",
    foods: [] as Array<{ name: string; weight: string; image: string }>,
    caption: "",
  });

  useEffect(() => {
    if (id) {
      // Simulasi loading data
      setTimeout(() => {
        const mockData = {
          date: "2024-03-20",
          calories: "2500",
          foods: [
            { name: "Nasi Putih", weight: "100", image: "/rice.png" },
            { name: "Ayam Goreng", weight: "150", image: "/chicken.png" },
          ],
          caption: "Makan siang yang sehat",
        };
        setMealData(mockData);
        setIsLoading(false);
      }, 1000);
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Implementasi save logic
    toast.success("Meal plan berhasil diperbarui!");
    router.push("/meal-history");
  };

  const handleAddFood = () => {
    setMealData(prev => ({
      ...prev,
      foods: [...prev.foods, { name: "", weight: "", image: "/default-food.png" }]
    }));
  };

  const handleRemoveFood = (index: number) => {
    setMealData(prev => ({
      ...prev,
      foods: prev.foods.filter((_, i) => i !== index)
    }));
  };

  const handleFoodChange = (index: number, field: string, value: string) => {
    setMealData(prev => ({
      ...prev,
      foods: prev.foods.map((food, i) => 
        i === index ? { ...food, [field]: value } : food
      )
    }));
  };

  if (isLoading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
          className="w-16 h-16 border-4 border-[#34D399] border-t-transparent rounded-full"
        />
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl text-[#34D399] font-bold text-center mb-8"
      >
        Edit Meal Plan
      </motion.h1>

      <motion.form 
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div>
            <label className="block text-white mb-2">Tanggal</label>
            <Input
              type="date"
              value={mealData.date}
              onChange={(e) => setMealData(prev => ({ ...prev, date: e.target.value }))}
              className="bg-[#1F2937] border-[#34D399] text-white"
              labelProps={{
                className: "text-white",
              }}
              crossOrigin="anonymous"
            />
          </div>
          <div>
            <label className="block text-white mb-2">Kalori</label>
            <Input
              type="number"
              value={mealData.calories}
              onChange={(e) => setMealData(prev => ({ ...prev, calories: e.target.value }))}
              className="bg-[#1F2937] border-[#34D399] text-white"
              labelProps={{
                className: "text-white",
              }}
              crossOrigin="anonymous"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <label className="block text-white mb-2">Caption</label>
          <Textarea
            value={mealData.caption}
            onChange={(e) => setMealData(prev => ({ ...prev, caption: e.target.value }))}
            className="bg-[#1F2937] border-[#34D399] text-white"
            labelProps={{
              className: "text-white",
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl text-white font-semibold">Daftar Makanan</h2>
            <motion.button
              type="button"
              onClick={handleAddFood}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#34D399] text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Tambah Makanan
            </motion.button>
          </div>

          <AnimatePresence mode="popLayout">
            {mealData.foods.map((food, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="bg-[#1F2937] p-4 rounded-lg mb-4 relative group"
              >
                <motion.button
                  type="button"
                  onClick={() => handleRemoveFood(index)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </motion.button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                  <div className="flex items-center gap-4">
                    <img
                      src={food.image || "/default-food.png"}
                      alt={food.name || "Makanan"}
                      className="w-12 h-12 object-cover rounded-full"
                    />
                    <div className="flex-1">
                      <label className="block text-white mb-1">Nama Makanan</label>
                      <Input
                        type="text"
                        value={food.name}
                        onChange={(e) => handleFoodChange(index, "name", e.target.value)}
                        className="bg-[#1F2937] border-[#34D399] text-white"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        crossOrigin="anonymous"
                        containerProps={{
                          className: "min-w-0",
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-white mb-2">Berat (gram)</label>
                    <Input
                      type="number"
                      value={food.weight}
                      onChange={(e) => handleFoodChange(index, "weight", e.target.value)}
                      className="bg-[#1F2937] border-[#34D399] text-white"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      crossOrigin="anonymous"
                      containerProps={{
                        className: "min-w-0",
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div 
          className="flex justify-end gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <motion.button
            type="button"
            onClick={() => router.push("/meal-history")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 rounded-lg border-2 border-[#34D399] text-[#34D399] hover:bg-[#34D399]/10 transition-colors"
          >
            Batal
          </motion.button>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 rounded-lg bg-[#34D399] text-white hover:bg-[#34D399]/90 transition-colors"
          >
            Simpan Perubahan
          </motion.button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
};

export default EditMeal; 