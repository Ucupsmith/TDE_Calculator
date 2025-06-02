import React, { useState, useEffect } from "react";
import { Dialog } from "@material-tailwind/react";
import { Meal, Food } from "@/data/mealHistoryData";

interface EditMealModalProps {
  isOpen: boolean;
  onClose: () => void;
  meal: Meal | null;
  onSave: (meal: Meal) => void;
}

const EditMealModal: React.FC<EditMealModalProps> = ({ isOpen, onClose, meal, onSave }) => {
  const [editedMeal, setEditedMeal] = useState<Meal | null>(meal);

  useEffect(() => {
    setEditedMeal(meal);
  }, [meal]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editedMeal) {
      onSave(editedMeal);
    }
  };

  if (!meal || !editedMeal) return null;

  return (
    <Dialog open={isOpen} handler={onClose}>
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Edit Meal</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Date</label>
            <input
              type="date"
              value={editedMeal.date}
              onChange={(e) => setEditedMeal({
                ...editedMeal,
                date: e.target.value
              })}
              className="w-full p-2 border rounded"
            />
          </div>

          {editedMeal.foods.map((food, index) => (
            <div key={food.id} className="mb-4">
              <h3 className="font-medium mb-2">{food.name}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Weight (g)</label>
                  <input
                    type="number"
                    value={food.weight}
                    onChange={(e) => {
                      const newFoods = [...editedMeal.foods];
                      newFoods[index] = {
                        ...food,
                        weight: parseInt(e.target.value)
                      };
                      setEditedMeal({
                        ...editedMeal,
                        foods: newFoods
                      });
                    }}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Meal Type</label>
                  <select
                    value={food.mealType}
                    onChange={(e) => {
                      const newFoods = [...editedMeal.foods];
                      newFoods[index] = {
                        ...food,
                        mealType: e.target.value as Food['mealType']
                      };
                      setEditedMeal({
                        ...editedMeal,
                        foods: newFoods
                      });
                    }}
                    className="w-full p-2 border rounded"
                  >
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                    <option value="snack">Snack</option>
                  </select>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#34D399] text-white rounded hover:bg-[#34D399]/90"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </Dialog>
  );
};

export default EditMealModal; 