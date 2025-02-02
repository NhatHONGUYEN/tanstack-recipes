"use client";

import { useQuery } from "@tanstack/react-query";
import { Meals } from "../../../types/Meals";
import MealCard from "./MealCard";

async function fetchSuggestions(): Promise<Meals[]> {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=Beef`,
    { cache: "force-cache" }
  );
  const data = await response.json();
  return data.meals || [];
}

export default function Suggestions() {
  const { data: meals = [], isLoading } = useQuery({
    queryKey: ["suggestions"],
    queryFn: fetchSuggestions,
    staleTime: 1000 * 60 * 5, // Cache les données pendant 5 minutes
  });

  if (isLoading) {
    // Affichage pendant le chargement
    return <p>Chargement des suggestions...</p>;
  }

  return (
    <div className="w-full max-w-5xl mx-auto pt-20">
      <h1 className="text-4xl mt-10 font-bold">Suggestions</h1>
      <div className="grid py-10 md:grid-cols-2 xl:grid-cols-3 gap-20">
        {meals.slice(0, 3).map((meal: Meals) => (
          <MealCard key={meal.idMeal} meal={meal} />
        ))}
      </div>
    </div>
  );
}
