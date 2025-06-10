import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface TdeeCalculation {
  id: number;
  userId: number;
  weight: number;
  height: number;
  age: number;
  gender: string;
  activityLevel: string;
  tdee: number;
  createdAt: string;
}

interface SessionUser {
  userId: number;
  username: string;
  name: string;
  email: string;
  accessToken: string;
  number_phone: string;
}

export const useTdeeCalculator = () => {
  const { data: session } = useSession();
  const [userId, setUserId] = useState<number | null>(null);
  const [calculations, setCalculations] = useState<TdeeCalculation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user?.userId) {
      setUserId(session.user.userId);
    }
  }, [session]);

  const fetchDataTdee = async () => {
    if (!userId) return;
    
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`/api/tdee/${userId}`);
      if (!response.ok) throw new Error('Failed to fetch TDEE calculations');
      const data = await response.json();
      setCalculations(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTdeeCalculation = async (id: number) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`/api/tdee/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete TDEE calculation');
      await fetchDataTdee(); // Refresh the list
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    userId,
    calculations,
    isLoading,
    error,
    fetchDataTdee,
    deleteTdeeCalculation,
  };
}; 