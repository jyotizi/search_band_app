import React, { useState, useEffect } from 'react';

const BandSearch = () => {
  const [city, setCity] = useState('');
  const [bands, setBands] = useState([]);
  const [error, setError] = useState('');

  const fetchBands = async (searchCity) => {
    try {
      const response = await fetch(`/api/v1/bands?city=${searchCity}`, {
        headers: {
          Accept: 'application/json'
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setBands(data);
    } catch (err) {
      console.log(err);
      setError('Error fetching bands. Please try again.');
    }
  };

  useEffect(() => {
    const getLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              const geoRes = await fetch(
                `https://get.geojs.io/v1/ip/geo.json?latitude=${latitude}&longitude=${longitude}`
              );
              const geoData = await geoRes.json();
              const detectedCity = geoData.city;
              setCity(detectedCity);
              fetchBands(detectedCity);
            } catch {
              setError("Could not determine your city.");
            }
          },
          async () => {
            try {
              const fallbackRes = await fetch("https://get.geojs.io/v1/ip/geo.json");
              const fallbackData = await fallbackRes.json();
              const fallbackCity = fallbackData.city;
              setCity(fallbackCity);
              fetchBands(fallbackCity);
            } catch {
              setError("Could not determine your location.");
            }
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    };

    getLocation();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBands(city);
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <h1 className="text-danger display-4">Find My Fav Band</h1>
        <p className="text-muted">Discover your favorite music band by their city.</p>
      </div>
      <div className="row justify-content-center mb-4">
        <div className="col-md-6">
          <form onSubmit={handleSearch} className="d-flex">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="form-control me-2"
              placeholder="Enter city"
            />
            <button type="submit" className="btn btn-danger">
              Search
            </button>
          </form>
          {error && <div className="text-danger mt-2">{error}</div>}
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-8">
          {bands.length === 0 && !error && (
            <div className="alert alert-warning text-center">
              Not found any band in the given city, please try a different one.
            </div>
          )}
          {bands.length > 0 && (
            <ul className="list-group">
              {bands.map((band) => (
                <li
                  key={band.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <strong>{band.name}</strong>
                    <p className="mb-0 text-muted">
                      Founded in: {band["life-span"].begin || "Unknown"}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default BandSearch;
