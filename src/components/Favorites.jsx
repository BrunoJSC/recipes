import { useGlobalContext } from "../context";

export function Favorites() {
  const { favorite, removeFavorite, selectMeal } = useGlobalContext();
  return (
    <section className="favorites">
      <div className="favorite-content">
        <h5>Favorite</h5>
        <div className="favorites-container">
          {favorite.map((item) => {
            const { idMeal, strMealThumb: image } = item;

            return (
              <div key={idMeal} className="favorite-items">
                <img src={image} alt="image" className="favorites-img img" />
                <button
                  className="remove-btn"
                  onClick={() => removeFavorite(idMeal)}
                >
                  remove
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
