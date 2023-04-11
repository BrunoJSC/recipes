import { useGlobalContext } from "../context";
import { BsHandThumbsUp } from "react-icons/bs";

export function Meals() {
  const { meals, loading, selectMeal, addFavorite } = useGlobalContext();

  if (loading) {
    return (
      <section className="section">
        <h1>Loading...</h1>
      </section>
    );
  }

  if(meals.length < 1) {
    return (
      <section className="section">
        <h1>No meals matched your search criteria</h1>
      </section>
    );
  }

  return (
    <section className="section-center">
      {meals.map((singleMeal) => {
        const { idMeal, strMeal: title, strMealThumb: image } = singleMeal;
        return (
          <article key={idMeal} className="single-meal" onClick={() => selectMeal(idMeal)}>
            <img src={image} alt={title} className="img" />
            <footer>
              <h1>{title}</h1>
              <button className="like-btn" onClick={() => addFavorite(idMeal)}>
                <BsHandThumbsUp />
              </button>
            </footer>
          </article>
        );
      })}
    </section>
  );
}
