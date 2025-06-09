import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button, Input, Typography } from "@material-tailwind/react";
import { toast } from "react-toastify";
import Image from 'next/image';
// Import necessary functions and types from mealService
import { getMealHistory, updateMeal } from "@/services/mealService";
import type { MealHistory, MealHistoryFood as ServiceMealHistoryFood, MealUpdatePayload, MealUpdateFoodPayload } from "@/services/mealService"; // Alias imported type, import new types

// Define a local interface for Food with quantity for editing purposes
// This extends the base MealHistoryFood with a quantity field for the UI
interface EditableMealHistoryFood extends ServiceMealHistoryFood {
  quantity: number; // Quantity/portion for this specific history entry
}

// Update the local MealHistory interface to use the editable food type
interface EditableMealHistory extends Omit<MealHistory, 'foods'> {
  foods: EditableMealHistoryFood[];
}

const EditMealPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const mealId = typeof id === 'string' ? parseInt(id, 10) : null;

  // Use the updated local interfaces for state
  const [meal, setMeal] = useState<EditableMealHistory | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMealData = async () => {
      if (mealId === null) return;

      try {
        setLoading(true);
        // Pass userId to getMealHistory
        // For now, using a hardcoded value like in index.tsx
        const currentUserId = "1"; // TEMPORARY: Use hardcoded ID as string
        const history = await getMealHistory(currentUserId);
        const specificMeal = history.find(m => m.id === mealId);

        if (specificMeal) {
          // Map the fetched foods to include a default quantity for editing
          const editableFoods: EditableMealHistoryFood[] = specificMeal.foods.map(food => ({
            ...food,
            quantity: food.quantity ?? 0, // Use actual quantity from backend, default to 0 if null/undefined
          }));

          setMeal({
            ...specificMeal,
            foods: editableFoods,
          });
        } else {
          toast.error("Meal not found");
          router.push("/meal-history"); // Redirect if not found
        }
      } catch (error) {
        toast.error("Failed to fetch meal data");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMealData();
  }, [mealId, router]); // Depend on mealId and router for redirect

  const handleFoodQuantityChange = (index: number, quantity: number) => {
    if (!meal) return;
    const newFoods = [...meal.foods];
    newFoods[index] = {
      ...newFoods[index],
      quantity: quantity,
    };
    setMeal({ ...meal, foods: newFoods });
  };

  const handleRemoveFood = (idToRemove: number | null) => {
    if (!meal || idToRemove === null) return;
    const newFoods = meal.foods.filter(food => food.id !== idToRemove);
    setMeal({ ...meal, foods: newFoods });
  };

  const handleSave = async () => {
    if (!meal) return;

    // Prepare updated data with the new payload type
    const updatedData: MealUpdatePayload = {
      foods: meal.foods
        .filter(food => food.quantity > 0 && food.id !== null) // Filter out items with quantity 0 AND ensure id is not null
        .map(food => ({
          foodId: food.id as number,
          quantity: food.quantity
        })),
    };

    try {
      // Call API to update meal
      await updateMeal(meal.id, updatedData);
      toast.success("Meal updated successfully!");
      router.push("/meal-history"); // Redirect back to meal history
    } catch (error) {
      toast.error("Failed to update meal");
      console.error(error);
    }
  };

  const handleCancel = () => {
    router.push("/meal-history"); // Redirect back without saving
  };

  // Group foods by isCustom status
  const groupFoodsByIsCustom = (foods: EditableMealHistoryFood[]) => {
    return foods.reduce((acc, food) => {
      const key = food.isCustom ? 'custom' : 'standard';
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(food);
      return acc;
    }, {} as Record<string, EditableMealHistoryFood[]>);
  };

  // Keep label function (adjust for isCustom grouping if needed)
  const getFoodGroupLabel = (type: string) => {
    const labels: Record<string, string> = {
      standard: 'Standard Foods',
      custom: 'Custom Foods',
    };
    return labels[type] || type;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Typography className="text-white">Loading...</Typography>
      </div>
    );
  }

  if (!meal) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Typography className="text-white">Meal not found</Typography>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Typography variant="h3" className="text-[#34D399] mb-8">
          Edit Meal History Entry
        </Typography>

        <div className="space-y-6">
          {/* Date Display (Read-only) */}
          <div>
            <Typography className="text-white mb-2">Date:</Typography>
            <Typography className="text-gray-300 font-semibold">{meal.date}</Typography>
          </div>

          {/* Summary Info Display (Read-only) */}
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="bg-[#1e3a3d] px-3 py-1 rounded-lg">
              <p className="text-gray-400">Calories: <span className="text-white font-bold">{meal.totalCalories}</span></p>
            </div>
            <div className="bg-[#1e3a3d] px-3 py-1 rounded-lg">
              <p className="text-gray-400">TDEE Result: <span className="text-white font-bold">{meal.tdeeResult}</span></p>
            </div>
            <div className="bg-[#1e3a3d] px-3 py-1 rounded-lg">
              <p className="text-gray-400">Remaining: <span className="text-white font-bold">{meal.calorieRemaining}</span></p>
            </div>
          </div>

          {/* Foods List with Edit/Delete */}
          <div>
            <Typography className="text-white mb-4">Foods Consumed:</Typography>
            <div className="grid gap-4">
              {Object.entries(groupFoodsByIsCustom(meal.foods)).map(([groupType, foods]) => (
                <div key={groupType} className="bg-[#132A2E] rounded-lg p-4">
                  <h3 className="text-[#34D399] font-semibold mb-3">{getFoodGroupLabel(groupType)}</h3>
                  <div className="space-y-3">
                    {foods.map((food) => (
                      <div key={food.id} className="flex items-center gap-4 p-3 rounded-lg bg-[#1e3a3d]">
                        <Image
                          src={food.imageUrl || "/default-food.png"}
                          alt={food.name}
                          width={32}
                          height={32}
                          className="w-8 h-8 object-cover rounded-full"
                        />
                        <div className="flex-1">
                          <Typography className="text-white font-medium">{food.name}</Typography>
                          <Typography className="text-gray-400 text-sm">{food.calories} calories per {food.unit}</Typography>
                        </div>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            value={food.quantity}
                            onChange={(e) => handleFoodQuantityChange(meal.foods.findIndex(f => f.id === food.id), Number(e.target.value))}
                            className="text-white w-16 text-center"
                            label="Qty"
                            min={1}
                            crossOrigin="anonymous"
                          />
                          <Button
                            variant="outlined"
                            onClick={() => handleRemoveFood(food.id)}
                            className="text-[#D33434] border-[#D33434] p-2"
                          >
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              className="h-5 w-5" 
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
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-8">
            <Button
              variant="outlined"
              onClick={handleCancel}
              className="text-white border-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="bg-[#34D399] text-white hover:bg-[#34D399]/90"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditMealPage;
