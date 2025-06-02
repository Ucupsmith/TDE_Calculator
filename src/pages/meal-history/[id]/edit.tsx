import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button, Input, Typography } from "@material-tailwind/react";
import { toast } from "react-toastify";

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

const EditMealPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // TODO: Fetch meal data from API
      // For now using mock data
      setMeal({
        id: Number(id),
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
      });
      setLoading(false);
    }
  }, [id]);

  const handleSave = async () => {
    if (!meal) return;

    try {
      // TODO: Call API to update meal
      toast.success("Meal updated successfully!");
      router.push("/meal-history");
    } catch (error) {
      toast.error("Failed to update meal");
    }
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
          Edit Meal
        </Typography>

        <div className="space-y-6">
          {/* Date Input */}
          <div>
            <Typography className="text-white mb-2">Date</Typography>
            <Input
              type="text"
              value={meal.date}
              onChange={(e) => setMeal({ ...meal, date: e.target.value })}
              className="text-white"
              label="Date"
              crossOrigin="anonymous"
            />
          </div>

          {/* Calories Input */}
          <div>
            <Typography className="text-white mb-2">Calories</Typography>
            <Input
              type="number"
              value={meal.calories}
              onChange={(e) => setMeal({ ...meal, calories: Number(e.target.value) })}
              className="text-white"
              label="Calories"
              crossOrigin="anonymous"
            />
          </div>

          {/* Foods List */}
          <div>
            <Typography className="text-white mb-4">Foods</Typography>
            <div className="space-y-4">
              {meal.foods.map((food, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-[#132A2E] rounded-lg">
                  <img
                    src={food.image}
                    alt={food.name}
                    className="w-12 h-12 object-cover rounded-full"
                  />
                  <div className="flex-1">
                    <Typography className="text-white">{food.name}</Typography>
                    <Input
                      type="number"
                      value={food.weight}
                      onChange={(e) => {
                        const newFoods = [...meal.foods];
                        newFoods[index] = {
                          ...food,
                          weight: Number(e.target.value)
                        };
                        setMeal({ ...meal, foods: newFoods });
                      }}
                      className="text-white mt-2"
                      label="Weight (g)"
                      crossOrigin="anonymous"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Caption Input */}
          <div>
            <Typography className="text-white mb-2">Caption</Typography>
            <Input
              type="text"
              value={meal.caption}
              onChange={(e) => setMeal({ ...meal, caption: e.target.value })}
              className="text-white"
              label="Caption"
              crossOrigin="anonymous"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-8">
            <Button
              variant="outlined"
              onClick={() => router.push("/meal-history")}
              className="text-[#34D399] border-[#34D399]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="bg-[#34D399] text-white"
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