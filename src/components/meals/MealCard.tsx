import React from "react";
import { ButtonEdit, ButtonDelete } from "./ButtonEditDelete";
import FoodItem from "./FoodItem";
import axios from "axios";
import { Meal } from "@/data/mealHistoryData";

interface MealCardProps {
  meal: Meal;
  onEdit: (meal: Meal) => void;
  onDelete: (mealId: number) => void;
}

const MealCard: React.FC<MealCardProps> = ({ meal, onEdit, onDelete }) => {
  const handleDelete = async (mealId: number) => {
    try {
      await axios.delete(`/api/meals/${mealId}`);
      onDelete(mealId); // Call the parent's onDelete to update UI
    } catch (error) {
      console.error("Error deleting meal:", error);
      // Handle error (show notification, etc.)
    }
  };

  const handleEdit = async (meal: Meal) => {
    try {
      // First get the current meal data
      const response = await axios.get(`/api/meals/${meal.id}`);
      onEdit(response.data); // Pass the meal data to parent for editing
    } catch (error) {
      console.error("Error fetching meal for edit:", error);
      // Handle error (show notification, etc.)
    }
  };

  return (
    <div className="border-2 border-[#34D399] rounded-lg p-4 mb-4 shadow-lg">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <div>
          <h2 className="text-lg text-white font-semibold">{meal.date}</h2>
          <p className="text-gray-500 font-bold">Calories: {meal.calories}</p>
        </div>

        <div className="flex gap-2">
          <ButtonEdit onClick={() => handleEdit(meal)} />
          <ButtonDelete onClick={() => handleDelete(meal.id)} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        {meal.foods.map((food, index) => (
          <FoodItem 
            key={`${meal.id}-${food.name}-${index}`}
            food={food}
          />
        ))}
      </div>

      {meal.caption && (
        <div className="mt-4 p-3 bg-[#34D399]/10 rounded-lg">
          <p className="text-[#34D399] italic">{meal.caption}</p>
        </div>
      )}
    </div>
  );
};

export default MealCard; 