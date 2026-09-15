
const WeatherIcon = ({ condition }) => {
  const common = { className: "weather-icon", viewBox: "0 0 100 100", xmlns: "http://www.w3.org/2000/svg" }

  if (condition === "Clear") {
    return (
      <svg {...common}>
        <circle cx="50" cy="50" r="22" fill="#ffb27a" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <line
            key={angle}
            x1="50" y1="14" x2="50" y2="4"
            stroke="#ffb27a" strokeWidth="4" strokeLinecap="round"
            transform={`rotate(${angle} 50 50)`}
          />
        ))}
      </svg>
    )
  }

  if (condition === "Clouds") {
    return (
      <svg {...common}>
        <ellipse cx="42" cy="58" rx="26" ry="18" fill="#c9cbe0" />
        <ellipse cx="62" cy="50" rx="20" ry="16" fill="#dcdeef" />
      </svg>
    )
  }

  if (condition === "Rain" || condition === "Drizzle") {
    return (
      <svg {...common}>
        <ellipse cx="42" cy="42" rx="26" ry="18" fill="#9aa0c4" />
        <ellipse cx="62" cy="36" rx="18" ry="14" fill="#b3b8d9" />
        {[36, 50, 64].map((x,) => (
          <line key={x} x1={x} y1="66" x2={x - 6} y2="86" stroke="#7fe8cf" strokeWidth="4" strokeLinecap="round" />
        ))}
      </svg>
    )
  }

  if (condition === "Thunderstorm") {
    return (
      <svg {...common}>
        <ellipse cx="42" cy="40" rx="26" ry="18" fill="#8087ab" />
        <ellipse cx="62" cy="34" rx="18" ry="14" fill="#9aa0c4" />
        <polygon points="52,58 40,80 50,80 44,96 66,70 54,70" fill="#ffd66b" />
      </svg>
    )
  }

  if (condition === "Snow") {
    return (
      <svg {...common}>
        <ellipse cx="42" cy="42" rx="26" ry="18" fill="#c9cbe0" />
        <ellipse cx="62" cy="36" rx="18" ry="14" fill="#dcdeef" />
        {[36, 50, 64].map((x) => (
          <circle key={x} cx={x} cy="80" r="3.5" fill="#f2f1f7" />
        ))}
      </svg>
    )
  }

  // Mist, Haze, Fog, or anything else
  return (
    <svg {...common}>
      {[36, 46, 56, 66].map((y, i) => (
        <line key={y} x1={22 + (i % 2) * 6} y1={y} x2="78" y2={y} stroke="#c9cbe0" strokeWidth="4" strokeLinecap="round" />
      ))}
    </svg>
  )
}

export default WeatherIcon