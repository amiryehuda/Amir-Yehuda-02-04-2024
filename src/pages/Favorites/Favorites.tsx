import React, { useEffect, useState } from "react";
import FavoriteCard from "./FavoriteCard/FavoriteCard";
import { ICity } from "../../store/weather/weatherSlice";
import { FavoritePageContainer } from "./styles";
import { useAppSelector } from "../../store/store";

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<ICity[]>([]);
  const settingsState = useAppSelector((state) => state.settings);

  useEffect(() => {
    const favoritesString = localStorage.getItem("favorites");
    if (favoritesString) {
      const parsedFavorites: ICity[] = JSON.parse(favoritesString);
      setFavorites(parsedFavorites);
    }

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleStorageChange = (event: StorageEvent) => {
    if (event.key === "favorites") {
      const newFavoritesString = event.newValue;
      if (newFavoritesString) {
        const newFavorites: ICity[] = JSON.parse(newFavoritesString);
        setFavorites(newFavorites);
      }
    }
  };

  return (
    <FavoritePageContainer>
      {favorites.length === 0 ? (
        <div style={{ color: "#8796A5" }}>No favorites yet.</div>
      ) : (
        favorites.map((favorite: ICity) => (
          <FavoriteCard
            keys={favorite.key}
            cityName={favorite.englishName}
            celsius={favorite.celsius}
            fahrenheit={favorite.fahrenheit}
            iconNumber={favorite.iconNumber}
            weatherText={favorite.weatherText}
            isCelsius={settingsState.isCelsius}
          />
        ))
      )}
    </FavoritePageContainer>
  );
};

export default Favorites;
