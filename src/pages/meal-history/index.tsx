import React, { useState } from "react";
import { Button, Dialog, Typography } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";

export function ButtonEdit({ onClick }: { onClick: () => void }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Button 
        onClick={onClick}
        className="text-[#3496D3] bg-transparent border-2 px-4 py-2 rounded-xl border-[#3496D3] hover:bg-[#3496D3]/10 transition-colors group"
      >
        <motion.div
          initial={{ rotate: 0 }}
          whileHover={{ rotate: 15 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-2"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 text-[#3496D3] group-hover:scale-110 transition-transform" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" 
            />
          </svg>
          Edit
        </motion.div>
    </Button>
    </motion.div>
  );
}

export function ButtonDelete({ onClick }: { onClick: () => void }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Button 
        onClick={onClick}
        className="text-[#D33434] bg-transparent border-2 px-4 py-2 rounded-xl border-[#D33434] hover:bg-[#D33434]/10 transition-colors group"
      >
        <motion.div
          initial={{ rotate: 0 }}
          whileHover={{ rotate: -15 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-2"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 text-[#D33434] group-hover:scale-110 transition-transform" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
            />
          </svg>
      Delete
        </motion.div>
    </Button>
    </motion.div>
  );
}

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  mealDate: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, onConfirm, mealDate }) => {
  return (
    <Dialog 
      open={isOpen} 
      handler={onClose}
      className="bg-[#132A2E] p-6 rounded-xl border border-[#D33434]"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-[#D33434]/10 flex items-center justify-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-8 w-8 text-[#D33434]" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
            />
          </svg>
        </div>

        <Typography variant="h5" className="text-white text-center">
          Delete Meal
        </Typography>

        <Typography className="text-gray-400 text-center">
          Are you sure you want to delete the meal from {mealDate}? This action cannot be undone.
        </Typography>

        <div className="flex gap-3 mt-4">
          <Button
            variant="outlined"
            onClick={onClose}
            className="text-white border-white hover:bg-white/10"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-[#D33434] text-white hover:bg-[#D33434]/90"
          >
            Delete
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

interface Food {
  name: string;
  weight: number;
  image: string;
}

interface Meal {
  id: number;
  date: string;
  calories: number;
  foods: Food[];
  caption: string;
}

const MealHistory = () => {
  const router = useRouter();
  const [mealHistory, setMealHistory] = useState<Meal[]>([
        {
            id: 1,
            date: "1 April 2025",
      calories: 1500,
      foods: [
        {
          name: "rice",
          weight: 100,
          image: "/images/rice.png",
        },
        {
          name: "Chicken Breast",
          weight: 100,
          image: "/images/breast.png",
        },
        {
          name: "Tempe",
          weight: 100,
          image: "/images/tempe.png",
        },
        {
          name: "Tofu",
          weight: 100,
          image: "/images/tofu.png",
        }
      ],
      caption: "Great Progress! You reached 78% of your goal today!",
        },
        {
            id: 2,
            date: "2 April 2025",
      calories: 1500,
      foods: [
        {
          name: "rice",
          weight: 100,
          image: "/images/rice.png",
        },
        {
          name: "Chicken Breast",
          weight: 100,
          image: "/images/breast.png",
        },
        {
          name: "Tempe",
          weight: 100,
          image: "/images/tempe.png",
        },
        {
          name: "Tofu",
          weight: 100,
          image: "/images/tofu.png",
        }
      ],
      caption: "Great Progress! You reached 78% of your goal today!",
        },
         {
            id: 3,
            date: "3 April 2025",
      calories: 1500,
      foods: [
        {
          name: "rice",
          weight: 100,
          image: "/images/rice.png",
        },
        {
          name: "Chicken Breast",
          weight: 100,
          image: "/images/breast.png",
        },
        {
          name: "Tempe",
          weight: 100,
          image: "/images/tempe.png",
        },
        {
          name: "Tofu",
          weight: 100,
          image: "/images/tofu.png",
        }
      ],
      caption: "Great Progress! You reached 78% of your goal today!",
        },
         {
            id: 4,
            date: "4 April 2025",
      calories: 1500,
      foods: [
        {
          name: "rice",
          weight: 100,
          image: "/images/rice.png",
        },
        {
          name: "Chicken Breast",
          weight: 100,
          image: "/images/breast.png",
        },
        {
          name: "Tempe",
          weight: 100,
          image: "/images/tempe.png",
        },
        {
          name: "Tofu",
          weight: 100,
          image: "/images/tofu.png",
        }
      ],
      caption: "Great Progress! You reached 78% of your goal today!",
    },
    {
      id: 5,
      date: "5 April 2025",
      calories: 1500,
      foods: [
        {
          name: "rice",
          weight: 100,
          image: "/images/rice.png",
        },
        {
          name: "Chicken Breast",
          weight: 100,
          image: "/images/breast.png",
        },
        {
          name: "Tempe",
          weight: 100,
          image: "/images/tempe.png",
        },
        {
          name: "Tofu",
          weight: 100,
          image: "/images/tofu.png",
        }
      ],
      caption: "Great Progress! You reached 78% of your goal today!",
    },
    {
      id: 6,
      date: "6 April 2025",
      calories: 1500,
      foods: [
        {
          name: "rice",
          weight: 100,
          image: "/images/rice.png",
        },
        {
          name: "Chicken Breast",
          weight: 100,
          image: "/images/breast.png",
        },
        {
          name: "Tempe",
          weight: 100,
          image: "/images/tempe.png",
        },
        {
          name: "Tofu",
          weight: 100,
          image: "/images/tofu.png",
        }
      ],
      caption: "Great Progress! You reached 78% of your goal today!",
    },
    {
      id: 7,
      date: "7 April 2025",
      calories: 1500,
      foods: [
        {
          name: "rice",
          weight: 100,
          image: "/images/rice.png",
        },
        {
          name: "Chicken Breast",
          weight: 100,
          image: "/images/breast.png",
        },
        {
          name: "Tempe",
          weight: 100,
          image: "/images/tempe.png",
        },
        {
          name: "Tofu",
          weight: 100,
          image: "/images/tofu.png",
        }
      ],
      caption: "Great Progress! You reached 78% of your goal today!",
    },
    {
      id: 8,
      date: "8 April 2025",
      calories: 1500,
      foods: [
        {
          name: "rice",
          weight: 100,
          image: "/images/rice.png",
        },
        {
          name: "Chicken Breast",
          weight: 100,
          image: "/images/breast.png",
        },
        {
          name: "Tempe",
          weight: 100,
          image: "/images/tempe.png",
        },
        {
          name: "Tofu",
          weight: 100,
          image: "/images/tofu.png",
        }
      ],
      caption: "Great Progress! You reached 78% of your goal today!",
    }
  ]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [mealToDelete, setMealToDelete] = useState<Meal | null>(null);

  const handleEdit = (mealId: number) => {
    router.push(`/meal-history/${mealId}/edit`);
  };

  const handleDeleteClick = (meal: Meal) => {
    setMealToDelete(meal);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (mealToDelete) {
      setMealHistory(prevMeals => prevMeals.filter(meal => meal.id !== mealToDelete.id));
      toast.success("Meal deleted successfully!");
      setDeleteModalOpen(false);
      setMealToDelete(null);
    }
  };

     return (
    <div className="container mx-auto px-4">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center text-3xl text-[#34D399] pt-5 pb-7 font-bold"
      >
        Meal Plan History
      </motion.h1>
      
      <div className="grid gap-4">
        <AnimatePresence mode="popLayout">
        {mealHistory.map((meal) => (
            <motion.div 
            key={meal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.3 
              }}
              className="border-2 border-[#34D399] rounded-lg p-4 mb-4 shadow-lg hover:shadow-[#34D399]/20 transition-shadow"
            >
                <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                        <h2 className="text-lg text-white font-semibold">{meal.date}</h2>
                        <p className="text-gray-500 font-bold">Calories: {meal.calories}</p>
                </motion.div>

                <motion.div 
                  className="flex gap-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <ButtonEdit onClick={() => handleEdit(meal.id)} />
                  <ButtonDelete onClick={() => handleDeleteClick(meal)} />
                </motion.div>
                </div>

              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
              {meal.foods.map((food, index) => (
                  <motion.div 
                  key={`${meal.id}-${food.name}-${index}`}
                    className="flex items-center p-3 rounded-lg hover:bg-[#34D399]/5 transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                >
                    <motion.img
                    src={food.image}
                    alt={food.name}
                    className="w-8 h-8 object-cover rounded-full"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  />
                  <div className="ml-3">
                    <p className="text-white font-medium">{food.name}</p>
                    <p className="text-gray-400 text-sm">{food.weight}g</p>
                  </div>
                  </motion.div>
              ))}
              </motion.div>

            {meal.caption && (
                <motion.div 
                  className="mt-4 p-3 bg-[#34D399]/10 rounded-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                <p className="text-[#34D399] italic">{meal.caption}</p>
                </motion.div>
            )}
            </motion.div>
        ))}
        </AnimatePresence>
      </div>

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setMealToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        mealDate={mealToDelete?.date || ""}
      />
    </div>
  );
};

export default MealHistory;