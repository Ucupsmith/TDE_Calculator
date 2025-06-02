export interface Food {
  id: number;
  name: string;
  weight: number;
  image: string;
  calories: number;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

export interface Meal {
  id: number;
  date: string;
  calories: number;
  foods: Food[];
  caption: string;
  goal: number;
  tdee: number;
}

export const mealHistoryData: Meal[] = [
  {
    id: 1,
    date: "2024-03-20",
    calories: 1500,
    foods: [
      {
        id: 1,
        name: "Nasi Putih",
        weight: 100,
        image: "https://example.com/rice.png",
        calories: 130,
        mealType: "lunch"
      },
      {
        id: 2,
        name: "Ayam Dada",
        weight: 100,
        image: "https://example.com/chicken.png",
        calories: 165,
        mealType: "lunch"
      },
      {
        id: 3,
        name: "Tempe",
        weight: 50,
        image: "https://example.com/tempe.png",
        calories: 100,
        mealType: "lunch"
      },
      {
        id: 4,
        name: "Tahu",
        weight: 50,
        image: "https://example.com/tofu.png",
        calories: 80,
        mealType: "lunch"
      }
    ],
    caption: "Great Progress! You reached 78% of your goal today!",
    goal: 2000,
    tdee: 2500
  }
]; 