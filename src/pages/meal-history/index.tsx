import React, { useState, useEffect } from "react";
import { Button, Dialog, Typography } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { getMealHistory, deleteMeal } from "@/services/mealService";
import type { MealHistory, MealHistoryFood } from "@/services/mealService";

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

const MealHistory = () => {
  const router = useRouter();
  const [mealHistory, setMealHistory] = useState<MealHistory[]>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [mealToDelete, setMealToDelete] = useState<MealHistory | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // TODO: Replace with actual logged-in user ID
  const currentUserId = 1; // TEMPORARY: Using a hardcoded user ID for now

  useEffect(() => {
    // Fetch meal history only if userId is available
    if (currentUserId) {
      fetchMealHistory(currentUserId);
    } else {
      // Handle case where user is not logged in (e.g., redirect to login)
      setIsLoading(false); // Stop loading if no user
      // Optionally, toast.info("Please log in to view your meal history.");
      // router.push("/login"); // Example redirect
    }
  }, [currentUserId]); // Rerun effect if userId changes (e.g., after login)

  const fetchMealHistory = async (userId: number) => { // userId parameter added back
    try {
      setIsLoading(true);
      const data = await getMealHistory(userId); // Passing userId to getMealHistory
      // Assuming data is already in the correct MealHistory[] format from backend
      setMealHistory(data);
    } catch (error) {
      toast.error("Failed to fetch meal history");
      console.error(error);
      setMealHistory([]); // Clear history on error
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (mealId: number) => {
    router.push(`/meal-history/${mealId}/edit`);
  };

  const handleDeleteClick = (meal: MealHistory) => {
    setMealToDelete(meal);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (mealToDelete) {
      try {
        await deleteMeal(mealToDelete.id); // deleteMeal function might also need userId
        setMealHistory(prevMeals => prevMeals.filter(meal => meal.id !== mealToDelete.id));
        toast.success("Meal deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete meal");
        console.error(error);
      } finally {
        setDeleteModalOpen(false);
        setMealToDelete(null);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#34D399]"></div>
      </div>
    );
  }

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
      
      {mealHistory.length === 0 ? (
        <div className="text-center text-gray-400 py-8">
          No meal history found. Start tracking your meals!
        </div>
      ) : (
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
                className="bg-[#1E3A40] p-6 rounded-xl shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border border-[#34D399]/50"
              >
                {/* Summary Section */}
                <div className="flex-grow">
                  <Typography variant="h6" className="text-white mb-2">
                    {new Date(meal.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </Typography>
                  <div className="flex items-center gap-4 mb-4">
                    {/* Display TDEE Result and Calories Remaining */}
                    <Typography className="text-gray-300">
                      TDEE Result: {typeof meal.tdeeResult === 'number' ? meal.tdeeResult.toFixed(2) : '0'} kcal
                    </Typography>
                    <Typography className="text-gray-300">
                      Remaining: {typeof meal.calorieRemaining === 'number' ? meal.calorieRemaining.toFixed(2) : '0'} kcal
                    </Typography>
                    {/* Display Total Calories Consumed */}
                     <Typography className="text-gray-300">
                      Consumed: {typeof meal.totalCalories === 'number' ? meal.totalCalories.toFixed(2) : '0'} kcal
                    </Typography>
                  </div>
                  
                  {/* Foods List */}
                  <div className="mt-4">
                     {/* Removed meal type grouping */} {/* foods are now a flat list from backend */}
                      {meal.foods.map((foodItem, foodIndex) => (
                        <div key={foodIndex} className="flex items-center gap-2 text-gray-300">
                           <Typography variant="small" className="font-medium">
                            {foodItem.name}: {foodItem.calories.toFixed(2)} kcal ({foodItem.quantity} {foodItem.isCustom ? 'unit(s)' : foodItem.unit})
                          </Typography>
                         </div>
                       ))}
                   </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 flex-shrink-0">
                  {/* Edit functionality might need adjustment based on how editing a daily summary works */}
                  {/* <ButtonEdit onClick={() => handleEdit(meal.id)} /> */}
                   <ButtonDelete onClick={() => handleDeleteClick(meal)} />
                </div>

                 <DeleteModal 
                  isOpen={deleteModalOpen}
                  onClose={() => setDeleteModalOpen(false)}
                  onConfirm={handleDeleteConfirm}
                  mealDate={mealToDelete?.date ? new Date(mealToDelete.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'this meal'}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default MealHistory;