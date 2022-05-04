import { WeatherActions } from './constants';
import { getCurrentWeather } from '../api';

export const fetchStart = () => ({
    type: WeatherActions.fetchStart,
});

export const fetchError = () => ({
    type: WeatherActions.fetchError,
});

export const fetchSuccess = (weather) => ({
    payload: weather,
    type: WeatherActions.fetchSuccess,
});

export const fetchWeather = (city) => {
    return async (dispathc) => {
        try {
            dispathc(fetchStart());
            const weather = await getCurrentWeather(city);
            dispathc(fetchSuccess(weather.main));
        } catch {
            dispathc(fetchError())
        }
    };
};