import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@material-tailwind/react";
import MealCard from '@/components/meals/MealCard';
import EditMealModal from "@/components/meals/EditMealModal";
import { toast } from "react-toastify";
import { Meal } from "@/data/mealHistoryData";
import { mealService } from "@/services/mealService";

export function ButtonEdit() {
  return (
    <Button className="text-[#3496D3] bg-transparent border-2 px-4 py-2 rounded-xl border-[#3496D3] hover:bg-[#3496D3]/10 transition-colors">
      Edit
    </Button>
  );
}

export function ButtonDelete() {
  return (
    <Button className="text-[#D33434] bg-transparent border-2 px-4 py-2 rounded-xl border-[#D33434] hover:bg-[#D33434]/10 transition-colors">
      Delete
    </Button>
  );
}

const MealHistory = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingMeal, setEditingMeal] = useState<Meal | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Data user (bisa diganti dengan data dari context/state management)
  const userData = {
    userId: "1",
    tdeeId: "1"
  };

  // Fetch meal history
  const fetchMealHistory = useCallback(async () => {
    try {
      setLoading(true);
      const data = await mealService.getMealHistory({
        userId: userData.userId,
        tdeeId: userData.tdeeId
      });
      setMeals(data.history);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch meal history";
      setError(errorMessage);
      toast.error("Failed to fetch meal history");
    } finally {
      setLoading(false);
    }
  }, [userData.userId, userData.tdeeId]);

  useEffect(() => {
    fetchMealHistory();
  }, [fetchMealHistory]);

  // Handle edit
  const handleEdit = (meal: Meal) => {
    setEditingMeal(meal);
    setIsModalOpen(true);
  };

  // Handle save edit
  const handleSaveEdit = async (updatedMeal: Meal) => {
    try {
      await mealService.updateMeal(updatedMeal.id, {
        userId: userData.userId,
        foodId: updatedMeal.foods[0].id,
        portion: updatedMeal.foods[0].weight,
        mealType: updatedMeal.foods[0].mealType,
        date: updatedMeal.date
      });
      
      setMeals(meals.map(meal => 
        meal.id === updatedMeal.id ? updatedMeal : meal
      ));
      
      toast.success("Meal updated successfully");
      setIsModalOpen(false);
    } catch (err) {
      toast.error("Failed to update meal");
    }
  };

  // Handle delete
  const handleDelete = async (mealId: number) => {
    if (window.confirm("Are you sure you want to delete this meal?")) {
      try {
        await mealService.deleteMeal(mealId, userData.userId);
        setMeals(meals.filter(meal => meal.id !== mealId));
        toast.success("Meal deleted successfully");
      } catch (err) {
        toast.error("Failed to delete meal");
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-center text-3xl text-[#34D399] pt-5 pb-7 font-bold">
        Meal Plan History
      </h1>
      
      <div className="grid gap-4">
        {meals.map((meal) => (
          <MealCard
            key={meal.id}
            meal={meal}
            onEdit={() => handleEdit(meal)}
            onDelete={() => handleDelete(meal.id)}
          />
        ))}
      </div>

      <EditMealModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        meal={editingMeal}
        onSave={handleSaveEdit}
      />
    </div>
  );
};

export default MealHistory;