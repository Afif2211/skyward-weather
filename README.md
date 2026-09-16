# Skyward — Live Weather App

A weather lookup app with a reactive 3D background — the scene changes to match the actual weather condition returned by the API (sun, clouds, rain, or snow).

## Live Demo
https://skyward-weather-sepia.vercel.app/

## Features
- Search any city for current temperature, condition, humidity, and wind
- Loading and error states handled separately
- Three.js background scene that changes based on live weather data
- Fully responsive layout

## Built with
- React (custom `useFetch` hook built on `useState` + `useEffect`)
- Three.js
- OpenWeatherMap API
- Plain CSS

## What I learned
This was my first custom hook — wrapping a fetch call, loading state, and data state into a single reusable `useFetch(url)` function that any component can call. I also learned how to safely rebuild a Three.js scene when React props change, by using a `key` prop on the scene component to force a full unmount and remount instead of trying to patch the existing scene in place.

## Running locally
```bash
npm install
npm run dev
```

You'll need your own OpenWeatherMap API key from [openweathermap.org](https://openweathermap.org/appid) — add it in `Weather.jsx` where the fetch URL is built.
