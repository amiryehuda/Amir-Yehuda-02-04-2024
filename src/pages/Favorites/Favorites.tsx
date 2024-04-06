import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FavoriteCard from "./FavoriteCard/FavoriteCard";
import { ICity } from "../../store/weather/weatherSlice";

const FavoritePageContainer = styled.div`
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<ICity[]>([]);

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
            key={favorite.key}
            cityName={favorite.englishName}
            celsius={favorite.celsius}
            fahrenheit={favorite.fahrenheit}
            iconNumber={favorite.iconNumber}
            weatherText={favorite.weatherText}
          />
        ))
      )}
    </FavoritePageContainer>
  );
};

export default Favorites;
