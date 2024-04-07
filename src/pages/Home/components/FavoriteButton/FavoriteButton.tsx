import React, { useEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import styled from "styled-components";
import { ICity } from "../../../../store/weather/weatherSlice";
import { useAppSelector } from "../../../../store/store";
import { useLocation } from "react-router-dom";

interface FavoriteButtonProps {
  keyProp: string;
  isFavorite: boolean;
  setIsFavorite: (state: boolean) => void;
}

const Container = styled.div`
  width: 40px;
`;

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  keyProp,
  isFavorite,
  setIsFavorite,
}) => {
  const cityDetails = useAppSelector((state) => state.weather.currentCity);
  const location = useLocation();

  useEffect(() => {
    const favoritesString = localStorage.getItem("favorites");
    if (favoritesString) {
      const favorites: ICity[] = JSON.parse(favoritesString);
      const found = favorites.some((item) => item.key === keyProp);

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
      const newItem: ICity = {
        key: cityDetails.key,
        englishName: cityDetails.englishName,
        weatherText: cityDetails.weatherText,
        iconNumber: cityDetails.iconNumber,
        fahrenheit: cityDetails.fahrenheit,
        celsius: cityDetails.celsius,
      };
      cityDetails.key && favorites.push(newItem);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }

    setIsFavorite(!isFavorite);
  };

  return (
    <Container>
      <div style={{ cursor: "pointer" }} onClick={handleToggleFavorite}>
        {isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
      </div>
    </Container>
  );
};

export default FavoriteButton;
