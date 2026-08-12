import React from "react";
import MonthlyWeatherArticle from "../Components/MonthlyWeatherArticle";

const HERO_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Puerto_Viejo_de_Talamanca%2C_Costa_Rica_2012.JPG/960px-Puerto_Viejo_de_Talamanca%2C_Costa_Rica_2012.JPG?20120902175205";

const WeatherOctober = () => (
    <MonthlyWeatherArticle month="october" routeKey="blogWeatherOct" slug="weather-puerto-viejo-october" heroImage={HERO_IMAGE} />
);

export default WeatherOctober;
