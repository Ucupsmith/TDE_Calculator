import React from "react";
import { Food } from "@/data/mealHistoryData";

interface FoodItemProps {
  food: Food;
}

const FoodItem: React.FC<FoodItemProps> = ({ food }) => {
  return (
    <div className="bg-gray-800 p-3 rounded-lg">
      <h3 className="text-white font-medium">{food.name}</h3>
      <p className="text-gray-400 text-sm">{food.calories} calories</p>
      <p className="text-gray-400 text-sm">{food.weight}g</p>
      <p className="text-gray-400 text-sm capitalize">{food.mealType}</p>
    </div>
  );
};

export default FoodItem; 