import React, { useState, useEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import styled from "styled-components";
import { ICity } from "../../../../store/weather/weatherSlice";
import { useAppSelector } from "../../../../store/store";
import { useLocation } from "react-router-dom";

interface FavoriteButtonProps {
  keyProp: string;
}

const Container = styled.div`
  width: 40px;
`;

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ keyProp }) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const cityDetails = useAppSelector((state) => state.weather.currentCity);
  const location = useLocation();

  useEffect(() => {
    const favoritesString = localStorage.getItem("favorites");
    if (favoritesString) {
      const favorites: ICity[] = JSON.parse(favoritesString);
      const found = favorites.some((item) => item.key === keyProp);
      console.log(found);

      setIsFavorite(found);
    }
  }, [keyProp, location]);

  const handleToggleFavorite = () => {
    const favoritesString = localStorage.getItem("favorites");
    let favorites: ICity[] = [];
    if (favoritesString) {
      favorites = JSON.parse(favoritesString);
    }

    if (isFavorite) {
      const updatedFavorites = favorites.filter((item) => item.key !== keyProp);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      // Assuming `Ridax` is an available variable providing data for the favorite item
      const newItem: ICity = {
        key: cityDetails.key,
        englishName: cityDetails.englishName,
        weatherText: cityDetails.weatherText,
        iconNumber: 12,
        fahrenheit: 23,
        celsius: 22,
      };
      cityDetails.key && favorites.push(newItem);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }

    setIsFavorite((prev) => !prev);
  };

  return (
    <Container>
      <div style={{ cursor: "pointer" }} onClick={handleToggleFavorite}>
        {isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
      </div>
      {/* <p>{isFavorite ? "Remove from favorites" : "Add to favorites"}</p> */}
    </Container>
  );
};

export default FavoriteButton;
