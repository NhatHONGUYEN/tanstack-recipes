"use client";

import React, { useState } from "react";
import { useMeals } from "./hooks/useMeals";
import { SearchBar } from "./components/SearchBar";
import { MealGrid } from "./components/MealGrid";
import { CustomPagination } from "./components/CustomPagination";
import {
  DEFAULT_QUERY,
  INITIAL_PAGE,
  RESULTS_PER_PAGE,
} from "./constants/Constants";
import Hero from "./components/Hero";

export default function Home() {
  const [query, setQuery] = useState(DEFAULT_QUERY);
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(INITIAL_PAGE);
  const [showHero, setShowHero] = useState(true); // État pour contrôler l'affichage du Hero

  const { data, isLoading, isError } = useMeals(query, page, RESULTS_PER_PAGE);

  const meals = data?.meals;
  const totalResults = data?.totalResults || 0;
  const totalPages = Math.ceil(totalResults / RESULTS_PER_PAGE);

  const handleSearch = () => {
    setQuery(searchInput);
    setPage(INITIAL_PAGE);
    setSearchInput("");
    setShowHero(true); // Réaffiche le Hero après une recherche
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading meals.</div>;

  return (
    <div className="max-w-6xl mx-auto h-full flex flex-col items-center justify-center">
      {/* Héros visible uniquement si showHero est true */}
      {showHero && <Hero />}
      <h1 className="text-4xl mt-10 font-bold">Meals</h1>
      <SearchBar
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        onSearch={handleSearch}
      />
      <MealGrid meals={meals} />
      <CustomPagination
        totalPages={totalPages}
        currentPage={page}
        setPage={(newPage) => {
          setPage(newPage);
          setShowHero(newPage === INITIAL_PAGE); // Masque le Hero si ce n'est pas la première page
        }}
      />
    </div>
  );
}
