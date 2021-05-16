import React from 'react';
import AvailableMeals from './available-meals/available-meals.component';
import MealsSummary from './meals-summary/meals-summary.component';

const Meals = () => {
  return (
    <>
      <MealsSummary />
      <AvailableMeals />
    </>
  );
};

export default Meals;
