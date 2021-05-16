import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../UI/card/card.component';
import LoadingSpinner from '../../UI/loading-spinner/loading-spinner.component';
import MealItem from '../meal-item/meal-item.component';
import { getProducts } from '../../../store/products-thunk';

import './available-meals.style.scss';

const AvailableMeals = () => {
  /* 
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState(null); */
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts('kebab'));
  }, [dispatch]);

  /*  if (!!error) {
    return (
      <Card className="error-text">
        <p>{error}</p>
      </Card>
    );
  } */

  return (
    <section>
      {products.length > 0 ? (
        <Card>
          <ul>
            {products.map((meal) => (
              <MealItem
                id={meal.id}
                key={meal.id}
                name={meal.name}
                description={meal.description}
                price={meal.price}
              />
            ))}
          </ul>
        </Card>
      ) : (
        <Card className="center">
          <LoadingSpinner />
        </Card>
      )}
    </section>
  );
};

export default AvailableMeals;
