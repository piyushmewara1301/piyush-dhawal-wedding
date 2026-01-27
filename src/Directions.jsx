import React from "react";

const hotels = [
  {
    name: "Krishna Resort",
    lat: 26.497692,
    lng: 74.516753
  },
  {
    name: "Krishna Cottage",
    lat: 26.497719,
    lng: 74.517801
  },
  {
    name: "Lalit International",
    lat: 26.490269,
    lng: 74.527545
  },
  {
    name: "Hotel Holy Pushkar",
    lat: 26.489496,
    lng: 74.547863
  },
  {
    name: "Rawai Luxury Hotel",
    lat: 26.483781,
    lng: 74.545735
  }
];

export default function Directions() {
  return (
    <div className="directions-page">
      <h2 className="directions-title">Stay & Directions</h2>


      <div className="hotel-list">
        {hotels.map((h) => (
          <div key={h.name} className="hotel-card">
            <div className="hotel-info">
              <h4>{h.name}</h4>
              <p>Pushkar, Rajasthan</p>
            </div>

            <a
              className="hotel-map-btn"
              href={`https://www.google.com/maps?q=${h.lat},${h.lng}`}
              target="_blank"
              rel="noreferrer"
            >
              View on Map
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
