import React from "react";
import MonthlyWeatherArticle from "../Components/MonthlyWeatherArticle";

const HERO_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Lim%C3%B3n_Province%2C_Puerto_Viejo_de_Talamanca%2C_Costa_Rica_-_panoramio_%281%29.jpg/1280px-Lim%C3%B3n_Province%2C_Puerto_Viejo_de_Talamanca%2C_Costa_Rica_-_panoramio_%281%29.jpg?20170313071619";

const WeatherDecember = () => (
    <MonthlyWeatherArticle month="december" routeKey="blogWeatherDec" slug="weather-puerto-viejo-december" heroImage={HERO_IMAGE} />
);

export default WeatherDecember;
