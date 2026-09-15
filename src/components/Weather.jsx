// Weather.jsx
import useFetch from "./useFetch"
import { useState } from "react"
import WeatherScene from "./WeatherScene"
import "./Weather.css"

const Weather = () => {
  
  const [controlInput, setControlInput] = useState("")
  const [searchCity, setSearchCity] = useState("")

  const changeHandler = (e) => {
    setControlInput(e.target.value)
  }

  const handleSearch = () => {
    setSearchCity(controlInput)
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&APPID=666462edc958b0091ba44e373ca292f6`
  const { data, loading } = useFetch(url)

  const currentCondition = data.weather ? data.weather[0].main : "Clear"

  return (
    <div className="weather-app">
      <WeatherScene key={currentCondition} condition={currentCondition} />

      <div className="weather-header">
        <p className="weather-app-name">Skyward</p>
        <p className="weather-brand">Built by <strong>Afif Ahmad</strong></p>
      </div>

      <div className="weather-card">
        <div className="weather-search">
          <input 
            value={controlInput} 
            onChange={changeHandler} 
            type="text" 
            placeholder="Enter a city" 
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        {!searchCity && <p className="weather-empty">Search for a city to see the weather.</p>}

        {searchCity && loading && <p className="weather-loading">Loading...</p>}

        {searchCity && !loading && data.cod && data.cod !== 200 && (
          <p className="weather-error">{data.message}</p>
        )}

        {searchCity && !loading && data.main && (
          <div className="weather-result">
            <p className="weather-city">{data.name}</p>
            <p className="weather-temp">{(data.main.temp - 273.15).toFixed(1)}°</p>
            <p className="weather-condition">{data.weather[0].description}</p>

            <div className="weather-metrics">
              <div>
                <div className="weather-metric-value">{data.main.humidity}%</div>
                <div className="weather-metric-label">Humidity</div>
              </div>
              <div>
                <div className="weather-metric-value">{data.wind.speed} m/s</div>
                <div className="weather-metric-label">Wind</div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="weather-about">
        <p>
          This app fetches live weather data through a reusable <code>useFetch</code>{" "}
          custom hook that wraps <code>useState</code> and <code>useEffect</code>,
          returning loading and data states to any component that needs them. The
          background scene reacts to the actual weather condition returned by the
          API — clear skies render a glowing sun, cloudy conditions render drifting
          cloud shapes, and rain or snow render falling particles — all built with
          Three.js and synced to React state via a <code>key</code> prop that forces
          a clean rebuild whenever the condition changes.
        </p>
      </div>

      <div className="weather-footer">
        <span className="weather-tech-badge">React</span>
        <span className="weather-tech-badge">Three.js</span>
        <span className="weather-tech-badge">OpenWeatherMap API</span>
      </div>
    </div>
  )
}

export default Weather