import React from "react";
import MonthlyWeatherArticle from "../Components/MonthlyWeatherArticle";

const HERO_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Lim%C3%B3n_Province%2C_Sixaola%2C_Costa_Rica_-_panoramio_%282%29.jpg/960px-Lim%C3%B3n_Province%2C_Sixaola%2C_Costa_Rica_-_panoramio_%282%29.jpg";

const WeatherJuly = () => (
    <MonthlyWeatherArticle month="july" routeKey="blogWeatherJul" slug="weather-puerto-viejo-july" heroImage={HERO_IMAGE} />
);

export default WeatherJuly;
